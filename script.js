// Repeat account switcher lookup until account switcher is found (since waiting for window.load sometimes takes too long)
let registerCallbacksInterval = window.setInterval(() => {
  
  // Get account switcher reference
  let accountSwitcher = document.querySelector('div[aria-label="Account Information"]'); // G Suite account switcher
  
  // If either G Suite or consumer account switcher is found, continue with mutation observer
  if (accountSwitcher) {
    
    // Create mutation observer
    let accountSwitcherObserver = new MutationObserver(() => {
      // On each mutation, check if aria-expanded attribute is set to true
      if (accountSwitcher.getAttribute('aria-hidden') === 'false') {
        let accountLinkList = accountSwitcher.querySelectorAll('a'); // Account links
        if (accountLinkList.length > 0) {
          for (let accountLink of accountLinkList) {
            accountLink.setAttribute('target', '_self');
          }
        }
      }
      
    });
    
    // Register mutation observer to account switcher
    accountSwitcherObserver.observe(accountSwitcher, {
      attributes: true
    });
    
    // Clear interval once account switcher is found
    window.clearInterval(registerCallbacksInterval);
    
  }
  
}, 200);
