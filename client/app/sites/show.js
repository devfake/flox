import React from 'react';
import Api from '../api';

// Todo: Make it work!
class Show extends React.Component {

  state = {
    item: {}
  }

  constructor(props) {
    super(props);
    this.loadItem();
  }

  render() {
    let style = {
      backgroundImage:
        this.state.item.poster == 'null' || typeof this.state.item.poster === 'undefined' ? '' : 'url(' + config.posterBig + this.state.item.poster + ')'
    }

    return (

      <div className="wrap">
        <div className="show-item-wrap">

          <div className="image-wrap">
            <div className="item-image item-image-big" style={style}>
              {style.backgroundImage ? '' : <i className="icon-no-image"></i>}
              <div className={'rating rating-' + this.state.item.rating}></div>
            </div>
          </div>

          <div className="show-content">
            <h2>{this.state.item.title}</h2>
          </div>

        </div>
      </div>

    );
  }

  loadItem() {
    Api.searchItemBySlug(this.props.params.item).then((value) => {
      Api.searchTMDBByID(value.tmdb_id);
    });
  }
}

export default Show;
