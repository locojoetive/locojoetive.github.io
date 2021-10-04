var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('header').outerHeight();

$(window).scroll((event) => {
    hasScrolled();
});

function hasScrolled() {
    var scrollTop = $(this).scrollTop();
    if(Math.abs(lastScrollTop - scrollTop) <= delta)
        return;
    if (scrollTop > lastScrollTop && scrollTop > navbarHeight){
        $('header').removeClass('nav-down').addClass('nav-up');
    } else if (scrollTop + $(window).height() < $(document).height()) {
        $('header').removeClass('nav-up').addClass('nav-down');
    }
    lastScrollTop = scrollTop;
}