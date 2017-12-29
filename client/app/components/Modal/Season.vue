<template>
  <div class="modal-wrap">

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
      <span class="season-number no-select" @click="SET_SEASON_ACTIVE_MODAL(index)" v-for="(season, index) in episodes" :class="{active: index == seasonActiveModal, completed: seasonCompleted(index)}">
        S{{ addZero(index) }}
      </span>
    </div>

    <div class="item-header no-select" v-if=" ! loadingModalData">
      <span class="header-episode">#</span>
      <span class="header-name">Name</span>
      <span class="header-seen" @click="toggleAll()" v-if="auth">Toggle all</span>
    </div>

    <div class="modal-content" v-if=" ! loadingModalData">
      <div @click="toggleEpisode(episode)"
           class="modal-item" v-for="(episode, index) in episodes[seasonActiveModal]"
           :data-episode="episode.episode_number"
      >
        <span class="modal-episode no-select">E{{ addZero(episode.episode_number) }}</span>
        <span class="modal-name" :class="{'spoiler-protect': spoiler && ! episode.seen}">{{ episode.name }}</span>
        <i class="item-has-src" v-if="episode.src"></i>
        <span class="modal-release-episode" v-if="episode.release_episode_human_format" :title="released(episode.release_episode)"><i></i> {{ episode.release_episode_human_format }}</span>
        <span class="modal-release-episode" v-if=" ! episode.release_episode"><i></i> {{ lang('no release') }}</span>
        <span class="episode-seen" :class="{seen: episode.seen}"><i></i></span>
      </div>
    </div>

  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex';
  import http from 'axios';

  import MiscHelper from '../../helpers/misc';
  import ItemHelper from '../../helpers/item';

  export default {
    mixins: [MiscHelper, ItemHelper],

    data() {
      return {
        auth: config.auth
      }
    },

    computed: {
      ...mapState({
        modalData: state => state.modalData,
        loadingModalData: state => state.loadingModalData,
        seasonActiveModal: state => state.seasonActiveModal
      }),

      episodes() {
        return this.modalData.episodes;
      },

      spoiler() {
        return this.modalData.spoiler;
      }
    },

    methods: {
      ...mapMutations([ 'SET_SEASON_ACTIVE_MODAL', 'CLOSE_MODAL', 'SET_LOADING_MODAL_DATA', 'SET_MODAL_DATA' ]),

      released(date) {
        const released = new Date(date * 1000);

        return this.formatLocaleDate(released);
      },

      toggleAll() {
        const season = this.seasonActiveModal;
        const tmdb_id = this.modalData.episodes[1][0].tmdb_id;
        const seen = this.seasonCompleted(season);

        this.markAllEpisodes(season, seen);

        http.patch(`${config.api}/toggle-season`, {
          tmdb_id,
          season,
          seen: ! seen
        });
      },

      markAllEpisodes(season, seen) {
        const episodes = this.episodes[season];

        for(let episode of episodes) {
          episode.seen = ! seen;
        }
      },

      toggleEpisode(episode) {
        if(this.auth) {
          episode.seen = ! episode.seen;

          http.patch(`${config.api}/toggle-episode/${episode.id}`).catch(error => {
            episode.seen = ! episode.seen;
          });
        }
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
    }
  }
</script>
