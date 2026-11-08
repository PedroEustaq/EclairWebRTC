// ============================================================
// shared.js — carregado por index.html E chat.html
// Requer i18n.js carregado antes.
// ============================================================

// MDC ripple (defensivo — só se mdc e .mdc-button existirem)
if (typeof mdc !== 'undefined' && document.querySelector('.mdc-button')) {
  mdc.ripple.MDCRipple.attachTo(document.querySelector('.mdc-button'));
}

// ---------- Configuração WebRTC ----------
const configuration = {
  iceServers: [
    {
      urls: [
        'stun:stun1.l.google.com:19302',
        'stun:stun2.l.google.com:19302',
      ],
    },
  ],
  iceCandidatePoolSize: 10,
};

// ---------- Permissões de mídia ----------
let permissionsGranted = false;

async function checkMediaPermissions() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    stream.getTracks().forEach(track => track.stop());
    permissionsGranted = true;
    console.log('✅ Permissões de mídia concedidas');
    return true;
  } catch (error) {
    permissionsGranted = false;
    console.log('❌ Permissões de mídia negadas:', error.message);
    return false;
  }
}

async function requestPermissionsWithAlert() {
  const userResponse = window.confirm(i18n.t('shared.permConfirm'));

  if (userResponse) {
    console.log('🔐 Usuário aceitou solicitar permissões');
    const granted = await checkMediaPermissions();
    if (granted) {
      console.log('✅ Permissões ativadas com sucesso!');
      return true;
    } else {
      alert(i18n.t('shared.permDenied'));
      return false;
    }
  } else {
    console.log('❌ Usuário recusou solicitar permissões');
    alert(i18n.t('shared.permRefused'));
    return false;
  }
}

async function checkPermissionsBeforeAction(action) {
  if (!permissionsGranted) {
    const granted = await requestPermissionsWithAlert();
    if (!granted) {
      return false;
    }
  }
  return true;
}

// ---------- Identidade do usuário ----------
// Agora o identificador é o UID real do Firebase Auth.
// Isso é OBRIGATÓRIO porque firestore.rules compara `personalCode`,
// `ownerUid` e `participants` diretamente com `request.auth.uid`.
let userId = "";

function getOrCreateUserId() {
  const user = firebase.auth().currentUser;
  if (!user) {
    throw new Error('Usuário não autenticado — getOrCreateUserId() exige ensureFirebaseAuth() antes.');
  }
  userId = user.uid;
  return userId;
}

// ---------- Geração de código de sala ----------
function generateRandomCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  if (window.crypto && crypto.getRandomValues) {
    const array = new Uint8Array(8);
    crypto.getRandomValues(array);
    for (let i = 0; i < 8; i++) {
      result += chars[array[i] % chars.length];
    }
  } else {
    for (let i = 0; i < 8; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
  }
  return result;
}

// ---------- Validação de código de sala ----------
// Mesmo regex usado em firestore.rules → fail fast antes de ir pro Firestore
const ROOM_CODE_RE = /^[A-Z0-9]{8}$/;

function isValidRoomCodeInput(value) {
  return typeof value === 'string' && ROOM_CODE_RE.test(value.trim().toUpperCase());
}

// ---------- Autenticação anônima ----------
let firebaseAuthUser = null;

async function ensureFirebaseAuth() {
  try {
    if (!firebase || typeof firebase.auth !== 'function') {
      console.warn('Firebase Auth SDK não carregado — escritas serão bloqueadas pelas rules.');
      return null;
    }
    if (firebaseAuthUser) return firebaseAuthUser;
    if (firebase.auth().currentUser) {
      firebaseAuthUser = firebase.auth().currentUser;
      return firebaseAuthUser;
    }
    const cred = await firebase.auth().signInAnonymously();
    firebaseAuthUser = cred.user;
    console.log('✅ Autenticado anonimamente:', firebaseAuthUser.uid);
    return firebaseAuthUser;
  } catch (error) {
    console.error('❌ Falha na autenticação anônima:', error.code, error.message);
    return null;
  }
}