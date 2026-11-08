// ============================================================
// chat-controls.js — setup da página, mic/câmera, init
// Deve carregar por último. Requer i18n.js.
// ============================================================

function init() {
    const btn = document.querySelector('#hangupBtn');
    if (btn) btn.addEventListener('click', hangUp);
}

window.addEventListener('DOMContentLoaded', async () => {
    const microPNG = document.getElementById('microPNGA');
    if (microPNG) {
        microPNG.addEventListener('click', () => {
            if (!localStream) return;
            const track = localStream.getAudioTracks()[0];
            if (!track) return;
            micMuted = !micMuted;
            track.enabled = !micMuted;
            if (micMuted) {
                microPNG.src = '/img/microoff.png';
                microPNG.style.backgroundColor = 'black';
                microPNG.style.borderColor = '#FF4242';
            } else {
                microPNG.src = '/img/microfon.png';
                microPNG.style.backgroundColor = '#ffa100';
                microPNG.style.borderColor = 'white';
            }
        });
    }

    const camBtn = document.getElementById('cameraBtn');
    if (camBtn) {
        camBtn.addEventListener('click', () => {
            if (!localStream) return;
            const track = localStream.getVideoTracks()[0];
            if (!track) return;
            track.enabled = !track.enabled;
            camBtn.src = track.enabled ? '/img/camera.png' : '/img/cameraOff.png';
        });
    }

    const acao = localStorage.getItem('salaAcao');

    // Acesso direto via URL sem passar pela home → redireciona
    if (acao !== 'criar' && acao !== 'entrar') {
        window.location.href = '/';
        return;
    }

    // Autenticação obrigatória (Anonymous Auth) — exigida pelas firestore.rules
    const user = await ensureFirebaseAuth();
    if (!user) {
        alert(i18n.t('chat.alerts.authFail'));
        window.location.href = '/';
        return;
    }

    try {
        if (acao === 'criar') {
            await openUserMedia();
            createRoom();
            localStorage.removeItem('salaAcao');
        } else {
            const rid = localStorage.getItem('roomId');
            localStorage.removeItem('salaAcao');
            localStorage.removeItem('roomId');

            if (!isValidRoomCodeInput(rid)) {
                alert(i18n.t('chat.alerts.invalidRoom'));
                window.location.href = '/';
                return;
            }

            await openUserMedia();
            userCode = rid.trim().toUpperCase();
            await entrarSendoAnswer(userCode);
        }
    } catch (error) {
        console.error('Erro ao entrar na sala:', error);
        alert(i18n.t('chat.alerts.mediaError'));
        window.location.href = '/';
    }
});

init();