function openTab(tabName, elmnt) {
    console.log(tabName);
    var i, tablinks;
    
    if (tabName === 'about') {
      document.body.scrollIntoView(
        {
          behavior: 'smooth',
          block:    'start'
        }
      );
    }
    else {
      document.getElementById(tabName).scrollIntoView(
        {
          behavior: 'smooth',
          block:    'start'
        }
      );
    }

    tablinks = document.getElementsByClassName('tab-link');
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].style.backgroundColor = '#1a1d45';
      tablinks[i].style.color = '#b8b8b8';
    }
    elmnt.style.backgroundColor = '#b8b8b8';
    elmnt.style.color = '#1a1d45';
}

var defaultButton = document.getElementById("default-button")
defaultButton.style.backgroundColor = '#b8b8b8';
defaultButton.style.color = '#1a1d45';;