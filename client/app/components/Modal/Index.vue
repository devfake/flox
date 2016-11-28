<template>
  <div class="all-modals">
    <transition mode="out-in" name="fade">
      <season></season>
    </transition>
    <span class="overlay" v-if="overlay" @click="CLOSE_MODAL()"></span>
  </div>
</template>

<script>
  import Season from './Season.vue';

  import { mapState, mapMutations } from 'vuex';

  export default {
    computed: {
      ...mapState({
        overlay: state => state.overlay
      })
    },

    methods: {
      ...mapMutations([ 'CLOSE_MODAL' ])
    },

    components: {
      Season
    }
  }
</script>