function getLocationFromBOM() {
    const { href, protocol, host, hostname, port, pathname, search, hash } = window.location;
  
    console.log('Full URL:', href);
    console.log('Protocol:', protocol);
    console.log('Host:', host);
    console.log('Hostname:', hostname);
    console.log('Port:', port);
    console.log('Pathname:', pathname);
    console.log('Search Parameters:', search);
    console.log('Hash:', hash);
  }
  
  // Call the function to log location information
  getLocationFromBOM();
  