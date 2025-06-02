// Detect when the user tries to inspect the webpage
document.addEventListener("contextmenu", function(event) {
    event.preventDefault();
    showProtectionAlert();
});

document.addEventListener("keydown", function(event) {
    if (event.key === "F12" || (event.ctrlKey && event.shiftKey && event.key === "I")) {
        event.preventDefault();
        showProtectionAlert();
    }
});

function showProtectionAlert() {
    // Create a full-screen overlay
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.background = "#fff";
    overlay.style.zIndex = "9999";
    overlay.style.display = "flex";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    overlay.style.flexDirection = "column";

    // Create alert text
    const alertText = document.createElement("h1");
    alertText.textContent = "access denied.";
    overlay.appendChild(alertText);

    // Create reload button
    const reloadButton = document.createElement("button");
    reloadButton.textContent = "Reload Website";
    reloadButton.onclick = function() {
        window.location.reload();
    };
    overlay.appendChild(reloadButton);

    // Add overlay to the page
    document.body.appendChild(overlay);
}


// Disable right-click
document.addEventListener("contextmenu", function(e) {
    e.preventDefault();
}, false);

// Disable keyboard shortcuts
window.addEventListener("keydown", function(e) {
    if (e.ctrlKey && e.shiftKey && e.keyCode == 73) { // Ctrl + Shift + I
        e.preventDefault();
    } else if (e.ctrlKey && e.shiftKey && e.keyCode == 74) { // Ctrl + Shift + J
        e.preventDefault();
    } else if (e.ctrlKey && e.keyCode == 85) { // Ctrl + U
        e.preventDefault();
    }
}, false);

// Disable developer tools
window.addEventListener("keydown", function(e) {
    if (e.ctrlKey && e.shiftKey && e.keyCode == 75) { // Ctrl + Shift + K
        e.preventDefault();
    }
}, false);

// Disable view source
window.addEventListener("keydown", function(e) {
    if (e.ctrlKey && e.keyCode == 83) { // Ctrl + S
        e.preventDefault();
    }
}, false);

// Disable F12 key
window.addEventListener("keydown", function(e) {
    if (e.keyCode == 123) { // F12
        e.preventDefault();
    }
}, false);

if (window.location.href.startsWith("view-source:")) {
  document.body.innerHTML = "🥺";
  document.title = "Access Denied";
}

document.addEventListener('DOMContentLoaded', function() {
  // (Optional) Disable right-click & text selection
  document.addEventListener('contextmenu', (e) => e.preventDefault());
  document.addEventListener('copy', (e) => e.preventDefault());

  // Force action when page loads
  const urlParams = new URLSearchParams(window.location.search);
  
  // Case 1: If you want to trigger a share dialog automatically
  if (!urlParams.has('shared')) { // Prevents infinite loops
    if (navigator.share) {
      navigator.share({
        title: document.title,
        url: window.location.href,
      }).then(() => {
        // Redirect after sharing (optional)
        window.location.href = window.location.href + '?shared=true';
      }).catch(() => {
        // Fallback if user cancels sharing
        alert("Please share this page manually.");
      });
    }
  }

  // Case 2: If you want to hide the real URL (obfuscation)
  history.replaceState({}, '', '/hidden-redirect'); // Masks the URL
});


