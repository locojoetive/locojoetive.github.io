
// content container
const aboutContainer = document.getElementById('about-container');
const gamesContainer = document.getElementById('games-container');
const cvContainer = document.getElementById('cv-container');


// header buttons
const aboutButton = document.getElementById('about-button');
const gamesButton = document.getElementById('games-button');
const cvButton = document.getElementById('cv-button');

function highlightHeaderButton(element)
{
  const themeBackgroundColor = '#1a1d45';
  const themeColor = '#ffffff';
  for (let headerButton of document.getElementsByClassName('header-button')) {
    headerButton.style.backgroundColor = themeBackgroundColor;
    headerButton.style.color= themeColor;
  }
  element.style.backgroundColor = themeColor;
  element.style.color = themeBackgroundColor;
}

function openTab(tabName, elmnt) {
  // header
  const headerElement = document.getElementsByTagName('HEADER')[0];
  // highlight respective header button
  highlightHeaderButton(elmnt);
  
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
    const goalPos  = document.getElementById(tabName).offsetTop - headerElement.offsetHeight;
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
  // highlight respective header button
  const currentPos = document.documentElement.scrollTop;
  const halfWindowHeight = 0.5 * window.innerHeight;
  const gamesYPos = gamesContainer.offsetTop - halfWindowHeight;
  const cvYPos = cvContainer.offsetTop - halfWindowHeight;
  if (currentPos > cvYPos)
    highlightHeaderButton(cvButton);
  else if (currentPos > gamesYPos)
    highlightHeaderButton(gamesButton);
  else
    highlightHeaderButton(aboutButton);  
}

function noScroll() {
  // display overlay on mobile devices
  window.scrollTo(0, 0);
}

function removeOverlay() {
  document.getElementById('overlay').style.display = "none";  
  window.removeEventListener('scroll', noScroll);
}

// start by highlighting about button
highlightHeaderButton(aboutButton);

// highlight button when scrolling
window.addEventListener("scroll", hasScrolled);

// display overlay on mobile devices
const device = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
if(device) {  
  window.scrollTo(0, 0);
  window.addEventListener('scroll', noScroll);
} else
  removeOverlay();
