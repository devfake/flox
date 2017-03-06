<template>
  <div>
    <span v-if="item.rating != null" :class="'item-rating rating-' + item.rating" @click="changeRating()">
      <i class="icon-rating"></i>
    </span>
    <span v-if="item.rating == null && item.tmdb_id && ! rated" class="item-rating item-new" @click="addNewItem()">
      <i class="icon-add"></i>
    </span>
    <span v-if="item.rating == null && item.tmdb_id && rated" class="item-rating item-new">
      <span class="loader smallsize-loader"><i></i></span>
    </span>
  </div>
</template>

<script>
  import debounce from 'debounce';
  import http from 'axios';

  const ratingMilliseconds = 700;
  const newItemMilliseconds = 200;

  export default {
    props: ['item', 'set-item'],

    data() {
      return {
        rated: false,
        auth: config.auth
      }
    },

    created() {
      this.saveNewRating = debounce(this.saveNewRating, ratingMilliseconds);
      this.addNewItem = debounce(this.addNewItem, newItemMilliseconds, true);
    },

    methods: {
      changeRating() {
        if(this.auth) {
          this.prevRating = this.item.rating;
          this.item.rating = this.prevRating == 3 ? 1 : +this.prevRating + 1;

          this.saveNewRating();
        }
      },

      saveNewRating() {
        http.patch(`${config.api}/change-rating/${this.item.id}`, {rating: this.item.rating}).catch(error => {
          this.item.rating = this.prevRating;
          alert('Error in saveNewRating()');
        });
      },

      addNewItem() {
        if(this.auth) {
          this.rated = true;

          http.post(`${config.api}/add`, {item: this.item}).then(value => {
            this.setItem(value.data);
            this.rated = false;
          }, error => {
            if(error.status == 409) {
              alert(this.item.title + ' already exists!');
            }
          });
        }
      }
    }
  }
</script>