'use strict';

// Sidebar toggle
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

sidebarBtn.addEventListener("click", function () {
  sidebar.classList.toggle("active");
});

// Page navigation
const navLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("article[data-page]");

navLinks.forEach(link => {
  link.addEventListener("click", function () {
    const target = link.textContent.trim().toLowerCase();

    pages.forEach(page => {
      if (page.dataset.page === target) {
        page.classList.add("active");
      } else {
        page.classList.remove("active");
      }
    });

    navLinks.forEach(btn => btn.classList.remove("active"));
    link.classList.add("active");
  });
});

// Canvas for space background
const canvas = document.getElementById("space-bg");
const ctx = canvas.getContext("2d");

let stars = [];
let mouse = { x: canvas.width / 2, y: canvas.height / 2 }; // Start in the middle of the screen
let parallaxFactor = 0.1; // Adjust for responsiveness

// Resize the canvas based on window size
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Create stars
for (let i = 0; i < 150; i++) {
  stars.push({
    baseX: Math.random() * canvas.width,
    baseY: Math.random() * canvas.height,
    radius: Math.random() * 1.5 + 0.5,
    velocity: Math.random() * 0.5 + 0.1,
  });
}

// Update mouse position for cursor follow effect
window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// Function to draw stars with parallax effect
function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let star of stars) {
    // Parallax effect based on cursor position
    let offsetX = (mouse.x - canvas.width / 2) * parallaxFactor;
    let offsetY = (mouse.y - canvas.height / 2) * parallaxFactor;

    let x = star.baseX + offsetX;
    let y = star.baseY + offsetY;

    ctx.beginPath();
    ctx.arc(x, y, star.radius, 0, Math.PI * 2);

    // Random opacity for twinkling effect
    let opacity = Math.random() * 0.5 + 0.5;  // Random opacity between 0.5 and 1
    ctx.fillStyle = `rgba(0, 255, 255, ${opacity})`;
    ctx.fill();

    // Float upwards for stars
    star.baseY -= star.velocity;
    if (star.baseY < -10) {
      star.baseY = canvas.height + 10;
      star.baseX = Math.random() * canvas.width;
    }
  }
}

// Main function to draw everything
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

  drawStars();  // Draw stars

  requestAnimationFrame(draw); // Keep the animation loop going
}

draw(); // Start the animation
