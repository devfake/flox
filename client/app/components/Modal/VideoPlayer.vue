<template>
  <div class="modal-wrap modal-wrap-big">

    <div class="modal-header">
      <span v-if="modalData.mediaType == 'tv'">
        <input type="text" v-model="episodeId" placeholder="ID der Episode">
        <button @click="fetchEpisode()">Fetch</button>
      </span>
      <span class="close-modal" @click="CLOSE_MODAL()">
        <i class="icon-close"></i>
      </span>
    </div>

    <div class="modal-content">
      <video width="100%" height="100%" controls id="video">
        <source :src="videoSrc" type="video/mp4">
      </video>
    </div>

  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex';

  import Helper from '../../helper';

  export default {
    mixins: [Helper],

    data() {
      return {
        episodeId: null
      }
    },

    computed: {
      ...mapState({
        modalData: state => state.modalData
      }),

      videoSrc() {
        return `${config.api}/video/${this.modalData.mediaType}/${this.modalData.id}`;
      }
    },

    methods: {
      ...mapMutations([ 'CLOSE_MODAL' ]),

      fetchEpisode() {
        const video = document.getElementById('video');

        this.modalData.mediaType = 'tv';
        this.modalData.id = this.episodeId;

        video.load();
        video.play();
      }
    }
  }
</script>
