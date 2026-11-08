// ============================================================
// chat-connection.js — conexão caller (P2P) + reação a novos participantes
// ============================================================

async function gerarConexaoPonto(pastaDosDoisUsuarios, salaUsuariosRef, localUserId) {
  const partes = pastaDosDoisUsuarios.split('>');
  const newParticipantId = partes[1];
  if (!newParticipantId) return;
  if (newParticipantId === localUserId) return;
  if (peerConnections[newParticipantId]) return;

  const pc = new RTCPeerConnection(configuration);
  peerConnections[newParticipantId] = pc;
  registerPeerConnectionListeners(pc);

  localStream.getTracks().forEach(track => pc.addTrack(track, localStream));

  const roomRef = salaUsuariosRef.collection('connections').doc(pastaDosDoisUsuarios);
  collectIceCandidates(roomRef, pc, 'callerCandidates', 'calleeCandidates');

  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);
  await roomRef.set({ offer: { type: offer.type, sdp: offer.sdp } });

  roomRef.onSnapshot(async snapshot => {
    
    const data = snapshot.data();
    if (!pc.currentRemoteDescription && data && data.answer) {
      const answer = new RTCSessionDescription(data.answer);
      await pc.setRemoteDescription(answer);
    }
  });

  const stream = attachRemoteVideo(newParticipantId);
  pc.addEventListener('track', event => {
    event.streams[0].getTracks().forEach(track => stream.addTrack(track));
  });
}

function handleParticipantsChange(newParticipants, salaUsuariosRef, localUserId) {
  if (newParticipants.length > participantes.length) {
    const novos = newParticipants.filter(u => !participantes.includes(u));
    console.log('🎉 NOVOS PARTICIPANTES:', novos);
  } else if (newParticipants.length < participantes.length) {
    const removidos = participantes.filter(u => !newParticipants.includes(u));
    removidos.forEach(uid => removeUserVideo(uid));
  }

  participantes = newParticipants;

  if (participantes.length > 1) {
    const newId = participantes[participantes.length - 1];
    if (newId !== localUserId && !peerConnections[newId]) {
      gerarConexaoPonto("" + localUserId + ">" + newId, salaUsuariosRef, localUserId);
    }
  }
}