<template>
  <transition mode="out-in" name="fade">
    <div class="item-wrap">
      <div class="item-image-wrap">
        <rating :item="localItem" :set-item="setItem"></rating>

        <router-link v-if="localItem.tmdb_id" :to="suggestions" class="recommend-item">{{ lang('suggestions') }}</router-link>
        <span v-if="auth && localItem.rating == null" class="add-to-watchlist" @click="addToWatchlist()">Add to watchlist</span>

        <router-link :to="{ name: `subpage-${localItem.media_type}`, params: { tmdbId: localItem.tmdb_id }}">
          <img v-if="localItem.poster" :src="poster" class="item-image" width="185" height="278">
          <img v-if=" ! localItem.poster" :src="noImage" class="item-image" width="185" height="278">
        </router-link>

        <span class="show-episode" @click="openSeasonModal()" v-if="displaySeason">
          <span class="season-item"><i>S</i>{{ season }}</span>
          <span class="episode-item"><i>E</i>{{ episode }}</span>
        </span>
      </div>

      <div class="item-content">
        <span v-if="date == 1" class="item-year">{{ released }}</span>
        <i class="item-has-src" v-if="hasSrc"></i>
        <router-link :to="{ name: `subpage-${localItem.media_type}`, params: { tmdbId: localItem.tmdb_id }}" class="item-title" :title="localItem.title">{{ localItem.title }}</router-link>
        <span v-if="genre == 1" class="item-genre">{{ localItem.genre }}</span>
      </div>
    </div>
  </transition>
</template>

<script>
  import Rating from '../Rating.vue';

  import http from 'axios';
  import Helper from '../../helper';

  import { mapMutations, mapActions } from 'vuex';

  export default {
    mixins: [Helper],

    props: ['item', 'genre', 'date'],

    data() {
      return {
        localItem: this.item,
        latestEpisode: this.item.latest_episode,
        prevRating: null,
        auth: config.auth
      }
    },

    computed: {
      hasSrc() {
        return this.localItem.src || this.localItem.episodes_with_src_count > 0;
      },

      poster() {
        if(this.localItem.rating) {
          return config.poster + this.localItem.poster;
        }

        return config.posterTMDB + this.localItem.poster;
      },

      suggestions() {
        return `/suggestions?for=${this.localItem.tmdb_id}&name=${this.localItem.title}&type=${this.localItem.media_type}`;
      },

      noImage() {
        return config.url + '/assets/img/no-image.png';
      },

      released() {
        const path = this.$route.path;
        const released = new Date(this.localItem.released * 1000);

        if(path == '/upcoming') {
          return this.formatLocaleDate(released);
        }

        return released.getFullYear();
      },

      youtube() {
        return `https://www.youtube.com/results?search_query=${this.localItem.title} ${this.released} Trailer`;
      },

      displaySeason() {
        return this.localItem.media_type == 'tv' && this.localItem.rating != null && this.localItem.tmdb_id;
      },

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

        return '0';
      }
    },

    methods: {
      ...mapMutations([ 'OPEN_MODAL' ]),
      ...mapActions([ 'fetchEpisodes' ]),

      openSeasonModal() {
        const data = {
          tmdb_id: this.localItem.tmdb_id,
          title: this.localItem.title
        };

        this.fetchEpisodes(data);

        this.OPEN_MODAL({
          type: 'season',
          data
        });
      },

      setItem(item) {
        this.localItem = item;
      },

      addToWatchlist() {

      }
    },

    components: {
      Rating
    }
  }
</script>