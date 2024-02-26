const butInstall = document.getElementById('buttonInstall');

// Installing the PWA
// Handle the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    // Store the triggered events
    window.deferredPrompt = event;

    // Remove the hidden class from the button
    butInstall.classList.toggle('hidden', false);
});

// Click event on the `butInstall` element
butInstall.addEventListener('click', async () => {
    
    const promptEvent = window.deferredPrompt;

    if (!promptEvent) {
     return;
    }
  
    // Show prompt
    promptEvent.prompt();
    
    // Reset the deferred prompt variable
    window.deferredPrompt = null;
    
    butInstall.classList.toggle('hidden', true);
});

// Handle the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    window.deferredPrompt = null;
});
