

const video = document.getElementById('video')

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(startVideo)

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}

video.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video)
  document.body.append(canvas)
 
  const displaySize = { width: canvas.width, height: canvas.height }
  faceapi.matchDimensions(canvas, displaySize)
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    faceapi.draw.drawDetections(canvas, resizedDetections)
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections)


    resizedDetections.forEach(detection => {
      const expressions = detection.expressions;


      const maxExpression = Object.keys(expressions).reduce((max, emotion) => expressions[emotion] > expressions[max] ? emotion : max, 'neutral');
      
      

      document.getElementById('controls').innerHTML = `You Look Like ${maxExpression}`
      recommendSong(maxExpression)
    });
  }, 100)

})

const countdownElement = document.getElementById('countdown');

function startCountdown() {
  let count = 5;
  countdownElement.textContent = `Redirecting in ${count}...`;

  const countdownInterval = setInterval(() => {
    count--;
    countdownElement.textContent = `Redirecting in ${count}...`;

    if (count === 0) {
      clearInterval(countdownInterval);
      countdownElement.textContent = `Redirecting in ${count}...`;
      
    }
  }, 1000);
}

setTimeout(() => {
  startCountdown();
}, 5000);


function recommendSong(emotion) {
  
  switch (emotion) { 
      case 'happy':

      setTimeout(() => {
        window.location.href = 'corona/happy1/index2.html'; // Replace with your desired URL
      }, 700);
        
          break;
      case 'sad':
        setTimeout(() => {
          window.location.href = 'corona/sad2/index3.html'; // Replace with your desired URL
        }, 700);
          break;
      case 'angry':
        setTimeout(() => {
          window.location.href = 'corona/clam3/index4.html'; // Replace with your desired URL
        }, 700);
          break;
      case 'surprised':
        setTimeout(() => {
          window.location.href = 'corona/surprised4/index5.html'; // Replace with your desired URL
        }, 700);
          break;
      default:
        setTimeout(() => {
          window.location.href = 'corona/home0/index.html'; // Replace with your desired URL
        }, 700);
  }
  
} 