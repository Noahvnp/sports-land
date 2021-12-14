//javascript for the responsive navigation menu
var menu = document.querySelector(".nav-bar__items");
var menuBtn = document.querySelector(".menu-btn");
var closeBtn = document.querySelector(".close-btn");

menuBtn.addEventListener("click", () => {
    menu.classList.add("active");
});

closeBtn.addEventListener("click", () => {
    menu.classList.remove("active");
});

// //javascript for the header bar effects on scroll
window.addEventListener("scroll", function(){
    var header = document.querySelector(".header");
    header.classList.toggle("sticky-header", window.scrollY > 0);
});

// javascipt search form
var searchForm = document.querySelector('.search-form');
var form = document.querySelector('.header__search-form')
document.querySelector('.search-btn').onclick = () =>{
    form.classList.toggle('active');
}

// function hideSearchForm(){
//   form.classList.remove('active');
// }

// form.addEventListener('click', hideSearchForm);

// containerForm.addEventListener('click', function(event) {
//     event.stopPropagation();
// })



// jquery for button back to top
$(document).ready(function() {
    $(window).scroll(function(){
        if($(this).scrollTop()) {
            $('#back-top').fadeIn();
        } else {
            $('#back-top').fadeOut();
        }  
    });

    $('#back-top').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 100);
    });
});