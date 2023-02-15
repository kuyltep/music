let container = document.querySelector(`.album`);
let search = new URLSearchParams(window.location.search);
let i = search.get(`i`);
let album = albums[i];
if (!album) {
  container.innerHTML = `ERROR!!!
  `;
  window.location.pathname = `index.html`;
} else {

  container.innerHTML = `
<div class="card">
<div class="row">
  <div class="col-xxl-4">
    <img src="${album.img}" class="img-fluid rounded-start" alt="">
  </div>
  <div class="col-xxl-8">
    <div class="card-body">
      <h5 class="card-title">${album.title}</h5>
      <p class="card-text">${album.description}</p>
      <p class="card-text"><small class="text-muted">${album.year}</small></p>

    </div>
  </div>
</div>
</div>
`;
  let playlist = document.querySelector(`.playlist`);
  let tracks = album.tracks;
  for (let j = 0; j < tracks.length; j++) {
    let track = tracks[j];
    playlist.innerHTML += `
  <li class="track list-group-item d-flex align-items-center">
  <img class='img-play me-3' src="assets/free-icon-play-button-109197.png" alt="" height="30px" class="me-3">
  <img class='img-pause d-none me-3' src="assets/pause.png" alt="" height="30px" class="me-3">
    <div >
  <div>${track.title}</div>
  <div class="text-secondary">${track.author}</div>
    </div>
    
  <div class="time ms-auto">${track.time}</div>
  <audio class="audio" src="${track.src}" ></audio>
</li>
  `;
  };




  function setupAudio() {
    // Найди коллекцию с треками
    let trackNodes = document.querySelectorAll(`.track`);
    for (let i = 0; i < trackNodes.length; i++) {
      let track = tracks[i];
      let node = trackNodes[i];
      let imgPlay = node.querySelector(`.img-play`);
      let imgPause = node.querySelector(`.img-pause`);
      let audio = node.querySelector(`.audio`);
      let timeNode = node.querySelector(`.time`);
      node.addEventListener(`click`, function () {
        if (track.isPlaying) {
          imgPause.classList.add(`d-none`);
          imgPlay.classList.remove(`d-none`);
          track.isPlaying = false;
          audio.pause();
        } else {
          track.isPlaying = true;
          audio.play();
          imgPause.classList.remove(`d-none`);
          imgPlay.classList.add(`d-none`);
          updateProgress();
        }
      });
      function updateProgress() {
        // Нарисовать актуальное время
        let time = getTime(audio.currentTime);
        if (timeNode.innerHTML != time) {
          timeNode.innerHTML = time;
        }

        // Нужно ли вызвать её ещё раз?
        if (track.isPlaying) {
          requestAnimationFrame(updateProgress);
        }
      }
    }

  }

  setupAudio();
  function getTime(time) {
    let currentSeconds = Math.floor(time);
    let minutes = Math.floor(currentSeconds / 60);
    let seconds = Math.floor(currentSeconds % 60);
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    return `${minutes}:${seconds}`;
  }
}
