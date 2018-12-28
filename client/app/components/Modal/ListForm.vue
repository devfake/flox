<template>
  <div class="modal-wrap">

    <div class="modal-header">
      <span>
        {{ modalData.list ? 'Edit List' : 'New List' }}
      </span>
      <span class="close-modal" @click="CLOSE_MODAL()">
        <i class="icon-close"></i>
      </span>
    </div>

    <div class="modal-content modal-content-loading" v-if="loadingModalData">
      <span class="loader fullsize-loader"><i></i></span>
    </div>

    <div class="modal-content list-modal-content" v-if="!loadingModalData">
      <form class="login-form settings-box element-ui-checkbox" @submit.prevent="saveList()">
        <input type="text" name="name" placeholder="Name" v-model="name">

        <div class="setting-box with-margin">
          <el-checkbox v-model="is_public">Public</el-checkbox>
        </div>

        <input type="submit" :value="lang('save button')">
      </form>
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
        loadingModalData: false,
        name: '',
        is_public: true
      }
    },

    created() {
      const {list} = this.modalData;

      if (list) {
        this.name = list.name;
        this.is_public = list.is_public;
      }
    },

    computed: {
      ...mapState({
        modalData: state => state.modalData,
        //loadingModalData: state => state.loadingModalData,
        seasonActiveModal: state => state.seasonActiveModal
      }),
    },

    methods: {
      ...mapMutations(['SET_SEASON_ACTIVE_MODAL', 'CLOSE_MODAL', 'SET_LOADING_MODAL_DATA', 'SET_MODAL_DATA']),
      ...mapActions(['loadLists']),

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
