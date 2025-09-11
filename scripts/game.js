// 🌠 INIT: When Page Loads
document.addEventListener('DOMContentLoaded', () => {

  // 🔮 Tarot Card Data
  const cards = [
    {
      name: "The Astral Mirror",
      meanings: {
        morning: "Reflection brings clarity. Look within.",
        night: "Dreams speak louder now. Listen closely.",
        default: "Your truth is mirrored in the universe."
      },
      image: "https://i.pinimg.com/1200x/31/be/d3/31bed378e435dcd1eda47c536dc01704.jpg"
    },
    {
      name: "The Drifter Star",
      meanings: {
        morning: "New paths open. Trust your wanderlust.",
        night: "You drift closer to your destiny.",
        default: "Let your heart lead you to uncharted realms."
      },
      image: "https://i.pinimg.com/736x/38/eb/9e/38eb9e3e693ddea752b803cd6c46dee4.jpg"
    },
    {
      name: "The Nebula Veil",
      meanings: {
        morning: "The fog lifts. Hidden truths emerge.",
        night: "Not all is clear—but that's okay.",
        default: "Mystery is your ally today."
      },
      image: "https://i.pinimg.com/736x/55/81/2c/55812c4d3817720ee8b1a7eb0f3ec086.jpg"
    },
    {
      name: "The Moon’s Embrace",
      meanings: {
        morning: "Soft beginnings await. Be gentle with yourself today.",
        night: "The moon wraps you in calm and comfort. You are safe.",
        default: "Even when unseen, you are deeply held by the universe."
      },
      image: "https://i.pinimg.com/736x/b8/5f/15/b85f151e4cee3f3faa4652edef8b0f08.jpg"
    },
    {
      name: "Starborn Bloom",
      meanings: {
        morning: "Hope rises with the light. Something beautiful is growing.",
        night: "Even in darkness, your petals unfold with grace.",
        default: "You are blooming in your own time. No rush, starlight."
      },
      image: "https://i.pinimg.com/1200x/7b/5a/f2/7b5af230d37307048f9baac9424f2c58.jpg"
    },
    {
      name: "The Comet’s Whisper",
      meanings: {
        morning: "A tiny miracle brushes by — open your heart to it.",
        night: "Something lovely is passing through your orbit tonight.",
        default: "The universe leaves soft signs. You are never alone."
      },
      image: "https://i.pinimg.com/1200x/e5/40/78/e54078da278ec56a15f9990baf658054.jpg"
    },
    {
      name: "The Cosmic Nest",
      meanings: {
        morning: "You are cradled in possibility. Begin softly.",
        night: "Rest now. The stars are watching over your dreams.",
        default: "You are held. You are safe. You are home."
      },
      image: "https://i.pinimg.com/736x/ec/dc/76/ecdc761cc230c1d9d45a420ae7a9119c.jpg"
    },
    {
      name: "Solar Kindness",
      meanings: {
        morning: "The sun rises to kiss your cheeks with warmth.",
        night: "Even when unseen, the sun believes in you.",
        default: "You are a light, and you bring warmth just by existing."
      },
      image: "https://i.pinimg.com/736x/d8/6c/c4/d86cc4c6ca99c7bd9822d0845c7a76c9.jpg"
    },
    {
      name: "The Kindred Star",
      meanings: {
        morning: "Someone out there is thinking of you with love.",
        night: "Your soul family glows in distant skies. You are connected.",
        default: "You belong — to yourself, to others, to the cosmos."
      },
      image: "https://i.pinimg.com/1200x/de/d9/fa/ded9faf655b51b0a917270f3229a6ef5.jpg"
    },
    {
      name: "Aurora Whisper",
      meanings: {
        morning: "Gentle changes shimmer on the horizon.",
        night: "You are glowing in quiet, beautiful ways.",
        default: "There is magic in your calm. The sky reflects you."
      },
      image: "https://i.pinimg.com/1200x/77/9c/a4/779ca419153555ad2069523bc1934f92.jpg"
    },
    {
      name: "Nebula Hug",
      meanings: {
        morning: "Wrap yourself in kindness. Today is a soft start.",
        night: "The stars gather to hold you in stillness.",
        default: "You are hugged by the universe, always."
      },
      image: "https://i.pinimg.com/736x/66/d9/e4/66d9e424d3b536da94f88616f7e50313.jpg"
    },
    {
      name: "The Eternal Spark",
      meanings: {
        morning: "Your spark is real — even if small today.",
        night: "No matter the darkness, your light remains.",
        default: "You carry something precious. Don't forget it."
      },
      image: "https://i.pinimg.com/736x/84/b3/e3/84b3e32bdf8dc6cdd36a05e1f7d1b35c.jpg"
    },
    {
      name: "The Cloud of Wishes",
      meanings: {
        morning: "Your dreams float upward like stars in training.",
        night: "The sky has caught your wishes and is holding them close.",
        default: "Hope is not naive — it's brave. And it's yours."
      },
      image: "https://i.pinimg.com/736x/57/3f/9b/573f9b7c78c52f643350e02b2e3079ca.jpg"
    }
  ];

  // 🌅🌃 Get Time of Day
  function getTimeMood() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'morning';
    if (hour >= 18 || hour < 5) return 'night';
    return 'default';
  }

  // 🎴 Draw Tarot Card
  document.getElementById('drawCard').addEventListener('click', () => {
    const userQuestion = document.getElementById('userQuestion').value.trim();
    const card = cards[Math.floor(Math.random() * cards.length)];
    const timeMood = getTimeMood();
    const meaning = card.meanings[timeMood] || card.meanings.default;

    document.getElementById('cardTitle').textContent = card.name;
    document.getElementById('cardImage').src = card.image;
    document.getElementById('cardMeaning').textContent = meaning;
    document.getElementById('cardDisplay').classList.remove('hidden');

    // 🌕 Update moon reflection count
    let reflections = parseInt(localStorage.getItem('reflections') || '0');
    reflections++;
    localStorage.setItem('reflections', reflections);
    updateMoonPhase();
  });

  // 🌙 Moon Companion Setup
  const moonTray = document.getElementById('moonTray');
  const moonImg = document.getElementById('moonPhaseImage');
  const moonMsg = document.getElementById('moonMessage');
  const closeBtn = document.getElementById('closeTray');

  const moonMessages = [
  "Hello, moonbeam.", "Still here, softly glowing.",
  "You're waxing slowly.", "Gentle light, growing brighter.",
  "Phase by phase, we change.", "Dreams shimmer with me.",
  "The dark is cozy too.", "Halfway to fullness.",
  "A quiet pull inside.", "Almost there, little star.",
  "Full-hearted and luminous!", "You're radiant tonight.",
  "Shedding softly.", "Releasing, calmly.",
  "You're safe in every phase.", "Shadow is sacred too.",
  "It's okay to rest.", "Tiny light returning.",
  "New intentions bloom soon.", "You are a whole cycle.",
  "Keep flowing, moonflower.", "Still orbiting with you.",
  "Closer to light again.", "Almost anew.",
  "You're nearly home.", "You’re glowing again.",
  "🌑 New moon — a new beginning.", "Start again, with softness."
];

// 🌙 Update Moon Phase Tray
  function updateMoonPhase() {
    const reflections = parseInt(localStorage.getItem('reflections') || '0');
    const index = Math.min(reflections, 27); // cap at 28 phases
    moonImg.src = `assets/moon-phases/moon-${String(index + 1).padStart(2, '0')}.png`;
    moonMsg.textContent = `"${moonMessages[index]}"`;
  }

  // 🌙 Toggle Tray Visibility
  const moonBtn = document.getElementById('moonButton');
  moonBtn.addEventListener('click', () => {
    moonTray.style.display = moonTray.style.display === 'block' ? 'none' : 'block';
  });

  closeBtn.addEventListener('click', () => {
    moonTray.style.display = 'none';
  });

  // 🌓 Also update moon tray on load
  updateMoonPhase();
});
