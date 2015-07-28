import React from 'react';
import Router from 'react-router';
import Api from '../api';
import FloxItem from './flox-item';
import TMDBItem from './tmdb-item';

let Link = Router.Link;

class Item extends React.Component {

  state = {
    loadClass: 'loading'
  }

  componentDidMount() {
    // todo: Move to React animation.
    setTimeout(() => {
      this.setState({
        loadClass: ''
      });
    }, 20);
  }

  render() {
    let style = {
      backgroundImage:
        this.props.data.poster === 'null' || this.props.data.poster === null || typeof this.props.data.poster === 'undefined'
          ? ''
          : 'url(' + config.posterSmall + this.props.data.poster + ')'
    }

    return (

      this.props.tmdb
        ? <TMDBItem data={this.props.data} loadClass={this.state.loadClass} bgStyle={style} released={this.released.bind(this)} />
        : <FloxItem data={this.props.data} loadClass={this.state.loadClass} bgStyle={style} released={this.released.bind(this)} />

    )
  }

  released() {
    let released = new Date(this.props.data.released * 1000);
    let language = navigator.language || navigator.userLanguage;

    return {
      year: released.getFullYear(),
      full: released.toLocaleDateString(language, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
  }
}

export default Item;