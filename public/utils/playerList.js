function updatePlayerList() {
    var playerList = document.getElementById('player-list');
    playerList.innerHTML = '';
    
    blobs.sort((a, b) => b.r - a.r);
    
    blobs.forEach(function(blobData) {
      var listItem = document.createElement('li');
      listItem.textContent = `${blobData.name || 'Anonymous'} (${Math.round(blobData.r)})`;
      if (blobData.id === socket.id) {
        listItem.style.fontWeight = 'bold';
      }
      playerList.appendChild(listItem);
    });
  }