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
