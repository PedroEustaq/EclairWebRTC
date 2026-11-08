// ============================================================
// chat-media.js — getUserMedia + encerrar chamada
// ============================================================

async function openUserMedia() {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  document.querySelector('#localVideo').srcObject = stream;
  localStream = stream;
  document.querySelector('#hangupBtn').disabled = false;
}

async function hangUp() {
  const localVideo = document.querySelector('#localVideo');
  if (localVideo && localVideo.srcObject) {
    localVideo.srcObject.getTracks().forEach(t => t.stop());
  }

  Object.keys(peerConnections).forEach(id => {
    if (peerConnections[id]) peerConnections[id].close();
  });
  Object.keys(remoteStreams).forEach(id => {
    if (remoteStreams[id]) remoteStreams[id].getTracks().forEach(t => t.stop());
  });
  peerConnections = {};
  remoteStreams = {};
  connectedUsers = [];

  try {
    const db = firebase.firestore();
    const currentUser = firebase.auth().currentUser;

    if (!userCode || userCode.trim() === '' || !currentUser) {
      window.location.href = '/';
      return;
    }

    const uid = currentUser.uid;
    const salaRef = db.collection('SalaUsuarios').doc(userCode);

    // Remove-se da lista de participantes (arrayRemove → isLeavingRoom)
    await salaRef.update({
      participants: firebase.firestore.FieldValue.arrayRemove(uid)
    }).catch(err => console.warn('Falha ao remover participante:', err));

    // Limpa doc principal da conexão onde este uid é caller OU callee.
    // Deletar o parent doc é permitido por isConnectionParticipant.
    // Subcoleções (candidates) podem ficar órfãs — limpar depois via TTL.
    const connRef = salaRef.collection('connections');
    const possiblePeers = Object.keys(remoteStreams).concat(connectedUsers);

    for (const peerId of possiblePeers) {
      const ids = [`${uid}>${peerId}`, `${peerId}>${uid}`];
      for (const connId of ids) {
        try {
          await connRef.doc(connId).delete();
        } catch (e) {
          // já pode ter sido removido pelo outro lado
        }
      }
    }

    document.querySelectorAll('.videoContainer').forEach(c => c.remove());
    if (localVideo) localVideo.srcObject = null;
    const hang = document.querySelector('#hangupBtn');
    if (hang) hang.disabled = true;
    const cur = document.querySelector('#currentRoom');
    if (cur) cur.innerText = '';

    window.location.href = '/';
  } catch (error) {
    console.error('Erro ao sair da sala:', error);
    window.location.href = '/';
  }
}