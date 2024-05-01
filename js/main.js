(function ($) {
  "use strict";

  // Preloader
  $(window).on('load', function () {
    if ($('#preloader').length) {
      $('#preloader').delay(100).fadeOut('slow', function () {
        $(this).remove();
      });
    }
  });

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function(){
    $('html, body').animate({scrollTop : 0},1500, 'easeInOutExpo');
    return false;
  });

  // Initiate the wowjs animation library
  new WOW().init();

  // Initiate superfish on nav menu
  $('.nav-menu').superfish({
    animation: {
      opacity: 'show'
    },
    speed: 400
  });

  // Mobile Navigation
  if ($('#nav-menu-container').length) {
    var $mobile_nav = $('#nav-menu-container').clone().prop({
      id: 'mobile-nav'
    });
    $mobile_nav.find('> ul').attr({
      'class': '',
      'id': ''
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>');
    $('body').append('<div id="mobile-body-overly"></div>');
    $('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');

    $(document).on('click', '.menu-has-children i', function(e) {
      $(this).next().toggleClass('menu-item-active');
      $(this).nextAll('ul').eq(0).slideToggle();
      $(this).toggleClass("fa-chevron-up fa-chevron-down");
    });

    $(document).on('click', '#mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
      $('#mobile-body-overly').toggle();
    });

    $(document).click(function(e) {
      var container = $("#mobile-nav, #mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
      }
    });
  } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
    $("#mobile-nav, #mobile-nav-toggle").hide();
  }

  // Header scroll class
  // $(window).scroll(function() {
  //   if ($(this).scrollTop() > 100) {
  //     $('#header').addClass('header-scrolled');
  //   } else {
  //     $('#header').removeClass('header-scrolled');
  //   }
  // });

  // if ($(window).scrollTop() > 100) {
  //   $('#header').addClass('header-scrolled');
  // }

  // Smooth scroll for the menu and links with .scrollto classes
  $('.nav-menu a, #mobile-nav a, .scrollto').on('click', function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      if (target.length) {
        var top_space = 0;

        if ($('#header').length) {
          top_space = $('#header').outerHeight();

          if (! $('#header').hasClass('header-scrolled')) {
            top_space = top_space - 20;
          }
        }

        $('html, body').animate({
          scrollTop: target.offset().top - top_space
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu').length) {
          $('.nav-menu .menu-active').removeClass('menu-active');
          $(this).closest('li').addClass('menu-active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
        return false;
      }
    }
  });

  // Navigation active state on scroll
  var nav_sections = $('section');
  var main_nav = $('.nav-menu, #mobile-nav');
  var main_nav_height = $('#header').outerHeight();

  $(window).on('scroll', function () {
    var cur_pos = $(this).scrollTop();
  
    nav_sections.each(function() {
      var top = $(this).offset().top - main_nav_height,
          bottom = top + $(this).outerHeight();
  
      if (cur_pos >= top && cur_pos <= bottom) {
        main_nav.find('li').removeClass('menu-active menu-item-active');
        main_nav.find('a[href="#'+$(this).attr('id')+'"]').parent('li').addClass('menu-active menu-item-active');
      }
    });
  });

  // Intro carousel
  var introCarousel = $(".carousel");
  var introCarouselIndicators = $(".carousel-indicators");
  introCarousel.find(".carousel-inner").children(".carousel-item").each(function(index) {
    (index === 0) ?
    introCarouselIndicators.append("<li data-target='#introCarousel' data-slide-to='" + index + "' class='active'></li>") :
    introCarouselIndicators.append("<li data-target='#introCarousel' data-slide-to='" + index + "'></li>");

    $(this).css("background-image", "url('" + $(this).children('.carousel-background').children('img').attr('src') +"')");
    $(this).children('.carousel-background').remove();
  });

  $(".carousel").swipe({
    swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
      if (direction == 'left') $(this).carousel('next');
      if (direction == 'right') $(this).carousel('prev');
    },
    allowPageScroll:"vertical"
  });

  // Skills section
  $('#skills').waypoint(function() {
    $('.progress .progress-bar').each(function() {
      $(this).css("width", $(this).attr("aria-valuenow") + '%');
    });
  }, { offset: '80%'} );

  // jQuery counterUp (used in Facts section)
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });

  // Porfolio isotope and filter
  var portfolioIsotope = $('.portfolio-container').isotope({
    itemSelector: '.portfolio-item',
    layoutMode: 'fitRows'
  });

  $('#portfolio-flters li').on( 'click', function() {
    $("#portfolio-flters li").removeClass('filter-active');
    $(this).addClass('filter-active');

    portfolioIsotope.isotope({ filter: $(this).data('filter') });
  });

  // Clients carousel (uses the Owl Carousel library)
  $(".clients-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    responsive: { 0: { items: 2 }, 768: { items: 4 }, 900: { items: 6 }
    }
  });

  // Testimonials carousel (uses the Owl Carousel library)
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  });

})(jQuery);

