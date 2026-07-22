(function () {
  const oldHosts = ['vivek7892.github.io', 'www.vivek7892.github.io'];
  const targetOrigin = 'https://vivekv.me';
  const repoPrefix = '/vivek';
  const host = window.location.hostname.toLowerCase();

  if (!oldHosts.includes(host)) return;

  let path = window.location.pathname;
  if (path.toLowerCase() === repoPrefix) {
    path = '/';
  } else if (path.toLowerCase().startsWith(repoPrefix + '/')) {
    path = path.slice(repoPrefix.length);
  }

  window.location.replace(targetOrigin + path + window.location.search + window.location.hash);
})();
