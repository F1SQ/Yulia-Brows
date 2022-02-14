$(document).ready(function () {
  const servicesSlider = new Swiper(".services-slider", {
    // Optional parameters
    loop: true,
    speed: 700,
    grabCursor: true,
    observer: true,

    // Navigation arrows
    navigation: {
      nextEl: ".services-slider__button--next",
      prevEl: ".services-slider__button--prev",
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
  });

  //header
  var nav = $(".header-menu");

  $(window).scroll(function () {
    if ($(this).scrollTop() > 136) {
      nav.addClass("header-menu_scroll");
    } else {
      nav.removeClass("header-menu_scroll");
    }
  });

  //tabs
  let tabs = document.querySelectorAll(".services-menu li");
  let contents = document.querySelectorAll(".services-tabWrapper");
  tabs[0].classList.add("active");
  contents[0].style.display = "block";

  // tabs.forEach(el => {
  //   el.addEventListener('click', function() {
  //     let index = el.dataset.tab;
  //     document.querySelector('.services-menu li.active').classList.remove('active');
  //     el.classList.add('active');
  //     for (let i = 0; i < contents.length; i++) {
  //       contents[i].style.display = "none";
  //     }
  //     index = index - 1;
  //     fadeIn(contents[index]);
  //   });
  // });

  tabs.forEach(function (el, i) {
    el.addEventListener("click", function () {
      document
        .querySelector(".services-menu li.active")
        .classList.remove("active");
      el.classList.add("active");
      for (let i = 0; i < contents.length; i++) {
        contents[i].style.display = "none";
      }
      fadeIn(contents[i]);
    });
  });

  function fadeIn(el) {
    var opacity = 0.01;
    el.style.display = "block";
    var timer = setInterval(function () {
      if (opacity >= 1) {
        clearInterval(timer);
      }
      el.style.opacity = opacity;
      opacity += opacity * 0.1;
    }, 10);
  }

  // hidden-menu
  $(".aside-button").click(function () {
    $(".hidden-menu").addClass("hidden-menu--visible");
    return false;
  });
  $(".hidden-menu__close").click(function () {
    $(".hidden-menu").removeClass("hidden-menu--visible");
  });
  $(".hidden-menu__list a").click(function () {
    $(".hidden-menu").removeClass("hidden-menu--visible");
    $("body").removeClass("_lock");
    $(".header-menu__burger").removeClass("_active");
  });

  const anchors = document.querySelectorAll('a[href*="#"]');
  for (let anchor of anchors) {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const blockID = anchor.getAttribute("href");
      document.querySelector("" + blockID).scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }

  const menuBurger = document.querySelector(".header-menu__burger");
  if (menuBurger) {
    const mobileMenu = document.querySelector(".hidden-menu");
    menuBurger.addEventListener("click", function (e) {
      document.body.classList.toggle("_lock");
      menuBurger.classList.toggle("_active");
      mobileMenu.classList.toggle("hidden-menu--visible");
    });
  }

  const isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (
        isMobile.Android() ||
        isMobile.BlackBerry() ||
        isMobile.iOS() ||
        isMobile.Opera() ||
        isMobile.Windows()
      );
    },
  };

  if (isMobile.any()) {
    document.body.classList.add("_touch");
  } else {
    document.body.classList.add("_pc");
  }

  AOS.init({
    startEvent: "DOMContentLoaded",
    once: true,
    disable: function () {
      var maxWidth = 992;
      return window.innerWidth < maxWidth;
    },
  });
});
