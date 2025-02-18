document.addEventListener("DOMContentLoaded", function() {
  // Gallery 燈箱效果
  const galleryImages = document.querySelectorAll('.gallery-card img');
  galleryImages.forEach(img => {
    img.addEventListener('click', function() {
      const src = this.getAttribute('src');
      document.getElementById('lightboxImage').setAttribute('src', src);
      new bootstrap.Modal(document.getElementById('lightboxModal')).show();
    });
  });

  // 平滑滾動（導覽列連結）
  const navLinks = document.querySelectorAll('a.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if(targetElement) {
        const yOffset = -60;
        const yPosition = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: yPosition, behavior: 'smooth' });
      }
    });
  });

  // 高亮目前所在區塊的導覽連結
  const sections = document.querySelectorAll("section[id]");
  window.addEventListener("scroll", function() {
    let currentSection = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 80;
      if(window.pageYOffset >= sectionTop) {
        currentSection = section.getAttribute("id");
      }
    });
    navLinks.forEach(link => {
      link.classList.remove("active");
      if(link.getAttribute("href") === "#" + currentSection) {
        link.classList.add("active");
      }
    });
  });

  // 回到頂端按鈕
  let backToTopButton = document.getElementById("backToTop");
  if(!backToTopButton) {
    backToTopButton = document.createElement("button");
    backToTopButton.id = "backToTop";
    backToTopButton.innerHTML = '<i class="bi bi-arrow-up-short"></i>';
    backToTopButton.classList.add("back-to-top");
    document.body.appendChild(backToTopButton);
  }
  backToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  window.addEventListener("scroll", () => {
    if(window.pageYOffset > 300) {
      backToTopButton.classList.add("show");
    } else {
      backToTopButton.classList.remove("show");
    }
  });

  // Intersection Observer 為 .fade-in 元素加入淡入效果
  const faders = document.querySelectorAll(".fade-in");
  const appearOptions = { threshold: 0.2, rootMargin: "0px 0px -50px 0px" };
  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(!entry.isIntersecting) return;
      entry.target.classList.add("appear");
      observer.unobserve(entry.target);
    });
  }, appearOptions);
  faders.forEach(fader => appearOnScroll.observe(fader));

  // 視差滾動效果：調整 hero 區塊背景位置
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if(hero) {
      hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
    }
  });
});
