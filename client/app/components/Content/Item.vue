<template>
  <transition mode="out-in" name="fade">
    <div class="item-wrap">
      <div class="item-image-wrap no-select">
        <rating :item="localItem" :set-item="setItem"></rating>

        <router-link v-if="localItem.tmdb_id" :to="suggestionsUri(localItem)" class="recommend-item">{{ lang('suggestions') }}</router-link>
        <span v-if="auth && localItem.rating == null" class="add-to-watchlist" @click="addToWatchlist()">{{ lang('add to watchlist') }}</span>
        <span v-if="auth && ! localItem.tmdb_id" class="edit-item" @click="editItem()">Edit</span>

        <router-link :to="{ name: `subpage-${localItem.media_type}`, params: { tmdbId: localItem.tmdb_id, slug: localItem.slug }}">
          <img v-if="localItem.poster" :src="poster" class="item-image" width="185" height="278">
          <img v-if=" ! localItem.poster" :src="noImage" class="item-image" width="185" height="278">
        </router-link>

        <span class="show-episode" @click="openSeasonModal(localItem)" v-if="displaySeason(localItem)">
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
  import MiscHelper from '../../helpers/misc';
  import ItemHelper from '../../helpers/item';

  import { mapMutations, mapActions } from 'vuex';

  export default {
    mixins: [MiscHelper, ItemHelper],

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
      }
    },

    methods: {
      ...mapMutations([ 'OPEN_MODAL' ]),
      ...mapActions([ 'fetchEpisodes' ]),

      setItem(item) {
        this.localItem = item;
      },

      addToWatchlist() {

      },

      editItem() {

      }
    },

    components: {
      Rating
    }
  }
</script>