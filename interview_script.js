const startAnswerBtn = document.getElementById('start-answer-btn');
const repeatBtn = document.getElementById('repeat-btn');
const nextQuestionBtn = document.getElementById('next-question-btn'); // New button
const sideSection = document.querySelector('.side-section');
const liveCamera = document.getElementById('live-camera');
const container = document.querySelector('.container');
let isAnswering = false;
let femaleVoice;

// Fullscreen API to make the page fullscreen
function openFullScreen() {
  if (container.requestFullscreen) {
    container.requestFullscreen();
  } else if (container.mozRequestFullScreen) { // Firefox
    container.mozRequestFullScreen();
  } else if (container.webkitRequestFullscreen) { // Chrome, Safari and Opera
    container.webkitRequestFullscreen();
  } else if (container.msRequestFullscreen) { // IE/Edge
    container.msRequestFullscreen();
  }
}

// Function to exit fullscreen mode and redirect
function exitInterview() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) { // Firefox
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { // IE/Edge
    document.msExitFullscreen();
  }
  window.location.href = 'thank.html'; // Redirect to DRDO website or any other website
}

// Detect when the user tries to exit full screen and show a warning
document.addEventListener('fullscreenchange', function () {
  if (!document.fullscreenElement) {
    alert('You cannot exit full-screen mode during the interview. Click on "Exit Interview" to end the session.');
    openFullScreen(); // Re-enter fullscreen mode
  }
});

// Warn if the user tries to switch tabs or minimizes the window
document.addEventListener('visibilitychange', function () {
  if (document.visibilityState === 'hidden') {
    alert('Please do not switch tabs or leave the interview. Focus on the interview until you click "Exit Interview".');
  }
});

// Request microphone and camera permissions
function requestPermissions() {
  navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then(function (stream) {
      // Display the live camera feed
      liveCamera.srcObject = stream;

      // Once permissions are granted, enter full-screen mode
      openFullScreen();

      // After entering full screen, ask for permission to start the interview
      askToStartInterview();
    })
    .catch(function (err) {
      alert('Camera and microphone permissions are required to proceed.');
      console.error('Permission error: ', err);
    });
}

// Ask the user to start the interview
function askToStartInterview() {
  let confirmation = confirm('Do you want to start the interview?');
  if (confirmation) {
    playVideoAndSpeakQuestion();
    startAnswerBtn.disabled = false;
    repeatBtn.disabled = false;
  }
}

// Start the answer session
function startAnswer() {
  isAnswering = true;

  // Replace the Start Answer button with End Answer button
  startAnswerBtn.innerText = 'End Answer';

  // Display the blinking 'Listening...' text
  let listeningText = document.createElement('p');
  listeningText.classList.add('blinking');
  listeningText.innerText = 'Listening...';
  sideSection.appendChild(listeningText);
}

// End the answer session
function endAnswer() {
  isAnswering = false;

  // Reset button text
  startAnswerBtn.innerText = 'Start Answer';

  // Remove the blinking 'Listening...' text
  const blinkingText = document.querySelector('.blinking');
  if (blinkingText) {
    blinkingText.remove();
  }
}

// Toggle between starting and stopping the answer
startAnswerBtn.addEventListener('click', function () {
  if (isAnswering) {
    endAnswer();
  } else {
    startAnswer();
  }
});

// Function to convert text to speech with a female voice and stop the video when speech ends
function speakQuestionText(text, videoElement) {
  if ('speechSynthesis' in window) {
    let utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = femaleVoice; // Use the globally defined female voice
    utterance.lang = 'en-US';

    utterance.onstart = function () {
      videoElement.play();
    };

    utterance.onend = function () {
      videoElement.pause();
      videoElement.currentTime = 0; // Reset video to the start
    };

    window.speechSynthesis.speak(utterance);
  } else {
    alert("Sorry, your browser doesn't support text-to-speech.");
  }
}

// Play the video and speak the question
function playVideoAndSpeakQuestion() {
  let video = document.getElementById('question-video');
  let questionText = document.getElementById('question-text').innerText;
  speakQuestionText(questionText, video);
}

// Repeat the question video and the speech
function repeatQuestion() {
  playVideoAndSpeakQuestion();
}

// Load the voices and set the female voice
function loadVoices() {
  const voices = window.speechSynthesis.getVoices();
  femaleVoice = voices.find(voice => voice.name.toLowerCase().includes('female')) || voices[0]; // Fallback to first voice
}

// Request permissions on page load
window.onload = function () {
  requestPermissions(); // Ask for camera and microphone permissions, then enter full-screen mode
  window.speechSynthesis.onvoiceschanged = loadVoices; // Load voices when they change
};
