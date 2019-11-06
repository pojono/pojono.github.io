document.addEventListener("DOMContentLoaded",
    // toggleTheme function.
    // this script shouldn't be changed.
    function () {
        console.log("DOM LOADED!");
        let _Blog = window._Blog || {};
        const defaultTheme = "dark";
        if (!window.localStorage.getItem('theme')) {
            window.localStorage.setItem('theme', defaultTheme);
        }
        const currentTheme = window.localStorage && window.localStorage.getItem('theme');
        const isDark = currentTheme === 'dark';
        if (isDark) {
            document.getElementById("switch_default").checked = true;
            // mobile
            document.getElementById("mobile-toggle-theme").innerText = "· Dark"
        } else {
            document.getElementById("switch_default").checked = false;
            // mobile
            document.getElementById("mobile-toggle-theme").innerText = "· Dark"
        }
        _Blog.toggleTheme = function () {
            console.log("TOGGLE!");
            if (isDark) {
                document.getElementsByTagName('body')[0].classList.add('dark-theme');
                // mobile
                document.getElementById("mobile-toggle-theme").innerText = "· Dark"
            } else {
                document.getElementsByTagName('body')[0].classList.remove('dark-theme');
                // mobile
                document.getElementById("mobile-toggle-theme").innerText = "· Light"
            }
            document.getElementsByClassName('toggleBtn')[0].addEventListener('click', () => {
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
                if (document.getElementsByTagName('body')[0].classList.contains('dark-theme')) {
                    document.getElementsByTagName('body')[0].classList.remove('dark-theme');
                    // mobile
                    document.getElementById("mobile-toggle-theme").innerText = "· Light"

                } else {
                    document.getElementsByTagName('body')[0].classList.add('dark-theme');
                    // mobile
                    document.getElementById("mobile-toggle-theme").innerText = "· Dark"
                }
                window.localStorage &&
                window.localStorage.setItem('theme', window.localStorage.getItem('theme') === 'light' ? 'dark' : 'light',)
            })
        };
        _Blog.toggleTheme();
    }
);