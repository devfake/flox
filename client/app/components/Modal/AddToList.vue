<template>
  <div class="modal-wrap">

    <div class="modal-header">
      <span>
        Add To List
      </span>
      <span class="close-modal" @click="CLOSE_MODAL()">
        <i class="icon-close"></i>
      </span>
    </div>

    <div class="modal-content modal-content-loading" v-if="loadingModalData">
      <span class="loader fullsize-loader"><i></i></span>
    </div>

    <div class="item-header no-select" v-if=" ! loadingModalData">
      <span class="header-seen" v-if="auth">New List</span>
    </div>
    
    <div class="modal-content" v-if="!loadingModalData">
      <div class="modal-item" key="watchlist">
        <span class="modal-name">Watchlist</span>
        <span class="episode-seen" :class="{seen: true}"><i></i></span>
      </div>
      
      <div class="modal-item" v-for="list in lists.lists" :key="list.id">
        <span class="modal-name">{{ list.name }}</span>
        <span class="modal-release-episode" v-if="!list.is_public">Privat</span>
        <span class="episode-seen" :class="{seen: true}"><i></i></span>
      </div>
    </div>

  </div>
</template>

<script>
  import {mapState, mapMutations, mapActions} from 'vuex';
  import http from 'axios';

  import MiscHelper from '../../helpers/misc';
  import ItemHelper from '../../helpers/item';

  export default {
    mixins: [MiscHelper, ItemHelper],

    data() {
      return {
        auth: config.auth,
      }
    },

    created() {
      this.loadListsForItem(this.modalData.tmdb_id);
    },

    computed: {
      ...mapState({
        modalData: state => state.modalData,
        lists: state => state.lists,
        loadingModalData: state => state.loadingModalData,
      }),
    },

    methods: {
      ...mapMutations(['CLOSE_MODAL']),
      ...mapActions(['loadListsForItem']),

      saveList() {
        if (this.name) {
          const name = this.name;
          const is_public = this.is_public;
          const list = this.modalData.list;

          if (!list) {
            http.post(`${config.api}/list`, {name, is_public})
              .then(() => {
                this.CLOSE_MODAL();
                this.loadLists();
              })
          } else {
            http.put(`${config.api}/list/${list.id}`, {name, is_public})
              .then(() => {
                this.CLOSE_MODAL();
                this.loadLists();
              })
          }
        }
      }
    }
  }
</script>
