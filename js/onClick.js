function openTab(tabName, elmnt) {
    console.log(tabName);
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName('tab-content');
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = 'none';
    }
    tablinks = document.getElementsByClassName('tab-link');
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].style.backgroundColor = '#000000';
      tablinks[i].style.color = '#ffffff';
    }
    document.getElementById(tabName).style.display = "block";
    elmnt.style.backgroundColor = '#afff01';
    elmnt.style.color = '#000000';
}

document.getElementById("default-button").click();