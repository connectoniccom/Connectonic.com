document.addEventListener('DOMContentLoaded', () => {
    const page = window.location.pathname;
    let scriptToLoad;
    let lockScript = 'lock.js';

    if (page.includes('Card.html')) {
        scriptToLoad = 'Card.js';
    } else {
        scriptToLoad = 'script.js';
    }

    if (lockScript) {
        const script = document.createElement('script');
        script.src = lockScript;
        document.head.appendChild(script);
    }
    
    if (scriptToLoad) {
        const script = document.createElement('script');
        script.src = scriptToLoad;
        document.head.appendChild(script);
    }
});
