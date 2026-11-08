// ============================================================
// chat-core.js — estado compartilhado + utilitários de DOM
// Deve carregar PRIMEIRO entre os chat-*.js
// ============================================================

let localStream = null;
let peerConnection = null;
let micMuted = false;
var participantes = [];
var conectando = {};
let peerConnections = {};
let remoteStreams = {};
let connectedUsers = [];
let userCode = "";

function registerPeerConnectionListeners(pc) {
  pc.addEventListener('icegatheringstatechange', () => {});
  pc.addEventListener('connectionstatechange', () => {});
  pc.addEventListener('signalingstatechange', () => {});
  pc.addEventListener('iceconnectionstatechange', () => {});
}

function removeUserVideo(uid) {
  const videoElement = document.querySelector(`#remoteVideo_${uid}`);
  if (videoElement) {
    const container = videoElement.closest('.videoContainer');
    if (container) container.remove();
  }
  if (peerConnections[uid]) {
    peerConnections[uid].close();
    delete peerConnections[uid];
  }
  if (remoteStreams[uid]) {
    remoteStreams[uid].getTracks().forEach(t => t.stop());
    delete remoteStreams[uid];
  }
  const i = connectedUsers.indexOf(uid);
  if (i > -1) connectedUsers.splice(i, 1);
}

function attachRemoteVideo(participantId) {
  if (remoteStreams[participantId]) return remoteStreams[participantId];

  let videoContainer = document.querySelector('#videos');
  if (!videoContainer) {
    videoContainer = document.createElement('div');
    videoContainer.id = 'videos';
    document.body.appendChild(videoContainer);
  }

  const wrapper = document.createElement('div');
  wrapper.className = "videoContainer";

  const video = document.createElement('video');
  video.id = `remoteVideo_${participantId}`;
  video.autoplay = true;
  video.playsinline = true;
  video.className = 'remote-video';

  wrapper.appendChild(video);
  videoContainer.appendChild(wrapper);

  const stream = new MediaStream();
  remoteStreams[participantId] = stream;
  video.srcObject = stream;
  return stream;
}

