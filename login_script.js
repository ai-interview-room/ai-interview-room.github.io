document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const captcha = document.getElementById('captcha').value;
    const correctCaptcha = document.getElementById('captchaCode').textContent;

    if (captcha === correctCaptcha) {
        alert('Login successful!');
        window.location.href = "careers.html";
        // Add further login logic here
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