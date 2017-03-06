import http from 'axios';
http.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('#token').getAttribute('content');

const {url, uri, auth, language, posterTmdb, posterSubpageTmdb, backdropTmdb} = document.body.dataset;

const config = {
  uri,
  url,
  auth,
  language,
  poster: url + '/assets/poster',
  backdrop: url + '/assets/backdrop',
  posterSubpage: url + '/assets/poster/subpage',
  posterTMDB: posterTmdb,
  posterSubpageTMDB: posterSubpageTmdb,
  backdropTMDB: backdropTmdb,
  api: url + '/api'
};

window.config = config;

export default config;