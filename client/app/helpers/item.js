import http from 'axios';

export default {
  methods: {
    addToWatchlist(item) {
      if(this.auth) {
        this.rated = true;

        http.post(`${config.api}/watchlist`, {item}).then(response => {
          this.setItem(response.data);
          this.rated = false;
        }, error => {
          alert(error.message);
          this.rated = false;
        });
      }
    },

    isOn(type, homepage) {
      return homepage && homepage.includes(type);
    },

    genreAsString(genre) {
      if(typeof genre == 'object') {
        return genre.map(item => item.name).join(', ');
      }

      return genre
    },

    displaySeason(item) {
      return item.media_type == 'tv' && item.rating != null && item.tmdb_id && ! item.watchlist;
    },

    openSeasonModal(item) {
      const data = {
        tmdb_id: item.tmdb_id,
        title: item.title
      };

      this.fetchEpisodes(data);

      this.OPEN_MODAL({
        type: 'season',
        data
      });
    },

    addZero(item) {
      if(item < 10) {
        return '0' + item;
      }

      return item;
    },

    intToFloat(int) {
      if(int) {
        return parseFloat(int).toFixed(1);
      }

      return null;
    }
  },

  computed: {
    season() {
      if(this.latestEpisode) {
        return this.addZero(this.latestEpisode.season_number);
      }
    },

    episode() {
      if(this.latestEpisode) {
        return this.addZero(this.latestEpisode.episode_number);
      }
    }
  }
}