// START OF PRODUCTS PAGE
function navigateToAdvan() {
  // Redirect to another.html
  window.location.href = 'advan/advan.html';
}

function navigateToPixelwar() {
  // Redirect to another.html
  window.location.href = 'advan-laptops/pixelwar/pixelwar.html';
}
function navigateToVxlite() {
  // Redirect to another.html
  window.location.href = 'advan-laptops/vxlite/vxlite.html';
}
function navigateToXtab() {
  // Redirect to another.html
  window.location.href = 'advan-laptops/xtab/xtab.html';
}

function navigateToWorkpro() {
  // Redirect to another.html
  window.location.href = 'advan-laptops/workpro/workpro.html';
}
function navigateToWorkproFromHome() {
  // Redirect to another.html
  window.location.href = 'products/advan/advan-laptops/workpro/workpro.html';
}

function navigateToWorkplus() {
  // Redirect to another.html
  window.location.href = 'advan-laptops/workplus/workplus.html';
}

function navigateToWorkplusFromHome() {
  // Redirect to another.html
  window.location.href = 'products/advan/advan-laptops/workplus/workplus.html';
}

function navigateToSoulmate() {
  // Redirect to another.html
  window.location.href = 'advan-laptops/soulmate/soulmate.html';
}

function navigateToSoulmateFromHome() {
  // Redirect to another.html
  window.location.href = 'products/advan/advan-laptops/soulmate/soulmate.html';
}

function navigateToHuawei() {
  // Redirect to another.html
  window.location.href = 'huawei/huawei.html';
}

function navigateToMatebookD14() {
  // Redirect to another.html
  window.location.href = 'huawei-laptops/matebook-d14/matebook-d14.html';
}

function navigateToMatebookD14FromHome() {
  // Redirect to another.html
  window.location.href = 'products/huawei/huawei-laptops/matebook-d14/matebook-d14.html';
}

function navigateToMatebookD15() {
  // Redirect to another.html
  window.location.href = 'huawei-laptops/matebook-d15/matebook-d15.html';
}

function navigateToMatebookD16() {
  // Redirect to another.html
  window.location.href = 'huawei-laptops/matebook-d16/matebook-d16.html';
}

function navigateToMatebookD16FromHome() {
  // Redirect to another.html
  window.location.href = 'products/huawei/huawei-laptops/matebook-d16/matebook-d16.html';
}

function navigateToMatepad() {
  // Redirect to another.html
  window.location.href = 'huawei-laptops/matepad/matepad.html';
}

function navigateToMatepadAir() {
  // Redirect to another.html
  window.location.href = 'huawei-laptops/matepad-air/matepad-air.html';
}

function navigateToMatepadPro() {
  // Redirect to another.html
  window.location.href = 'huawei-laptops/matepad-pro/matepad-pro.html';
}

function nextSlide() {
  // Find the carousel element and move to the next slide
  var carousel = document.getElementById('introCarousel');
  console.log('carousel',carousel);
  var carouselInstance = bootstrap.Carousel.getInstance(carousel);
  console.log('carousel isntance',carouselInstance);
  carouselInstance.next();
}

