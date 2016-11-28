<template>
  <transition mode="out-in" name="fade">
    <div class="item-wrap">
      <div class="item-image-wrap">
        <span v-if="localItem.rating" :class="'item-rating rating-' + localItem.rating" @click="changeRating()">
          <i class="icon-rating"></i>
        </span>
        <span v-if=" ! localItem.rating" class="item-rating item-new" :class="{disabled: disabled}" @click="addNewItem()">
          <span class="loader smallsize-loader" v-if="rated"><i></i></span>
          <i class="icon-add" v-if=" ! rated"></i>
        </span>

        <router-link :to="'/suggestions?for=' + localItem.tmdb_id + '&type=' + localItem.media_type" class="recommend-item">{{ lang('suggestions') }}</router-link>
        <span class="remove-item" v-if="localItem.rating && auth" @click="removeItem()">{{ lang('delete movie') }}</span>

        <img v-if="localItem.poster" :src="poster" class="item-image" width="185" height="278">
        <img v-if=" ! localItem.poster" :src="noImage" class="item-image" width="185" height="278">

        <span class="show-episode" @click="editEpisodes()" v-if="localItem.media_type == 'tv' && localItem.rating">
          <span class="season-item"><i>S</i>{{ season }}</span>
          <span class="episode-item"><i>E</i>{{ episode }}</span>
        </span>
      </div>

      <div class="item-content">
        <span v-if="date == 1" class="item-year">{{ released }}</span>
        <a :href="youtube" target="_blank" :title="localItem.title" class="item-title">{{ localItem.title }}</a>
        <span v-if="genre == 1" class="item-genre">{{ localItem.genre }}</span>
      </div>
    </div>
  </transition>
</template>

<script>
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
        saveTimeout: null,
        auth: config.auth,
        prevRating: null,
        rated: false,
        disabled: false
      }
    },

    computed: {
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
          const language = navigator.language || navigator.userLanguage;

          return released.toLocaleDateString(language, {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
          });
        }

        return released.getFullYear();
      },

      youtube() {
        return `https://www.youtube.com/results?search_query=${this.localItem.title} ${this.released} Trailer`;
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

      editEpisodes() {
        this.fetchEpisodes({
          tmdb_id: this.localItem.tmdb_id,
          title: this.localItem.title
        });
        this.openModal();
      },

      openModal() {
        if(this.auth) {
          this.OPEN_MODAL({
            type: 'season',
            data: {
              tmdb_id: this.localItem.tmdb_id,
              title: this.localItem.title
            }
          });
        }
      },

      changeRating() {
        if(this.auth) {
          clearTimeout(this.saveTimeout);

          this.prevRating = this.localItem.rating;
          this.localItem.rating = this.prevRating == 3 ? 1 : +this.prevRating + 1;

          this.saveTimeout = setTimeout(() => {
            this.saveNewRating();
          }, 500);
        }
      },

      saveNewRating() {
        http.patch(`${config.api}/change-rating/${this.localItem.id}`, {rating: this.localItem.rating}).catch(error => {
          this.localItem.rating = this.prevRating;
          alert('Error in saveNewRating()');
        });
      },

      addNewItem() {
        if(this.auth) {
          this.disabled = true;
          this.rated = true;

          http.post(`${config.api}/add`, {item: this.localItem}).then(value => {
            this.localItem = value.data;
            this.disabled = false;
            this.rated = false;
          }, error => {
            if(error.status == 409) {
              alert(this.localItem.title + ' already exists!');
            }
          });
        }
      },

      removeItem() {
        if(this.auth) {
          const confirm = window.confirm(this.lang('confirm delete'));

          if(confirm) {
            http.delete(`${config.api}/remove/${this.localItem.id}`).then(value => {
              this.localItem.rating = null;
            }, error => {
              alert('Error in removeItem()');
            });
          }
        }
      }
    }
  }
</script>