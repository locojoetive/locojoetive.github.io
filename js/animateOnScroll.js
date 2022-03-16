var currentScrollPosition = 0;
var previousScrollPosition = 0;

const containers = document.getElementsByClassName('game-item-container');
const imagesToAnimate = document.getElementsByClassName('game-item-image');
const divsToAnimate = document.getElementsByClassName('game-item-text');

window.addEventListener('scroll', hasScrolledToAnimate);

function hasScrolledToAnimate()
{
    previousScrollPosition = currentScrollPosition;
    currentScrollPosition = document.documentElement.scrollTop;
    const halfWindowHeight = 0.5 * window.innerHeight;
    const isScrollingDown = currentScrollPosition - previousScrollPosition > 0;
    if (isScrollingDown)
    {
        for (let i = 0; i < containers.length; i++)
        {
            const imageYPosUpperBound = containers[i].offsetTop - 1.5 * halfWindowHeight;
            const imageYPosLowerBound = containers[i].offsetTop - 2 * halfWindowHeight;
            if (currentScrollPosition > imageYPosUpperBound
                && previousScrollPosition <= imageYPosUpperBound
            ) {
                containers[i].classList.remove('not-visible');
                imagesToAnimate[i].classList.add('slide-in-image');
                divsToAnimate[2*i].classList.add('slide-in-text');
                divsToAnimate[2*i+1].classList.add('slide-in-text');
            }
            else if (currentScrollPosition < imageYPosLowerBound)
            {
                containers[i].classList.add('not-visible');
                imagesToAnimate[i].classList.remove('slide-in-image');
                divsToAnimate[2*i].classList.remove('slide-in-text');
                divsToAnimate[2*i+1].classList.remove('slide-in-text');
            }
        }
    }
}