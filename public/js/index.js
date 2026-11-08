// ============================================================
// index.js — lógica exclusiva da home (index.html)
// Requer shared.js + i18n.js carregados antes.
// ============================================================

// ---------- Botão "Criar sala" ----------
var btnCriar = document.getElementById('RedirecionarSala');
if (btnCriar) {
  btnCriar.addEventListener('click', async function () {
    const canProceed = await checkPermissionsBeforeAction();
    if (canProceed) {
      localStorage.setItem('salaAcao', 'criar');
      window.location.href = '/html/chat.html';
    }
  });
}

// ---------- Botão "Conectar a uma Sala" ----------
var redireciona = document.getElementById('RedirecionarParaEntrar');
if (redireciona) {
  redireciona.addEventListener('click', async function () {
    const canProceed = await checkPermissionsBeforeAction();
    if (canProceed) {
      document.getElementById('modalRoomId').style.display = 'flex';
    }
  });
}

// ---------- Fechar modal ----------
function closeModal() {
  const modal = document.getElementById('modalRoomId');
  if (modal) {
    modal.style.display = 'none';
  }
}
window.closeModal = closeModal;

// ---------- Confirmar código da sala (com validação) ----------
var btnConfirma = document.getElementById('btnConfirmRoomId');
if (btnConfirma) {
  btnConfirma.addEventListener('click', function () {
    const raw = document.getElementById('inputRoomId').value;
    const roomId = (raw || '').trim().toUpperCase();

    if (!isValidRoomCodeInput(roomId)) {
      alert(i18n.t('index.alerts.invalidCode'));
      return;
    }

    localStorage.setItem('salaAcao', 'entrar');
    localStorage.setItem('roomId', roomId);
    window.location.href = '/html/chat.html';
  });
}

// ---------- Fechar modal ao clicar fora ----------
document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('modalRoomId');
  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) {
        closeModal();
      }
    });
  }
});