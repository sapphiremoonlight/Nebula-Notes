/* ============================================
  🍔 MOBILE NAV MENU TOGGLE
============================================ */
const menuBtn = document.getElementById('menu-btn');
const navMenu = document.getElementById('nav-menu');

menuBtn?.addEventListener('click', () => {
  const expanded = menuBtn.getAttribute('aria-expanded') === 'true' || false;
  menuBtn.setAttribute('aria-expanded', !expanded);
  navMenu.classList.toggle('open');
  navMenu.setAttribute('aria-hidden', expanded);
});

/* ============================================
  😊 MOOD SELECTOR HANDLING
============================================ */
const moodSelector = document.getElementById("mood-selector");
const moodCircles = moodSelector?.querySelectorAll(".mood") || [];
const hiddenInput = document.getElementById("selected-moods");

moodCircles.forEach(mood => {
  mood.addEventListener("click", () => {
    mood.classList.toggle("selected");

    const selected = Array.from(moodSelector.querySelectorAll(".mood.selected"))
      .map(m => m.dataset.mood);

    hiddenInput.value = JSON.stringify(selected);
  });
});

/* ============================================
  ✍️ ENTRY FORM SUBMISSION
============================================ */
const form = document.getElementById("entryForm");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const title = document.getElementById("entry-title").value;
    const date = document.getElementById("entry-date").value;
    const tags = document.getElementById("entry-tags").value;
    const content = document.getElementById("entry-content").value;
    const moods = JSON.parse(document.getElementById("selected-moods").value || "[]");

    const existingId = form.getAttribute("data-edit-id");

    const entry = {
      id: existingId || Date.now(),
      title,
      date,
      tags,
      content,
      moods,
    };

    localStorage.setItem(`entry-${entry.id}`, JSON.stringify(entry));

    alert(existingId ? "✅ Entry updated!" : "🌟 Entry saved!");
    form.reset();
    hiddenInput.value = "";
    moodCircles.forEach(m => m.classList.remove("selected"));
    form.removeAttribute("data-edit-id");

    if (typeof loadEntries === "function") loadEntries();
  });
}

/* ============================================
  🗑️ DELETE ENTRY
============================================ */
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete-btn")) {
    const id = e.target.getAttribute("data-id");
    const confirmed = confirm("Are you sure you want to delete this entry?");
    if (confirmed) {
      localStorage.removeItem(`entry-${id}`);
      if (typeof loadEntries === "function") loadEntries();
    }
  }
});

/* ============================================
  ✏️ EDIT ENTRY
============================================ */
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("edit-btn")) {
    const id = e.target.getAttribute("data-id");
    const entry = JSON.parse(localStorage.getItem(`entry-${id}`));
    if (!entry) return;

    document.getElementById("entry-title").value = entry.title || "";
    document.getElementById("entry-date").value = entry.date || "";
    document.getElementById("entry-tags").value = entry.tags || "";
    document.getElementById("entry-content").value = entry.content || "";

    moodCircles.forEach(m => {
      m.classList.remove("selected");
      if ((entry.moods || []).includes(m.dataset.mood)) {
        m.classList.add("selected");
      }
    });

    hiddenInput.value = JSON.stringify(entry.moods || []);
    form.setAttribute("data-edit-id", id);
  }
});

/* ============================================
  🚀 LOADING SCREEN TRANSITIONS
============================================ */
document.addEventListener('DOMContentLoaded', () => {
  const loadingOverlay = document.getElementById('loadingOverlay');
  if (!loadingOverlay) {
    console.warn('No loading overlay found!');
    return;
  }

  let isNavigating = false;

  function showLoadingAndNavigate(url) {
    if (isNavigating) return;
    isNavigating = true;

    loadingOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
      window.location.href = url;
    }, 1500);
  }

  document.querySelectorAll('a[href]').forEach((link) => {
    const href = link.getAttribute('href');
    if (
      href &&
      !href.startsWith('http') &&
      !href.startsWith('#') &&
      !href.startsWith('mailto:') &&
      !href.startsWith('javascript:')
    ) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        showLoadingAndNavigate(href);
      });
    }
  });

  // Page has fully loaded — remove loading overlay
  window.addEventListener('load', () => {
    loadingOverlay.classList.remove('active');
    document.body.style.overflow = '';
  });
});


/* ============================================
  🧨 DEV TOOL: Reset All Entries (Disabled)
============================================ */
// const resetBtn = document.getElementById("reset-entries");

// if (resetBtn) {
//   resetBtn.addEventListener("click", () => {
//     const confirmed = confirm("⚠️ This will delete ALL your journal entries. Are you sure?");
//     if (!confirmed) return;

//     Object.keys(localStorage).forEach(key => {
//       if (key.startsWith("entry-")) {
//         localStorage.removeItem(key);
//       }
//     });

//     alert("✅ All entries deleted.");
//     if (typeof loadEntries === "function") loadEntries();
//   });
// }
