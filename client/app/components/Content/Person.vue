<template>
  <transition mode="out-in" name="fade">
    <li class="cast-item">
      <img
        :src="image"
        width="140"
        height="200"
      />
      <div class="cast-info">
          <div class="cast-name">{{ item.person.name }}</div>
          <div class="cast-character">{{ personTitle }}</div>
      </div>
    </li>
  </transition>
</template>

<script>
  export default {
    props: ['item'],

    data() {
      return {
        localItem: this.item,
        profilePath: this.item.person.profile_path
      }
    },

    computed: {
      personTitle() {
        return this.localItem.character || this.localItem.job;
      },

      image() {
        return this.profilePath ?
            this.poster : this.noImage;
      },

      poster() {
        return config.posterTMDB + this.profilePath;
      },

      noImage() {
        return config.url + '/assets/img/no-image.png';
      }
    }
  }
</script>
