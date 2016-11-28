import Vue from 'vue';
import Router from 'vue-router';

import config from './config';

import Content from './components/Content/Content.vue';
import SearchContent from './components/Content/SearchContent.vue';
import Settings from './components/Content/Settings.vue';
import TMDBContent from './components/Content/TMDBContent.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: config.uri,
  routes: [
    { path: '/', component: Content, name: 'home' },
    { path: '/movies', component: Content, name: 'movie' },
    { path: '/tv', component: Content, name: 'tv' },
    { path: '/search', component: SearchContent, name: 'search' },
    { path: '/settings', component: Settings, name: 'settings' },
    { path: '/suggestions', component: TMDBContent, name: 'suggestions' },
    { path: '/trending', component: TMDBContent, name: 'trending' },
    { path: '/upcoming', component: TMDBContent, name: 'upcoming' },
    { path: '*', component: Content }
  ]
});