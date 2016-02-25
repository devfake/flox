import React from 'react';
import {Link} from 'react-router';

class Footer extends React.Component {

  render() {
    return (

      <footer className="site-footer">
        <div className="wrap">
          <span className="attribution">
            <a href="https://www.themoviedb.org/" target="_blank"><i className="icon-tmdb"></i></a> This product uses the TMDb API but is not endorsed or certified by TMDb
          </span>
          <a className="icon-github" href="https://github.com/devfake/flox" target="_blank"></a>
          <Link to={config.uri + 'admin'} className="admin-link">Login</Link>
        </div>
      </footer>

    );
  }
}

export default Footer;