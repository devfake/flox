<template>
  <transition mode="out-in" name="fade">
    <div class="item-wrap">
      <div class="item-image-wrap">
        <span v-if="localItem.rating" :class="'item-rating rating-' + localItem.rating" @click="changeRating()">
          <i class="icon-rating"></i>
        </span>
        <span v-if=" ! localItem.rating && localItem.tmdb_id && ! rated" class="item-rating item-new" @click="addNewItem()">
          <i class="icon-add"></i>
        </span>
        <span v-if=" ! localItem.rating && localItem.tmdb_id && rated" class="item-rating item-new">
          <span class="loader smallsize-loader"><i></i></span>
        </span>

        <router-link v-if="localItem.tmdb_id" :to="suggestions" class="recommend-item">{{ lang('suggestions') }}</router-link>

        <span class="remove-item" v-if="localItem.rating && auth" @click="removeItem()">{{ lang('delete movie') }}</span>

        <img v-if="localItem.poster" :src="poster" class="item-image" width="185" height="278">
        <img v-if=" ! localItem.poster" :src="noImage" class="item-image" width="185" height="278">

        <span class="show-episode" @click="openSeasonModal()" v-if="displaySeason">
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
  import debounce from 'debounce';
  import Helper from '../../helper';

  import { mapMutations, mapActions } from 'vuex';

  const ratingMilliseconds = 700;
  const newItemMilliseconds = 200;

  export default {
    mixins: [Helper],

    props: ['item', 'genre', 'date'],

    created() {
      this.saveNewRating = debounce(this.saveNewRating, ratingMilliseconds);
      this.addNewItem = debounce(this.addNewItem, newItemMilliseconds, true);
    },

    data() {
      return {
        localItem: this.item,
        latestEpisode: this.item.latest_episode,
        auth: config.auth,
        prevRating: null,
        rated: false
      }
    },

    computed: {
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

      displaySeason() {
        return this.localItem.media_type == 'tv' && this.localItem.rating && this.localItem.tmdb_id;
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

      changeRating() {
        if(this.auth) {
          this.prevRating = this.localItem.rating;
          this.localItem.rating = this.prevRating == 3 ? 1 : +this.prevRating + 1;

          this.saveNewRating();
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
          this.rated = true;

          http.post(`${config.api}/add`, {item: this.localItem}).then(value => {
            this.localItem = value.data;
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