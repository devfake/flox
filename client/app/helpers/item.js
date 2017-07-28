export default {
  methods: {
    displaySeason(item) {
      return item.media_type == 'tv' && item.rating != null && item.tmdb_id;
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

      return '01';
    },

    episode() {
      if(this.latestEpisode) {
        return this.addZero(this.latestEpisode.episode_number);
      }

      return '01';
    }
  }
}