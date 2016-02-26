import React from 'react';
import {Router, Link} from 'react-router';
import Modal from './modal';
import Api from '../api';

class Header extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      type: '',
      categories: []
    };

    this.loadCategories();
  }

  render() {
    let navigation = this.state.categories.map((value) => {
      // All is hardcodet
      if(value.slug == 'all') return;

      return <li key={value.id}><Link to={config.uri + value.slug} activeClassName="active">{value.name}</Link></li>
    });

    return (

      <div>
        {this.state.showModal ? <Modal type={this.state.type} closeModal={this.changeModal.bind(this)} /> : ''}

        <header className="site-header no-select">
          <div className="wrap">

            <Link to={config.uri} className="logo">
              <img src={config.uri + 'assets/img/logo.png'} width="80" height="24" alt="Flox" />
            </Link>

            {this.props.logged ?
              <div className="admin-nav-wrap">
                <div className="add-wrap" title="Search in TMDB" onClick={this.changeModal.bind(this, 'tmdb')}>
                  <i className="icon-add" />
                </div>
                <Link className="admin-nav-btn" to={config.uri + 'admin'}>Admin</Link>
              </div> : ''}

              <nav className="site-nav">
                <ul>
                  <li><Link to={config.uri + 'all'} activeClassName="active">All</Link></li>

                  {navigation}

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

  loadCategories() {
    Api.categories().done((value) => {
      this.setState({
        categories: value
      });
    });
  }
}

export default Header;
