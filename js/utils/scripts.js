window.addEventListener('DOMContentLoaded', event => {
    
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle){
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb|sidenav-toggled'));
        })
    }
    
});


// carousel slider
// var swiper = new Swiper(".swiper-container", {
//   spaceBetween: 30,
//   effect: "fade",
//   loop: true,
//   autoplay: {
//     delay: 3500,
//     disableOnInteraction: false,
//   },
// });

// testimonial slider
// var swiper = new Swiper(".swiper-testimonials", {
//   effect: "coverflow",
//   grabCursor: true,
//   centeredSlides: true,
//   slidesPerView: "auto",
//   slidesPerView: "3",
//   coverflowEffect: {
//     rotate: 50,
//     stretch: 0,
//     depth: 100,
//     modifier: 1,
//     slideShadows: false,
//   },
//   pagination: {
//     el: ".swiper-pagination",
//   },
//   breakpoints: {
//     320: {
//       slidesPerView: 1,
//     },
//     640: {
//       slidesPerView: 1,
//     },
//     768: {
//       slidesPerView: 2,
//     },
//     1024: {
//       slidesPerView: 3,
//     },
//   },
// });