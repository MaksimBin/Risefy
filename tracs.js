


let canvas, ctx, audioContext, analyzer;
let canvas2, ctx2;

function onload(audio) {
  canvas = document.getElementById('canvas');
  canvas.width = window.innerWidth;
  canvas.height = 250;
  ctx = canvas.getContext('2d');

  audioContext = new AudioContext();
  analyzer = audioContext.createAnalyser();
  analyzer.fftSize = 2048;

  const source = audioContext.createMediaElementSource(audio);
  source.connect(analyzer);
  analyzer.connect(audioContext.destination);


}

// твоя функция draw() остаётся без изменений



