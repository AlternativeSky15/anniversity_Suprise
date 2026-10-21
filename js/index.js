(function () {
  function $(id) {
    return document.getElementById(id);
  }

  var card = $("card"),
    openB = $("open"),
    closeB = $("close"),
    vinylDisc = $("vinylDisc"),
    restartBtn = $("restartBtn"),
    music = $("bgMusic"),
    progressBar = $("progressBar"),
    progressContainer = $("progressContainer"),
    currentTimeEl = $("currentTime"),
    durationTimeEl = $("durationTime"),
    timer = null;

  // Floating Hearts Function
  function createHearts() {
    const container = $("heart-container");
    if (!container) return;

    container.innerHTML = "";
    const heartIcons = ["❤️", "💕", "🌸"];

    for (let i = 0; i < 15; i++) {
      const heart = document.createElement("div");
      heart.className = "heart-particle";
      heart.innerHTML =
        heartIcons[Math.floor(Math.random() * heartIcons.length)];
      heart.style.left = Math.random() * 90 + "%";
      heart.style.animationDuration = Math.random() * 3 + 3 + "s";
      heart.style.animationDelay = Math.random() * 2 + "s";
      heart.style.fontSize = Math.random() * 8 + 12 + "px";
      container.appendChild(heart);
    }
  }

  // Time Formatter
  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return mins + ":" + (secs < 10 ? "0" : "") + secs;
  }

  // Toggle Play/Pause on Vinyl Click
  function togglePlay(e) {
    if (e) e.stopPropagation();
    if (music.paused) {
      music.play();
      if (vinylDisc) vinylDisc.classList.add("playing");
    } else {
      music.pause();
      if (vinylDisc) vinylDisc.classList.remove("playing");
    }
  }

  if (vinylDisc && music) {
    // ဓာတ်ပြားကို နှိပ်လိုက်ရုံဖြင့် သီချင်း Play/Pause ဖြစ်မည်
    vinylDisc.addEventListener("click", togglePlay);

    // Restart Song
    if (restartBtn) {
      restartBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        music.currentTime = 0;
      });
    }

    // Update Progress Bar & Timer
    music.addEventListener("timeupdate", function () {
      if (music.duration) {
        const progressPercent = (music.currentTime / music.duration) * 100;
        if (progressBar) progressBar.style.width = progressPercent + "%";
        if (currentTimeEl)
          currentTimeEl.innerText = formatTime(music.currentTime);
        if (durationTimeEl)
          durationTimeEl.innerText = formatTime(music.duration);
      }
    });

    // Seek Song Position on Progress Bar Click
    if (progressContainer) {
      progressContainer.addEventListener("click", function (e) {
        e.stopPropagation();
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = music.duration;
        if (duration) {
          music.currentTime = (clickX / width) * duration;
        }
      });
    }
  }

  // Open Card Event
  openB.addEventListener("click", function () {
    card.setAttribute("class", "open-half");
    if (timer) clearTimeout(timer);

    timer = setTimeout(function () {
      card.setAttribute("class", "open-fully");
      timer = null;
      createHearts();
    }, 1000);
  });

  // Close Card Event
  closeB.addEventListener("click", function () {
    card.setAttribute("class", "close-half");

    // Clear Hearts & Stop Music
    const container = $("heart-container");
    if (container) container.innerHTML = "";

    if (music && !music.paused) {
      music.pause();
      if (vinylDisc) vinylDisc.classList.remove("playing");
    }

    if (timer) clearTimeout(timer);
    timer = setTimeout(function () {
      card.setAttribute("class", "");
      timer = null;
    }, 1000);
  });
})();
