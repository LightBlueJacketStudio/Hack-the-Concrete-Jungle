document.addEventListener("DOMContentLoaded", function() {
  const mission = document.getElementById("mission");

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    if (scrollY > 100) {
      mission.classList.add("shrink");
    } else {
      mission.classList.remove("shrink");
    }
  });
});

    window.addEventListener("scroll", () => {
      const scrollTop = window.scrollY; // how far you’ve scrolled
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight; // value between 0 and 1

      // Interpolate between two colors (blue → purple → red)
      const startColor = { r: 52, g: 152, b: 219 };   // #3498db (blue)
      const endColor   = { r: 231, g: 76,  b: 60  };   // #e74c3c (red)

      // Calculate the intermediate color
      const r = Math.round(startColor.r + (endColor.r - startColor.r) * scrollPercent);
      const g = Math.round(startColor.g + (endColor.g - startColor.g) * scrollPercent);
      const b = Math.round(startColor.b + (endColor.b - startColor.b) * scrollPercent);

      document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    });

    
    const missions = [
      "Empowering people to make smarter choices through clear, accessible information.",
      "Helping creators grow their influence while staying true to their voice.",
      "Building technology that supports transparency, creativity, and community."
    ];

    const missionEl = document.getElementById("mission");

    let missionIndex = 0; // which paragraph
    let charIndex = 0; // which character
    let typing = true; // direction (typing or deleting)

    function typeEffect() {
      const currentText = missions[missionIndex];

      if (typing) {
        // Typing forward
        if (charIndex < currentText.length) {
          missionEl.textContent = currentText.substring(0, charIndex + 1);
          charIndex++;
          setTimeout(typeEffect, 50);
        } else {
          typing = false;
          setTimeout(typeEffect, 1500); // pause after typing
        }
      } else {
        // Deleting backward
        if (charIndex > 0) {
          missionEl.textContent = currentText.substring(0, charIndex - 1);
          charIndex--;
          setTimeout(typeEffect, 30);
        } else {
          typing = true;
          // Move to next paragraph
          missionIndex = (missionIndex + 1) % missions.length;
          setTimeout(typeEffect, 800); // pause before typing next one
        }
      }
    }

    // Start typing when page loads
    window.addEventListener("load", typeEffect);