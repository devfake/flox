import http from 'axios';
http.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('#token').getAttribute('content');

const {url, uri, auth, scoutDriver, language} = document.body.dataset;

const config = {
  uri,
  url,
  auth,
  language,
  scoutDriver,
  poster: url + '/assets/poster',
  posterTMDB: 'https://image.tmdb.org/t/p/w185',
  api: url + '/api'
};

window.config = config;

export default config;