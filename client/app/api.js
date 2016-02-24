import React from 'react';

class Api extends React.Component {

  static categories() {
    return $.get(config.api + 'all-categories');
  }

  static items(type, category, filterBy) {
    return $.get(config.api + type + '-items/' + category + '/' + filterBy);
  }

  static categoryItems(category) {
    return $.get(config.api + 'category-items/' + category + '/' + this.usersFilterFor(category) + '/' + config.loadingItems);
  }

  static moreCategoryItems(category, currentLoaded) {
    return $.get(config.api + 'more-category-items/' + category.id + '/' + this.usersFilterFor(category.slug) + '/' + config.loadingItems + '/' + currentLoaded);
  }

  static usersFilterFor(category) {
    if( ! localStorage.getItem('category-' + category)) {
      localStorage.setItem('category-' + category, 'seen');
    }

    return localStorage.getItem('category-' + category);
  }

  static changeUsersFilterFor(category, type) {
    localStorage.setItem('category-' + category, type);
  }

  static search(type, value) {
    return $.get(config.api + 'search/' + type + '/' + value);
  }

  static addItem(data) {
    return $.post(config.api + 'new', {data, _token: $('meta[name="csrf_token"]').attr('content')});
  }

  static handleItemRemove(id) {
    return $.post(config.api + 'handle-item-remove/' + id, {_token: $('meta[name="csrf_token"]').attr('content')});
  }

  /*static searchTMDBByID(id) {
    return $.get(config.api + 'search/tmdb/id/' + id);
  }

  static searchItemBySlug(slug) {
    return $.get(config.api + 'item/' + slug)
  }*/
}

export default Api;
