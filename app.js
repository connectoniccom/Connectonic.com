document.addEventListener('DOMContentLoaded', () => {
    const page = window.location.pathname;
    let scriptToLoad;

    if (page.includes('Card.html')) {
        scriptToLoad = 'Card.js';
    } else {
        scriptToLoad = 'script.js';
    }

    if (scriptToLoad) {
        const script = document.createElement('script');
        script.src = scriptToLoad;
        document.head.appendChild(script);
    }
});
