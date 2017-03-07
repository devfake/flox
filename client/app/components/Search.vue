<template>
  <section class="search-wrap" :class="{sticky: sticky, active: displayHeader}">
    <div class="wrap">

      <form class="search-form" @submit.prevent="search()">
        <router-link to="/"><i @click="scrollToTop()" class="icon-logo-small"></i></router-link>
        <i class="icon-search"></i>
        <input type="text" :placeholder="placeholder" v-model="title" class="search-input" autofocus>
      </form>
    </div>

    <div class="suggestions-for" v-if="suggestionsFor">
      <div class="wrap">
        {{ lang('suggestions for') }} <router-link :to="{ name: `subpage-${$route.query.type}`, params: { tmdbId: $route.query.for, slug: $route.query.slug }}">{{ suggestionsFor }}</router-link>
      </div>
    </div>
  </section>
</template>

<script>
  import Helper from '../helper';
  import { mapState } from 'vuex'

  export default {
    mixins: [Helper],

    mounted() {
      this.initSticky();
    },

    data() {
      return {
        sticky: false
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
        //return config.auth ? 'Search or add movie' : 'Search movie';
        return config.auth ? this.lang('search or add') : this.lang('search');
      }
    },

    methods: {
      initSticky() {
        const height = document.querySelector('header').scrollHeight;

        window.onscroll = () => {
          this.sticky = document.body.scrollTop + document.documentElement.scrollTop > height;
        };
      },

      search() {
        if(this.title != '') {
          this.$router.push({
            path: '/search?q=' + this.title
          });
        }
      }
    }
  }
</script>