import React from 'react';
import Api from '../api';
import Rating from 'react-rating';

class FloxItem extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      removed: false,
      ratingColor: this.formatRating(),
      rating: this.props.data.rating
    }
  }

  render() {
    let title = this.props.data.title;

    return (

      <div className={'item ' + this.props.loadClass + (this.props.isActive ? ' active' : '')}>
        <div className="item-hidden-content">
          <span className="item-date">{this.props.released().year}</span>
          <span className="item-title">{title}</span>

          {this.props.logged ? <div className="icons-rating">
            <Rating empty='fa fa-star-o fa-2x' full='fa fa-star fa-2x' fractions={2} initialRate={+this.state.rating} onRate={this.onHoverRate.bind(this)} onChange={this.onChangeRate.bind(this)} />
          </div> : ''}

          <i className="icon-close-small" onClick={this.closeHiddenContent.bind(this)}></i>
          <a href={"https://www.youtube.com/results?search_query=" + title + " Trailer"} target="_blank" className="trailer-btn">Watch Trailer</a>
          {this.props.logged ? <span className={'remove-btn' + (this.state.removed ? ' reset' : '')} onClick={this.handleItemRemove.bind(this)}>{this.state.removed ? "Bring it back" : "Remove from list"}</span> : ''}
        </div>
        <div className="item-image" onClick={this.props.isActive ? null : this.changeActiveKey.bind(this)}>
          {this.props.image ? <img src={this.props.image} /> : <i className="icon-no-image"></i>}
          <div className={"rating rating-" + this.state.ratingColor}></div>
        </div>

        <div className="item-content">
          <span className="item-title" title={title}>{title}</span>
          <span className="item-rating">{this.state.rating + "/5 Rating"}</span>
        </div>
      </div>

    );
  }

  formatRating(rating = this.props.data.rating) {
    return rating.replace('.', '-');
  }

  changeActiveKey() {
    this.props.changeActiveKey(this.props.id);
  }

  closeHiddenContent() {
    this.props.changeActiveKey(null);
  }

  handleItemRemove() {
    Api.handleItemRemove(this.props.id).done((value) => {
      this.setState({
        removed: ! this.state.removed
      })
    }).fail((value) => {
      if(value.status === 401) {
        alert('Unauthorized');
      } else {
        alert('Server Error');
      }
    });
  }

  onHoverRate(value) {
    this.setState({
      ratingColor: value ? this.formatRating(value.toString()) : this.formatRating(this.state.rating.toString())
    });
  }

  onChangeRate(rating) {
    Api.updateRating(this.props.id, rating).done((value) => {
      rating = rating.toString();

      this.setState({
        rating,
        ratingColor: this.formatRating(rating)
      });
    }).fail((value) => {
      if(value.status === 401) {
        alert('Unauthorized');
      } else {
        alert('Server Error');
      }
    });
  }
}

export default FloxItem;