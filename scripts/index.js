// Show 3 most recent journal entries from localStorage
const previewContainer = document.getElementById('entry-preview-list');
const keys = Object.keys(localStorage).filter(k => k.startsWith("entry-"));
const recent = keys.sort().reverse().slice(0, 3);

recent.forEach(key => {
  const data = JSON.parse(localStorage.getItem(key));
  const div = document.createElement("div");
  div.className = "entry-preview";
  div.innerHTML = `
    <strong>${data.title || 'Untitled'}</strong><br>
    <small>${data.date || 'Unknown Date'}</small>
    <p>${data.text?.slice(0, 80) || ''}...</p>
  `;
  previewContainer.appendChild(div);
});

// EASTER EGG 🪺

let keysPressed = [];

document.addEventListener("keydown", e => {
  keysPressed.push(e.key);
  if (keysPressed.slice(-5).join("") === "stars") {
    alert("🪺 You found an Easter Egg! You're a star!");
  }
});

