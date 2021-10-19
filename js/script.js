// content container
const aboutContainer = document.getElementById('about-container');
const gamesContainer = document.getElementById('games-container');
const cvContainer = document.getElementById('cv-container');

// header
const headerElement = document.getElementsByTagName('HEADER')[0];

// header buttons
const aboutButton = document.getElementById('about-button');
const gamesButton = document.getElementById('games-button');
const cvButton = document.getElementById('cv-button');
activateHeaderButton(aboutButton);

function activateHeaderButton(element)
{
  const tablinks = document.getElementsByClassName('header-button');
  for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = '#1a1d45';
    tablinks[i].style.color = '#ffffff';
  }
  element.style.backgroundColor = '#ffffff';
  element.style.color = '#1a1d45';
}

function openTab(tabName, elmnt) {
  // activate right header button
  activateHeaderButton(elmnt);

  // scroll to the top
  if (tabName === 'about-container') {
    window.scroll(
      {
        top: 0,
        behavior: 'smooth'
      }
    );
  }
  // scroll to respective section
  else {
    const headerHeight = headerElement.offsetHeight;
    let goalPos  = document.getElementById(tabName).offsetTop - headerHeight;

    // scroll to goalPos
    window.scroll(
      {
        top: goalPos,
        behavior: 'smooth'
      }
    );
  }
}

function hasScrolled() {
  // activate right header button
  const currentPos = document.documentElement.scrollTop;
  const halfWindowHeight = 0.5 * window.innerHeight;
  const gamesYPos = gamesContainer.offsetTop - halfWindowHeight;
  const cvYPos = cvContainer.offsetTop - halfWindowHeight;
  if (currentPos > cvYPos)
    activateHeaderButton(cvButton);
  else if (currentPos > gamesYPos)
    activateHeaderButton(gamesButton);
  else
    activateHeaderButton(aboutButton);  
}

window.addEventListener("scroll", (event) => {
  hasScrolled();
});

function removeOverlay() {
  document.getElementById('overlay').style.display = "none";  
  window.removeEventListener('scroll', noScroll);
}

const device = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
if(device) {
  function noScroll() {
    window.scrollTo(0, 0);
  }  
  window.scrollTo(0, 0);
  window.addEventListener('scroll', noScroll);
} else {
  removeOverlay();
}
