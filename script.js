// Repeat account switcher lookup until account switcher is found (since waiting for window.load sometimes takes too long)
let registerCallbacksInterval = window.setInterval(() => {
  
  // Get account switcher reference
  let accountSwitcher;
  let accountSwitcherDivLink = document.querySelector('div.gb_fa.gb_8f.gb_f'); // G Suite account switcher
  if (accountSwitcherDivLink) {
    accountSwitcher = accountSwitcherDivLink;
  } else {
    let accountSwitcherALink = document.querySelector('a.gb_x.gb_Da.gb_f'); // Consumer account switcher
    if (accountSwitcherALink) {
      accountSwitcher = accountSwitcherALink;
    }
  }
  
  // If either G Suite or consumer account switcher is found, continue with mutation observer
  if (accountSwitcher) {
    
    // Create mutation observer
    let accountSwitcherObserver = new MutationObserver(() => {
      
      // On each mutation, check if aria-expanded attribute is set to true
      if (accountSwitcher.getAttribute('aria-expanded')) {
        let accountLinkList = document.querySelectorAll('a.gb_yb'); // Account links
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
