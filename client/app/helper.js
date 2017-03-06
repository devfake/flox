export default {
  methods: {
    // http://stackoverflow.com/a/24559613
    scrollToTop(scrollDuration = 300) {
      let cosParameter = window.scrollY / 2;
      let scrollCount = 0;
      let oldTimestamp = performance.now();

      function step(newTimestamp) {
        scrollCount += Math.PI / (scrollDuration / (newTimestamp - oldTimestamp));

        if(scrollCount >= Math.PI) window.scrollTo(0, 0);
        if(window.scrollY === 0) return;

        window.scrollTo(0, Math.round(cosParameter + cosParameter * Math.cos(scrollCount)));
        oldTimestamp = newTimestamp;
        window.requestAnimationFrame(step);
      }

      window.requestAnimationFrame(step);
    },

    addZero(item) {
      if(item < 10) {
        return '0' + item;
      }

      return item;
    },

    // Language helper
    lang(text) {
      const language = JSON.parse(config.language);

      return language[text];
    },

    formatLocaleDate(date) {
      const language = navigator.language || navigator.userLanguage;

      return date.toLocaleDateString(language, {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit'
      });
    }
  },

  computed: {
    displayHeader() {
      if(this.$route.name == 'subpage-tv' || this.$route.name == 'subpage-movie') {
        return this.itemLoadedSubpage;
      }

      return true;
    }
  }
}