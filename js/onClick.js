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

// scrolling position
let lastPos = 0;

function activateHeaderButton(element)
{
  const tablinks = document.getElementsByClassName('header-button');
  for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = '#1a1d45';
    tablinks[i].style.color = '#b8b8b8';
  }
  element.style.backgroundColor = '#b8b8b8';
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
    const currentPos = document.documentElement.scrollTop;
    let goalPos  = document.getElementById(tabName).offsetTop;
    // has to scroll up
    if (currentPos - goalPos > 0)
    {
      const headerHeight = headerElement.offsetHeight;
      goalPos = goalPos - headerHeight - 3;
    }
    // has to scroll down
    else {}

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
    // hide header on scroll down
    const currentPos = document.documentElement.scrollTop;
    if(Math.abs(lastPos - currentPos) <= 0)
      return;
    if (currentPos > lastPos && currentPos > headerElement.offsetHeight){
      headerElement.classList.remove('nav-down');
      headerElement.classList.add('nav-up');
    } else // if (currentPos + window.innerHeight < document.offsetHeight)
    {
      headerElement.classList.remove('nav-up');
      headerElement.classList.add('nav-down');
    }
    lastPos = currentPos;

    // activate right header button
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
console.log(device);
if(device) {
  function noScroll() {
    window.scrollTo(0, 0);
  }  
  window.scrollTo(0, 0);
  window.addEventListener('scroll', noScroll);
} else {
  removeOverlay();
}
