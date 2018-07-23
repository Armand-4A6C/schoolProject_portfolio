const hamburger = document.querySelector(".header-logo").addEventListener("click", function(){ MenuController()});

function MenuController() {
    document.querySelector(".header-main-ul").classList.toggle("mobile_display_none");
}
