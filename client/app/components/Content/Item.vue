<template>
  <transition mode="out-in" name="fade">
    <div class="item-wrap">
      <div class="item-image-wrap">
        <span v-if="localItem.rating" :class="'item-rating rating-' + localItem.rating" @click="changeRating()">
          <i class="icon-rating"></i>
        </span>
        <span v-if=" ! localItem.rating" class="item-rating item-new" @click="addNewItem()">
          <span class="loader smallsize-loader" v-if="rated"><i></i></span>
          <i class="icon-add" v-if=" ! rated"></i>
        </span>
        <router-link :to="'/suggestions?for=' + localItem.tmdb_id" class="recommend-item">Suggestions</router-link>
        <span class="remove-item" v-if="localItem.rating && auth" @click="removeItem()">Delete Movie</span>
        <img v-if="localItem.poster" :src="poster" class="item-image" width="185" height="278">
        <span class="no-image" v-if=" ! localItem.poster"></span>
      </div>

      <div class="item-content">
        <span class="item-year">{{ released }}</span>
        <a :href="`https://www.youtube.com/results?search_query=${title} ${released} Trailer`" target="_blank" :title="title" class="item-title">{{ title }}</a>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    props: ['item'],

    data() {
      return {
        localItem: this.item,
        saveTimeout: null,
        auth: config.auth,
        prevRating: null,
        rated: false
      }
    },

    computed: {
      title() {
        return this.localItem.alternative_title ? this.localItem.alternative_title : this.localItem.title;
      },

      poster() {
        if(this.localItem.rating) {
          return config.poster + this.localItem.poster;
        }

        return config.posterTMDB + this.localItem.poster;
      },

      released() {
        const path = this.$route.path;
        const released = new Date(this.localItem.released * 1000);

        if(path == '/upcoming') {
          const language = navigator.language || navigator.userLanguage;

          return released.toLocaleDateString(language, {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          });
        }

        return released.getFullYear();
      }
    },

    methods: {
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
        this.$http.patch(`${config.api}/change-rating/${this.localItem.id}`, {rating: this.localItem.rating}).catch(error => {
          this.localItem.rating = this.prevRating;
          alert('Error in saveNewRating()');
        });
      },

      addNewItem() {
        if(this.auth) {
          this.rated = true;

          this.$http.post(`${config.api}/add`, {item: this.localItem}).then(value => {
            this.localItem = value.data;
          }, error => {
            if(error.status == 409) {
              alert(this.title + ' already exists!');
            }
          });
        }
      },

      removeItem() {
        if(this.auth) {
          const confirm = window.confirm('Are you sure?');

          if(confirm) {
            this.$http.delete(`${config.api}/remove/${this.localItem.id}`).then(value => {
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