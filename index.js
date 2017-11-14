function appInit() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').then(function(registration) {
      console.log('CLIENT: service worker registration complete.');
      console.log('congrats. scope is: ', registration.scope);
    }, function() {
      console.log('CLIENT: service worker registration failure.');
    });
  } else {
    console.log('CLIENT: service worker is not supported.');
  }
}
