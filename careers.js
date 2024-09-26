document.addEventListener('DOMContentLoaded', function () {
    const maxFileSize = 10 * 1024 * 1024; // 10MB

    function validateFileInput(fileInput, messageElement, maxFileSize) {
        const file = fileInput.files[0];
        if (file && file.size > maxFileSize) {
            messageElement.textContent = 'File is too large. Maximum allowed size is 10MB.';
            messageElement.style.color = 'red';
            fileInput.value = ''; // clear the file input
        } else {
            messageElement.textContent = '';
        }
    }

    const resumeInput = document.getElementById('resume');
    const resumeMessage = document.getElementById('resume-message');
    resumeInput.addEventListener('change', () => validateFileInput(resumeInput, resumeMessage, maxFileSize));

    const idProofInput = document.getElementById('id-proof');
    const idProofMessage = document.getElementById('id-proof-message');
    idProofInput.addEventListener('change', () => validateFileInput(idProofInput, idProofMessage, maxFileSize));

    const photoUploadInput = document.getElementById('photo-upload');
    const photoMessage = document.getElementById('photo-message');
    const userPhoto = document.getElementById('user-photo');
    const uploadPhotoButton = document.getElementById('upload-photo');

    uploadPhotoButton.addEventListener('click', function () {
        const file = photoUploadInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                userPhoto.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // CAPTCHA verification (simple check for "6T9JBCDS")
    document.getElementById('application-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const captcha = document.getElementById('captcha').value;
        const correctCaptcha = "6T9JBCDS";
    
        if (captcha === correctCaptcha) {
            alert('Login successful!');
            window.location.href = "selected.html";
        } else {
            alert('Incorrect captcha, please try again.');
        }
    });
});


// Function to set activation time on page load
function setActivationTime() {
    let interviewTime = new Date();
    interviewTime.setHours(8, 45, 0); // Interview link activates at 8:45 AM
    document.getElementById('activationTime').textContent = interviewTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Set the "Last Updated" date dynamically
document.getElementById("last-updated").innerHTML = "Last Updated: " + document.lastModified;

// Simulate total visitor count using localStorage (For demo purposes)
let visitorCount = localStorage.getItem('visitorCount') || 0;
visitorCount++;
localStorage.setItem('visitorCount', visitorCount);
document.getElementById("visitor-count").innerText = visitorCount;
