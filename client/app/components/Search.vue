<template>
  <section class="search-wrap" v-show=" ! hideSearch">
    <div class="wrap">

      <form class="search-form" @submit.prevent="search()">
        <i class="icon-search"></i>
        <input type="text" :placeholder="placeholder" v-model="title" class="search-input" autofocus>
      </form>
    </div>

    <div class="suggestions-for" v-if="suggestionsFor">
      <div class="wrap">
        {{ lang('suggestions for') }} <router-link :to="{ name: `subpage-${$route.query.type}`, params: { tmdbId: $route.query.for, slug: $route.query.name }}">{{ suggestionsFor }}</router-link>
      </div>
    </div>
  </section>
</template>

<script>
  import MiscHelper from '../helpers/misc';
  import { mapState } from 'vuex'

  export default {
    mixins: [MiscHelper],
    
    data() {
      return {
        hideSearch: false
      }
    },
    
    created() {
      this.disableSearch();
    },

    watch: {
      $route() {
        this.disableSearch();
      }
    },
    
    computed: {
      ...mapState({
        itemLoadedSubpage: state => state.itemLoadedSubpage
      }),

      suggestionsFor() {
        return this.$route.query.name;
      },

      title: {
        get() {
          return this.$store.state.searchTitle;
        },
        set(title) {
          this.$store.commit('SET_SEARCH_TITLE', title);
        }
      },

      placeholder() {
        return config.auth ? this.lang('search or add') : this.lang('search');
      }
    },

    methods: {
      search() {
        if(this.title !== '') {
          this.$router.push({
            path: '/search?q=' + this.title
          });
        }
      },

      disableSearch() {
        this.hideSearch = this.$route.name === 'calendar';
      }
    }
  }
</script>
