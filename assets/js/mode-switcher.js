(()=> { setModeColour()})();

function setModeColour() {
    let currentTheme = sessionStorage.getItem('theme');
    if (currentTheme == 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.getElementById("theme-toggle").checked = true;
    }
    else {
        document.documentElement.setAttribute('data-theme', 'light');
        document.getElementById("theme-toggle").checked = false;
    }
}

function modeSwitcher() {
    let currentTheme = sessionStorage.getItem('theme');
    if (currentTheme === "dark") {
        document.documentElement.setAttribute('data-theme', 'light');
        sessionStorage.setItem('theme', 'light');
    }   else if (currentTheme === "light") {
        document.documentElement.setAttribute('data-theme', 'dark');
        sessionStorage.setItem('theme', 'dark');
    }else{
        document.documentElement.setAttribute('data-theme', 'dark');
        sessionStorage.setItem('theme', 'dark');
    }
}
