document.addEventListener("DOMContentLoaded",
    // toggleTheme function.
    // this script shouldn't be changed.
    function () {
        let _Blog = window._Blog || {};
        const defaultTheme = "dark";
        console.log("Current theme: ", window.localStorage.getItem('theme'));
        if (!window.localStorage.getItem('theme')) {
            window.localStorage.setItem('theme', defaultTheme);
        }
        console.log("Current theme now: ", window.localStorage.getItem('theme'));
        const currentTheme = window.localStorage && window.localStorage.getItem('theme');
        const isDark = currentTheme === 'dark';
        if (isDark) {
            document.getElementById("switch_default").checked = true;
            // mobile
            document.getElementById("mobile-toggle-theme").innerText = " · Dark"
        } else {
            document.getElementById("switch_default").checked = false;
            // mobile
            document.getElementById("mobile-toggle-theme").innerText = " · Dark"
        }
        _Blog.toggleTheme = function () {
            if (isDark) {
                console.log("SET DARK!");
                document.getElementsByTagName('body')[0].classList.add('dark-theme');
                // mobile
                document.getElementById("mobile-toggle-theme").innerText = " · Dark"
            } else {
                console.log("SET LIGHT!");
                document.getElementsByTagName('body')[0].classList.remove('dark-theme');
                // mobile
                document.getElementById("mobile-toggle-theme").innerText = " · Light"
            }
            document.getElementsByClassName('toggleBtn')[0].addEventListener('click', () => {
                console.log("TOGGLE DESKTOP!");
                if (document.getElementsByTagName('body')[0].classList.contains('dark-theme')) {
                    document.getElementsByTagName('body')[0].classList.remove('dark-theme');
                } else {
                    document.getElementsByTagName('body')[0].classList.add('dark-theme');
                }
                window.localStorage &&
                window.localStorage.setItem('theme', window.localStorage.getItem('theme') === 'light' ? 'dark' : 'light',)
            });
            // moblie
            document.getElementById('mobile-toggle-theme').addEventListener('click', () => {
                console.log("TOGGLE MOBILE!");
                if (document.getElementsByTagName('body')[0].classList.contains('dark-theme')) {
                    document.getElementsByTagName('body')[0].classList.remove('dark-theme');
                    // mobile
                    document.getElementById("mobile-toggle-theme").innerText = " · Light"
                } else {
                    document.getElementsByTagName('body')[0].classList.add('dark-theme');
                    // mobile
                    document.getElementById("mobile-toggle-theme").innerText = " · Dark"
                }
                window.localStorage &&
                window.localStorage.setItem('theme', window.localStorage.getItem('theme') === 'light' ? 'dark' : 'light',)
            })
        };
        _Blog.toggleTheme();
    }
);