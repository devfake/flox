import * as type from './types';

export default {
  [type.SET_SEARCH_TITLE](state, title) {
    state.searchTitle = title;
  },

  [type.SET_USER_FILTER](state, filter) {
    state.userFilter = filter;
  },

  [type.SET_ITEMS](state, items) {
    state.items = items;
  },

  [type.PUSH_TO_ITEMS](state, items) {
    state.items.push(...items);
  },

  [type.SET_LOADING](state, loading) {
    state.loading = loading;
  },

  [type.SET_PAGINATOR](state, data) {
    state.paginator = data;
  },

  [type.SET_CLICKED_LOADING](state, loading) {
    state.clickedMoreLoading = loading;
  },

  [type.SET_COLOR_SCHEME](state, color) {
    state.colorScheme = color;
  }
}