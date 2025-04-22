// envUtils.js
function getEnvironment() {
  const currentURL = window.location.href;
  const development = 'http://localhost:8010';
  const production = 'https://jellyfish-app-7ccid.ondigitalocean.app';
  const nitjServer = 'https://jellyfish-app-7ccid.ondigitalocean.app';
  if (currentURL.includes('localhost')) {
    return development;
  } else if (currentURL.includes('nitjtt')) {
    return production;
  } else {
    return nitjServer;
  }
}

export default getEnvironment;
