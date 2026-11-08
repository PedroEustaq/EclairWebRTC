// ============================================================
// chat-room.js — fluxo de criação de sala (caller)
// Requer i18n.js. Re-renderiza o rótulo se o idioma mudar.
// ============================================================

function renderRoomHeader(documentCode) {
  const label = i18n.t('chat.roomCode');
  document.querySelector('#currentRoom').innerHTML =
    `<h2 class="textcodigo">${label} </h2> <span class="codigodaSala">${documentCode}  <img class="CopiarIcone" src="/img/solar_copy-bold-duotone.png" alt=""></span>`;

  // (Re)anexa comportamento de copiar (delegação para evitar handlers duplicados)
  const container = document.querySelector('.codigodaSala');
  if (!container) return;
  const icon = document.querySelector('.CopiarIcone');
  if (icon) icon.style.cursor = 'pointer';

  if (!container.dataset.copyBound) {
    container.dataset.copyBound = '1';
    container.addEventListener('click', () => {
      const codigoAtual = container.textContent.trim().split(/\s+/)[0];
      navigator.clipboard.writeText(codigoAtual).then(() => {
        const ic = container.querySelector('.CopiarIcone');
        if (ic) {
          ic.style.opacity = 0;
          ic.title = i18n.t('chat.alerts.copiedTitle');
          setTimeout(() => {
            ic.style.opacity = 1;
            ic.title = i18n.t('chat.alerts.copyTitle');
          }, 1000);
        }
      }).catch(() => alert(i18n.t('chat.alerts.copyError')));
    });
  }
  if (icon) icon.title = i18n.t('chat.alerts.copyTitle');
}

async function createRoom() {
  const db = firebase.firestore();
  const documentCode = generateRandomCode();

  const currentUser = firebase.auth().currentUser;
  if (!currentUser) {
    throw new Error('Usuário não autenticado — não é possível criar sala.');
  }

  const localUserId = currentUser.uid;
  userCode = documentCode;

  renderRoomHeader(documentCode);

  const salaRef = db.collection('SalaUsuarios').doc(documentCode);
  await salaRef.set({
    personalCode: localUserId,
    ownerUid: localUserId,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    participants: [localUserId],
  });

  salaRef.onSnapshot(doc => {
    if (doc.exists) {
      handleParticipantsChange(doc.data().participants || [], salaRef, localUserId);
    }
  }, error => console.error('Erro ao monitorar participants:', error));
}

// Atualiza o rótulo do código da sala ao trocar de idioma
window.addEventListener('i18n:changed', () => {
  if (userCode) {
    const label = document.querySelector('.textcodigo');
    if (label) label.textContent = i18n.t('chat.roomCode') + ' ';
    const icon = document.querySelector('.CopiarIcone');
    if (icon && !icon.title) icon.title = i18n.t('chat.alerts.copyTitle');
  }
});