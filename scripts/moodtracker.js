//------------------------------------[ Mood Colors ]
const moodColors = {
  angry: "#ff4e4e",
  average: "#b0b0b0",
  happy: "#ffd166",
  sad: "#78a1bb",
  energetic: "#7ce577",
  productive: "#6ed3cf",
  anxious: "#f39c9c",
  annoyed: "#d68fd6",
  stressed: "#f97575",
  drained: "#8c8ca1",
};

//------------------------------------[ Calendar Setup ]
const calendar = document.getElementById("calendar");
const currentMonthYear = document.getElementById("current-month-year");
let currentDate = new Date();

//------------------------------------[ Generate Calendar ]
function generateCalendar(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const totalDays = new Date(year, month + 1, 0).getDate();
  const startDay = firstDay.getDay(); // 0 (Sun) to 6 (Sat)

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  currentMonthYear.textContent = `${monthNames[month]} ${year}`;

  calendar.innerHTML = "";

  // Weekday headers
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  weekDays.forEach(day => {
    const header = document.createElement("div");
    header.classList.add("day");
    header.style.fontWeight = "bold";
    header.textContent = day;
    calendar.appendChild(header);
  });

  // Blank days for alignment
  for (let i = 0; i < startDay; i++) {
    const blank = document.createElement("div");
    calendar.appendChild(blank);
  }

  // Calendar days
  for (let day = 1; day <= totalDays; day++) {
    const dateKey = `${year}-${(month + 1).toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
    const moods = JSON.parse(localStorage.getItem(`mood-${dateKey}`)) || [];

    const dayEl = document.createElement("div");
    dayEl.classList.add("day");
    dayEl.dataset.date = dateKey;

    const num = document.createElement("div");
    num.className = "day-number";
    num.textContent = day;
    dayEl.appendChild(num);

    const dots = document.createElement("div");
    dots.className = "mood-dots";

    moods.forEach(mood => {
      const dot = document.createElement("div");
      dot.className = "mood-dot";
      dot.style.backgroundColor = moodColors[mood] || "#fff";
      dots.appendChild(dot);
    });

    dayEl.appendChild(dots);
    calendar.appendChild(dayEl);
  }
}

// Initial render
generateCalendar(currentDate);

//------------------------------------[ Month Navigation ]
document.getElementById("prev-month").addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  generateCalendar(currentDate);
});

document.getElementById("next-month").addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  generateCalendar(currentDate);
});

//------------------------------------[ Mood Logging via Prompt ]
document.addEventListener("click", (e) => {
  const clicked = e.target.closest(".day");
  if (!clicked || !clicked.dataset.date) return;

  const selectedDate = clicked.dataset.date;
  const existingMoods = JSON.parse(localStorage.getItem(`mood-${selectedDate}`)) || [];

  const mood = prompt(`Enter moods for ${selectedDate} (comma-separated: happy, sad, etc):`, existingMoods.join(", "));
  if (mood !== null) {
    const moodList = mood
      .split(",")
      .map(m => m.trim().toLowerCase())
      .filter(m => moodColors[m]);

    localStorage.setItem(`mood-${selectedDate}`, JSON.stringify(moodList));
    generateCalendar(currentDate);
  }
});
