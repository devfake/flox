import React from 'react';
import {Router, Link} from 'react-router';
import Modal from './modal';

class Header extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      type: ''
    };
  }

  render() {
    return (

      <div>
        {this.state.showModal ? <Modal type={this.state.type} closeModal={this.changeModal.bind(this)} /> : ''}

        <header className="site-header">
          <div className="wrap">
            <Link to={config.uri} className="logo"><img src={config.uri + 'assets/img/logo.png'} width="80" height="24" alt="Flox" /></Link>

              <div className="add-wrap" title="Search in TMDB" onClick={this.changeModal.bind(this, 'tmdb')}>
                <i className="icon-add"></i>
              </div>

              <nav className="site-nav">
                <ul>
                  <li><Link to={config.uri}>All</Link></li>
                  <li><Link to={config.uri + 'movies'} activeClassName="active">Movies</Link></li>
                  <li><Link to={config.uri + 'series'} activeClassName="active">Series</Link></li>
                  <li><Link to={config.uri + 'animes'} activeClassName="active">Animes</Link></li>
                  <li className="icon-search-wrap" onClick={this.changeModal.bind(this, 'flox')} title="Search in Flox">
                    <i className="icon-search"></i>
                  </li>
                </ul>
              </nav>
            </div>
          </header>
      </div>

    );
  }

  changeModal(type = '') {
    this.setState({
      showModal: ! this.state.showModal,
      type: type
    })
  }
}

export default Header;
