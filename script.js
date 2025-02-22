document.addEventListener("DOMContentLoaded", function() {
  /**********************************/
  /* 1. Gallery Lightbox 功能      */
  /**********************************/
  const galleryImages = document.querySelectorAll('.gallery-card img');
  galleryImages.forEach(img => {
    img.addEventListener('click', function() {
      const src = this.getAttribute('src');
      document.getElementById('lightboxImage').setAttribute('src', src);
      new bootstrap.Modal(document.getElementById('lightboxModal')).show();
    });
  });

  /**********************************/
  /* 2. 平滑滾動 (導覽列連結)       */
  /**********************************/
  const navLinks = document.querySelectorAll('a.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const yOffset = -60; // 補償固定導覽列高度
        const yPosition = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: yPosition, behavior: 'smooth' });
      }
    });
  });

  /**********************************/
  /* 3. 高亮導覽連結 (根據滾動位置)   */
  /**********************************/
  const sections = document.querySelectorAll("section[id]");
  window.addEventListener("scroll", function() {
    let currentSection = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 80;
      if (window.pageYOffset >= sectionTop) {
        currentSection = section.getAttribute("id");
      }
    });
    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + currentSection) {
        link.classList.add("active");
      }
    });
  });

  /**********************************/
  /* 4. 回到頂端按鈕               */
  /**********************************/
  let backToTopButton = document.getElementById("backToTop");
  if (!backToTopButton) {
    backToTopButton = document.createElement("button");
    backToTopButton.id = "backToTop";
    backToTopButton.innerHTML = '<i class="bi bi-arrow-up-short"></i>';
    backToTopButton.classList.add("back-to-top");
    document.body.appendChild(backToTopButton);
  }
  backToTopButton.addEventListener("click", function() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  window.addEventListener("scroll", function() {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add("show");
    } else {
      backToTopButton.classList.remove("show");
    }
  });

  /**********************************/
  /* 5. Intersection Observer 淡入效果 */
  /**********************************/
  const faders = document.querySelectorAll(".fade-in");
  const appearOptions = { threshold: 0.2, rootMargin: "0px 0px -50px 0px" };
  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("appear");
      observer.unobserve(entry.target);
    });
  }, appearOptions);
  faders.forEach(fader => appearOnScroll.observe(fader));

  /**********************************/
  /* 6. Hero 視差滾動效果 (背景)      */
  /**********************************/
  window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    if (hero) {
      const scrolled = window.pageYOffset;
      hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
    }
  });

  /**********************************/
  /* 7. 證照卡片點擊事件與模態視窗   */
  /**********************************/
  // 證照詳細資訊資料（圖片檔名為 Certificates1.jpg ~ Certificates10.jpg）
  const certDetails = {
    cert1: {
      title: "乙級室內配線技術士",
      description: "具備專業室內配線設計與施工能力，能根據建築需求進行精細規劃，嚴格遵守安全規範，確保電力系統穩定運作。擁有豐富實際案例與工程經驗。",
      image: "images/Certificates1.jpg"
    },
    cert2: {
      title: "乙級通信技術(電信線路)技術士",
      description: "熟悉通信網路設計、安裝與維護，確保通訊系統高效且穩定運作，滿足各項安全與技術標準。",
      image: "images/Certificates2.jpg"
    },
    cert3: {
      title: "丙級用電設備檢驗技術士",
      description: "具備嚴謹的用電設備檢驗技能，能夠全面檢測工業設備，確保符合安全與節能標準，保障生產安全。",
      image: "images/Certificates3.jpg"
    },
    cert4: {
      title: "丙級工業電子技術士",
      description: "具備工業電子元件與控制系統維護能力，能迅速排查故障，確保工業生產系統穩定高效運作。",
      image: "images/Certificates4.jpg"
    },
    cert5: {
      title: "丙級電腦硬體裝修技術士",
      description: "專精於電腦硬體安裝、裝修與系統整合，提供穩定、高效的 IT 解決方案，滿足企業需求。",
      image: "images/Certificates5.jpg"
    },
    cert6: {
      title: "營造業甲種勞工安全衛生業務主管",
      description: "熟悉營造業工地安全標準與風險管控，能制定並執行全面安全衛生計劃，保障施工現場安全順利。",
      image: "images/Certificates6.jpg"
    },
    cert7: {
      title: "甲種勞工安全衛生業務主管",
      description: "展現卓越的企業內部安全管理能力，建立完善安全制度，有效預防職業災害，確保生產環境安全。",
      image: "images/Certificates7.jpg"
    },
    cert8: {
      title: "AutoCAD國際認證",
      description: "精通 AutoCAD 軟體操作，具備卓越的 2D 工程圖與 3D 模型繪製能力，能將設計理念轉化為工程藍圖，提升設計效率。",
      image: "images/Certificates8.jpg"
    },
    cert9: {
      title: "三等業餘無線電人員執照",
      description: "具備業餘無線電操作技能，能獨立設置與維護無線電系統，展現專業無線電愛好者的技術水準。",
      image: "images/Certificates9.jpg"
    },
    cert10: {
      title: "EMT-1 救護技術員",
      description: "擁有基礎急救與現場應變能力，能在緊急情況下迅速提供救護支援，確保受傷者獲得及時救治。",
      image: "images/Certificates10.jpg"
    }
  };

  // 為所有證照卡片（包含按鈕）加上點擊事件，點擊後開啟證照詳細資訊模態視窗
  const certCards = document.querySelectorAll('.certification-card');
  certCards.forEach(card => {
    card.addEventListener('click', function() {
      const certKey = this.getAttribute('data-cert');
      const certData = certDetails[certKey];
      if (certData) {
        // 更新模態視窗標題與內容，將圖片設定為縮小尺寸
        document.getElementById('certModalTitle').textContent = certData.title;
        document.getElementById('certModalBody').innerHTML = `
          <p>${certData.description}</p>
          <img src="${certData.image}" alt="${certData.title}" class="img-fluid rounded" style="max-width:300px; display:block; margin: 0 auto;">
        `;
        new bootstrap.Modal(document.getElementById('certModal')).show();
      }
    });
  });

  /**************************************/
  /* 其他功能：如平滑滾動、回到頂端等功能 */
  /**************************************/
  // (此處請將原有其他功能的程式碼整合進來)
});
