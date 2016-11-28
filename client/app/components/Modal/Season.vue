<template>
  <div class="modal-wrap" v-if="modalType == 'season'">

    <div class="modal-header">
      <span>{{ modalData.title }}</span>
      <span class="close-modal" @click="CLOSE_MODAL()">
        <i class="icon-close"></i>
      </span>
    </div>

    <div class="modal-content modal-content-loading" v-if="loadingModalData">
      <span class="loader fullsize-loader"><i></i></span>
    </div>

    <div class="season-tabs" v-if=" ! loadingModalData">
      <span class="season-number" @click="SET_SEASON_ACTIVE_MODAL(index)" v-for="(season, index) in episodes" :class="{active: index == seasonActiveModal, completed: seasonCompleted(index)}">
        S{{ addZero(index) }}
      </span>
    </div>

    <div class="modal-content" v-if=" ! loadingModalData">
      <div @click="setSeen(episode)" class="modal-item" v-for="(episode, index) in episodes[seasonActiveModal]">
        <span class="modal-episode no-select">E{{ addZero(episode.episode_number) }}</span>
        <span class="modal-name">{{ episode.name }}</span>
        <span class="episode-seen" :class="{seen: episode.seen}"><i></i></span>
      </div>
    </div>

  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex';
  import http from 'axios';

  import Helper from '../../helper';

  export default {
    mixins: [Helper],

    methods: {
      ...mapMutations([ 'SET_SEASON_ACTIVE_MODAL', 'CLOSE_MODAL' ]),

      setSeen(episode) {
        episode.seen = ! episode.seen;
        http.patch(`${config.api}/set-seen/${episode.id}`).catch(error => {
          episode.seen = ! episode.seen;
        });
      },

      seasonCompleted(index) {
        const episodes = this.episodes[index];

        for(let episode of episodes) {
          if( ! episode.seen) {
            return false;
          }
        }

        return true;
      }
    },

    computed: {
      ...mapState({
        modalType: state => state.modalType,
        modalData: state => state.modalData,
        loadingModalData: state => state.loadingModalData,
        seasonActiveModal: state => state.seasonActiveModal
      }),

      episodes() {
        return this.modalData.episodes;
      }
    }
  }
</script>
