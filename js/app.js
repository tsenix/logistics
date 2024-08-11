(() => {
    "use strict";
    let bodyLockStatus = true;
    let bodyUnlock = (delay = 500) => {
        if (bodyLockStatus) {
            const lockPaddingElements = document.querySelectorAll("[data-lp]");
            setTimeout((() => {
                lockPaddingElements.forEach((lockPaddingElement => {
                    lockPaddingElement.style.paddingRight = "";
                }));
                document.body.style.paddingRight = "";
                document.documentElement.classList.remove("lock");
            }), delay);
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    let bodyLock = (delay = 500) => {
        if (bodyLockStatus) {
            const lockPaddingElements = document.querySelectorAll("[data-lp]");
            const lockPaddingValue = window.innerWidth - document.body.offsetWidth + "px";
            lockPaddingElements.forEach((lockPaddingElement => {
                lockPaddingElement.style.paddingRight = lockPaddingValue;
            }));
            document.body.style.paddingRight = lockPaddingValue;
            document.documentElement.classList.add("lock");
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    function menuInit() {
        const menuOpenButton = document.querySelector(".header__menu-open");
        const menuCloseButton = document.querySelector(".mobile__menu-close");
        const menuLinks = document.querySelectorAll(".mobile__menu-item");
        const langButton = document.querySelector(".mobile__lang");
        menuOpenButton.addEventListener("click", (() => {
            menuOpen();
        }));
        menuCloseButton.addEventListener("click", (() => {
            functions_menuClose();
        }));
        for (const menuLink of menuLinks) menuLink.addEventListener("click", (() => {
            functions_menuClose();
        }));
        langButton.addEventListener("click", (() => {
            functions_menuClose();
        }));
    }
    function menuOpen() {
        bodyLock();
        document.documentElement.classList.add("menu-open");
    }
    function functions_menuClose() {
        bodyUnlock();
        document.documentElement.classList.remove("menu-open");
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    document.addEventListener("DOMContentLoaded", (function() {
        const sliderTrack = document.querySelector(".slider__track");
        const images = Array.from(sliderTrack.children);
        images.forEach((image => {
            const clone = image.cloneNode(true);
            sliderTrack.appendChild(clone);
        }));
        const trackWidth = sliderTrack.scrollWidth;
        sliderTrack.style.width = `${trackWidth}px`;
        let offset = 0;
        const speed = .5;
        function autoScroll() {
            offset -= speed;
            if (Math.abs(offset) >= trackWidth / 2) offset = 0;
            sliderTrack.style.transform = `translateX(${offset}px)`;
            requestAnimationFrame(autoScroll);
        }
        function applyGravityEffect() {
            sliderTrack.style.transition = "transform 0.5s ease-in-out";
        }
        sliderTrack.addEventListener("transitionend", (function() {
            applyGravityEffect();
        }));
        autoScroll();
    }));
    window["FLS"] = false;
    menuInit();
})();