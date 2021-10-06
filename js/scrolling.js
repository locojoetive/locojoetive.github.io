var lastScrollTop = 0;
var delta = 0;
var navbarHeight = $('header').outerHeight();
$(window).scroll((event) => {
    hasScrolled();
});

function hasScrolled() {
    var scrollTop = $(this).scrollTop();
    if(Math.abs(lastScrollTop - scrollTop) <= delta)
        return;
    if (scrollTop > lastScrollTop && scrollTop > 10){
        $('header').removeClass('nav-down').addClass('nav-up');
    } else if (scrollTop + $(window).height() < $(document).height()) {
        $('header').removeClass('nav-up').addClass('nav-down');
    }
    
    console.log(lastScrollTop - scrollTop)
    lastScrollTop = scrollTop;
}