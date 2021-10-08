const defaultButton = document.getElementById("default-button")
defaultButton.style.backgroundColor = '#b8b8b8';
defaultButton.style.color = '#1a1d45';

let lastScrollTop = 0;
const delta = 0;
const navbarHeight = $('header').outerHeight();

function openTab(tabName, elmnt) {
    if (tabName === 'about') {
      window.scroll(
        {
          top: 0,
          behavior: 'smooth'
        }
      );
    }
    else {
      const currentPos = $(this).scrollTop();
      let goalPos  = document.getElementById(tabName).offsetTop;
      console.log("FROM: " + currentPos);
      console.log("TO: " + goalPos);
      
      if (currentPos - goalPos > 0)
      {
        const headerHeight = $('header').outerHeight();
        console.log("Scroll up! " + headerHeight);
        goalPos = goalPos - headerHeight - 3;
      }
      else
      {
        console.log("Scroll down!");
      }
      window.scroll(
        {
          top: goalPos,
          behavior: 'smooth'
        }
      );
    }
    let i, tablinks;
    tablinks = document.getElementsByClassName('tab-link');
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].style.backgroundColor = '#1a1d45';
      tablinks[i].style.color = '#b8b8b8';
    }
    elmnt.style.backgroundColor = '#b8b8b8';
    elmnt.style.color = '#1a1d45';
}

function hasScrolled() {
    var scrollTop = $(this).scrollTop();
    if(Math.abs(lastScrollTop - scrollTop) <= delta)
        return;
    if (scrollTop > lastScrollTop && scrollTop > 10){
        $('header').removeClass('nav-down').addClass('nav-up');
    } else if (scrollTop + $(window).height() < $(document).height()) {
        $('header').removeClass('nav-up').addClass('nav-down');
    }
    lastScrollTop = scrollTop;
}

$(window).scroll((event) => {
  hasScrolled();
});
