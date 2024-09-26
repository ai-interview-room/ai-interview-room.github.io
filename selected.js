// Set the "Last Updated" date dynamically
document.getElementById("last-updated").innerHTML = "Last Updated: " + document.lastModified;

// Simulate total visitor count using localStorage (For demo purposes)
let visitorCount = localStorage.getItem('visitorCount') || 0;
visitorCount++;
localStorage.setItem('visitorCount', visitorCount);
document.getElementById("visitor-count").innerText = visitorCount;