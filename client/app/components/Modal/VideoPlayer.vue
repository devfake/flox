<template>
  <div class="modal-wrap modal-wrap-big">

    <div class="modal-header">
      <span>title / dropdown</span>
      <span class="close-modal" @click="CLOSE_MODAL()">
        <i class="icon-close"></i>
      </span>
    </div>

    <div class="modal-content">
      <video width="100%" height="auto" controls>
        <source :src="modalData.src" type="video/mp4">
      </video>
    </div>

  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex';

  import Helper from '../../helper';

  export default {
    mixins: [Helper],

    computed: {
      ...mapState({
        modalData: state => state.modalData
      })
    },

    methods: {
      ...mapMutations([ 'CLOSE_MODAL' ])
    }
  }
</script>
