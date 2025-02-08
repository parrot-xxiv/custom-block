document.addEventListener('DOMContentLoaded', function () {

    const banner = document.querySelector('.banner-bg')
    if(!banner) return;
    window.addEventListener('scroll', function () {
        console.log('scrollingsss...');
        // Use ownerDocument.defaultView to access the window.
        const scroll = window.scrollY;
        if (banner) {
            banner.style.transform = `translateY(${scroll * 0.5}px)`;
        }
    });

})
