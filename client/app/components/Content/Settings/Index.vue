<template>
  <main>
    <div class="wrap-content">

      <div class="navigation-tab no-select">
        <span :class="{active: activeTab == 'user'}" @click="changeActiveTab('user')">{{ lang('tab user') }}</span>
        <span :class="{active: activeTab == 'options'}" @click="changeActiveTab('options')">{{ lang('tab options') }}</span>
        <span :class="{active: activeTab == 'backup'}" @click="changeActiveTab('backup')">{{ lang('tab backup') }}</span>
        <span :class="{active: activeTab == 'misc'}" @click="changeActiveTab('misc')">{{ lang('tab misc') }}</span>
      </div>

      <span class="loader fullsize-loader" v-if="loading"><i></i></span>

      <user v-if="activeTab == 'user'"></user>
      <options v-if="activeTab == 'options'"></options>
      <backup v-if="activeTab == 'backup'"></backup>
      <misc v-if="activeTab == 'misc'"></misc>

    </div>
  </main>
</template>

<script>
  import User from './User.vue';
  import Options from './Options.vue';
  import Backup from './Backup.vue';
  import Misc from './Misc.vue';

  import { mapState, mapActions } from 'vuex';
  import MiscHelper from '../../../helpers/misc';
  
  export default {
    mixins: [MiscHelper],

    created() {
      this.setPageTitle(this.lang('settings'));
    },

    components: {
      User, Options, Backup, Misc
    },

    data() {
      return {
        activeTab: 'user'
      }
    },

    computed: {
      ...mapState({
        loading: state => state.loading
      })
    },

    methods: {
      ...mapActions([ 'setPageTitle' ]),

      changeActiveTab(tab) {
        this.activeTab = tab;
      }
    }
  }
</script>