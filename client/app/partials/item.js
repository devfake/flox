import React from 'react';
import Api from '../api';
import FloxItem from './flox-item';
import TMDBItem from './tmdb-item';

class Item extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loadClass: 'loading'
    };
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
    let image = this.props.data.poster === 'null' || this.props.data.poster === null || typeof this.props.data.poster === 'undefined'
      ? ''
      : config.posterSmall + this.props.data.poster;

    return (

      this.props.tmdb
        ? <TMDBItem data={this.props.data} loadClass={this.state.loadClass} id={this.props.id} isActive={this.props.id == this.props.activeKey} changeActiveKey={this.props.changeActiveKey} image={image} released={this.released.bind(this)} />
        : <FloxItem data={this.props.data} loadClass={this.state.loadClass} id={this.props.id} isActive={this.props.id == this.props.activeKey} changeActiveKey={this.props.changeActiveKey} image={image} released={this.released.bind(this)} />

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