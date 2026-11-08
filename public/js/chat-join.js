// ============================================================
// chat-join.js — fluxo de entrar em sala existente (callee)
// Requer i18n.js.
// ============================================================

async function entrarSendoAnswer(salacodigo) {
  // Validação de input (defense-in-depth — chat-controls também valida)
  if (!isValidRoomCodeInput(salacodigo)) {
    alert(i18n.t('chat.alerts.invalidRoom'));
    window.location.href = '/';
    return;
  }
  salacodigo = salacodigo.trim().toUpperCase();

  const currentUser = firebase.auth().currentUser;
  if (!currentUser) {
    alert(i18n.t('chat.alerts.notAuth'));
    window.location.href = '/';
    return;
  }

  const db = firebase.firestore();
  const salaRef = db.collection('SalaUsuarios').doc(salacodigo);
  const localUserId = currentUser.uid;

  const roomDoc = await salaRef.get();
  if (!roomDoc.exists) {
    alert(i18n.t('chat.alerts.notFound'));
    window.location.href = '/';
    return;
  }

  participantes = roomDoc.data().participants || [];

  // arrayUnion é idempotente e passa nas regras (isJoiningRoom)
  await salaRef.update({
    participants: firebase.firestore.FieldValue.arrayUnion(localUserId)
  });

  // Se já estava na lista, atualiza o estado local
  if (!participantes.includes(localUserId)) {
    participantes.push(localUserId);
  }

  await new Promise(r => setTimeout(r, 1000));

  for (let i = 0; i < participantes.length; i++) {
    if (participantes[i] == localUserId) continue;

    const pastaCompleta = db.collection('SalaUsuarios').doc(salacodigo)
      .collection("connections").doc("" + participantes[i] + ">" + localUserId);

    try {
      peerConnection = new RTCPeerConnection(configuration);
      registerPeerConnectionListeners(peerConnection);
      localStream.getTracks().forEach(t => peerConnection.addTrack(t, localStream));

      await collectIceCandidates(pastaCompleta, peerConnection, 'calleeCandidates', 'callerCandidates');

      const stream = attachRemoteVideo(participantes[i]);
      peerConnection.addEventListener('track', event => {
        event.streams[0].getTracks().forEach(track => stream.addTrack(track));
      });

      // Espera a offer existir (race com o caller criando a offer)
      let snap = await pastaCompleta.get();
      let tentativas = 0;
      while ((!snap.exists || !snap.data() || !snap.data().offer) && tentativas < 15) {
        await new Promise(r => setTimeout(r, 300));
        snap = await pastaCompleta.get();
        tentativas++;
      }

      if (!snap.exists || !snap.data() || !snap.data().offer) {
        console.warn(`[entrarSendoAnswer] Sem offer para ${participantes[i]} após ${tentativas} tentativas. Pulando.`);
        peerConnection.close();
        const vid = document.querySelector(`#remoteVideo_${participantes[i]}`);
        if (vid && vid.closest('.videoContainer')) vid.closest('.videoContainer').remove();
        delete remoteStreams[participantes[i]];
        continue;
      }

      await peerConnection.setRemoteDescription(snap.data().offer);
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);
      await pastaCompleta.update({ answer: { type: answer.type, sdp: answer.sdp } });

      peerConnections[participantes[i]] = peerConnection;
    } catch (error) {
      console.error(`[entrarSendoAnswer] Erro conectando a ${participantes[i]}:`, error);
      if (peerConnection) peerConnection.close();
    }
  }

  await new Promise(r => setTimeout(r, 1000));

  salaRef.onSnapshot(doc => {
    if (doc.exists) {
      handleParticipantsChange(doc.data().participants || [], salaRef, localUserId);
    }
  }, error => console.error('Erro ao monitorar participants:', error));
}