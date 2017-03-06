import http from 'axios';

export function loadItems({commit}, response) {
  commit('SET_LOADING', true);
  http(`${config.api}/items/${response.name}/${response.filter}`).then(value => {
    const {data, next_page_url} = value.data;

    commit('SET_ITEMS', data);
    commit('SET_PAGINATOR', next_page_url);

    setTimeout(() => {
      commit('SET_LOADING', false);
    }, 500);
  }, error => {
    if(error.status == 404) {
      window.location.href = config.url;
    }
  });
}

export function loadMoreItems({commit}, next_page_url) {
  commit('SET_CLICKED_LOADING', true);
  http(next_page_url).then(value => {
    const {data, next_page_url} = value.data;

    commit('SET_PAGINATOR', next_page_url);

    setTimeout(() => {
      commit('PUSH_TO_ITEMS', data);
      commit('SET_CLICKED_LOADING', false);
    }, 500);
  });
}

export function setSearchTitle({commit}, title) {
  commit('SET_SEARCH_TITLE', title);
}

export function setColorScheme({commit}, color) {
  document.body.classList.remove('dark', 'light');

  localStorage.setItem('color', color);
  document.body.classList.add(color);

  commit('SET_COLOR_SCHEME', color);
}

export function fetchEpisodes({commit}, data) {
  commit('SET_LOADING_MODAL_DATA', true);
  http(`${config.api}/episodes/${data.tmdb_id}`).then(response => {
    const nextEpisode = response.data.next_episode;

    commit('SET_MODAL_DATA', {
      title: data.title,
      episodes: response.data.episodes,
      spoiler: response.data.spoiler
    });

    commit('SET_LOADING_MODAL_DATA', false);

    if(nextEpisode) {
      commit('SET_SEASON_ACTIVE_MODAL', nextEpisode.season_number);

      // Scroll to next episode
      setTimeout(() => {
        const container = document.querySelector('.modal-content');
        const episode = document.querySelector(`[data-episode='${nextEpisode.episode_number}']`);

        container.scrollTop = episode.offsetTop - episode.offsetHeight;
      }, 10);
    }
  });
}