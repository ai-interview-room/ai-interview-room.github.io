// Handle form submission for forgot password
document.getElementById('forgotPasswordForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const usernameOrEmail = document.getElementById('usernameOrEmail').value;
    const captchaInput = document.getElementById('captchaInput').value;
    const correctCaptcha = document.getElementById('captchaCode').textContent;

    if (captchaInput === correctCaptcha) {
        alert('Captcha verified! Instructions to reset your password will be sent to your email.');
        window.location.href = "login.html";
    } else {
        alert('Incorrect captcha, please try again.');
    }
});

// Set the "Last Updated" date dynamically
document.getElementById("last-updated").innerHTML = "Last Updated: " + document.lastModified;

// Simulate total visitor count using localStorage (For demo purposes)
let visitorCount = localStorage.getItem('visitorCount') || 0;
visitorCount++;
localStorage.setItem('visitorCount', visitorCount);
document.getElementById("visitor-count").innerText = visitorCount;
