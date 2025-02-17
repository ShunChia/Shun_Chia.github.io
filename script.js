// 在這裡可加入額外互動特效、滾動事件監聽等
// 例如：導覽列滾動陰影
window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
      navbar.classList.add("shadow");
    } else {
      navbar.classList.remove("shadow");
    }
  });
  