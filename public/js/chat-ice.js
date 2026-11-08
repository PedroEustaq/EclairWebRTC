// ============================================================
// chat-ice.js — troca de ICE candidates via Firestore
// ============================================================

async function collectIceCandidates(roomRef, pc, localName, remoteName) {
  const candidatesCollection = roomRef.collection(localName);

  pc.addEventListener('icecandidate', event => {
    if (event.candidate) {
      const json = event.candidate.toJSON();
      candidatesCollection.add(json).catch(error => {
        console.error('Error adding ICE candidate:', error);
      });
    }
  });

  roomRef.collection(remoteName).onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
      if (change.type === "added") {
        const candidate = new RTCIceCandidate(change.doc.data());
        pc.addIceCandidate(candidate).catch(error => {
          console.error('Error adding remote ICE candidate:', error);
        });
      }
    });
  }, error => {
    console.error('Error listening to remote candidates:', error);
  });
}