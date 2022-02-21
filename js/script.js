// content container
const personContainer = document.getElementById('person-container');
const gamesContainer = document.getElementById('games');
const cvContainer = document.getElementById('cv');


// header buttons
const personButton = document.getElementById('person-button');
const gamesButton = document.getElementById('games-button');
const cvButton = document.getElementById('cv-button');

// header
const headerElement = document.getElementsByTagName('HEADER')[0];

// start by highlighting home button
highlightHeaderButton(personButton);
// highlight button when scrolling
window.addEventListener('scroll', hasScrolled);

// overlay
const overlay = document.getElementById('overlay');
var starPositionOverlay = 0;
var scrollToPosition = 0;
var dontScrollWhenOnGames = false;
var currentTimeInMs = 0;
var intervalId = 0;

// display overlay on mobile devices
document.getElementById('overlay').style.display = 'none';
const device = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
if (device) {
  dontScrollWhenOnGames = true;
}

function highlightHeaderButton(element)
{
  for (let headerButton of document.getElementsByClassName('header-button')) {
    headerButton.classList.remove("header-button-active");
    headerButton.classList.add("header-button-inactive");
  }
  if (element)
  {
    element.classList.remove("header-button-inactive");
    element.classList.add("header-button-active");
  }
}

function openTab(tabName, elmnt) {  
  // highlight respective header button
  // highlightHeaderButton(elmnt);
  
  const goalPos  = document.getElementById(tabName).offsetTop - headerElement.offsetHeight;
  // scroll to goalPos
  window.scroll(
    {
      top: goalPos,
      behavior: 'smooth'
    }
  );
}

function hasScrolled() {
  // highlight respective header button
  const currentPos = document.documentElement.scrollTop;
  const halfWindowHeight = 0.5 * window.innerHeight;
  const gamesYPos = gamesContainer.offsetTop - halfWindowHeight;
  const cvYPos = cvContainer.offsetTop - halfWindowHeight;
  if (currentPos > cvYPos)
    highlightHeaderButton(cvButton);
  else if (currentPos > gamesYPos) {
    // on mobile devices scroll to paperfighter
    if (dontScrollWhenOnGames) {
      overlay.style.display = 'flex';
      starPositionOverlay = document.documentElement.scrollTop;
      window.removeEventListener('scroll', hasScrolled);
      window.addEventListener('scroll', noScroll);
      const startTimeInMs = Date.now();
      intervalId = setInterval(() => {
        const timeInMs = Date.now();
        currentTimeInMs = timeInMs - startTimeInMs;
        const paperFighter = document.getElementById('paper-fighter');
        const scrollTargetPosition = paperFighter.offsetTop - headerElement.offsetHeight;
        scrollToPosition = clampedInterpolate(starPositionOverlay, scrollTargetPosition, currentTimeInMs / 1000, 'EOCI');
        window.scrollTo(0, scrollToPosition);
      }, 1000/60);
      dontScrollWhenOnGames = false;
    }
    highlightHeaderButton(gamesButton);
  }
  else if (currentPos < gamesYPos)
  {
    highlightHeaderButton(personButton);
  }
}

function noScroll() {
  // display overlay on mobile devices
  window.scrollTo(0, scrollToPosition);
}

function removeOverlay() {
  clearInterval(intervalId);
  overlay.style.display = 'none';
  window.removeEventListener('scroll', noScroll);
  window.addEventListener('scroll', hasScrolled);
}

function clampedInterpolate(x, y, step, interpolate) {
  let interpolation = 0;
  step = step < 0 ? 0 : step;
  step = step > 1 ? 1 : step;
  switch(interpolate) {
    case 'EOCU':
      interpolation = easeOutCubic(step);
      break;
    case 'EOCI':
      interpolation = easeOutCircular(step);
      break;
    case 'L':
      interpolation = step;
      break;
    default:
      break;
  }
  return x + (y-x) * interpolation;
}

function easeOutCubic(step) {
  return 1 - Math.pow(1 - step, 3)
}

function easeOutCircular(step) {
  return Math.sqrt(1 - Math.pow(step - 1, 2));
}