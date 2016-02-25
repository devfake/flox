import React from 'react';
import Api from '../api';
import HiddenContent from './hidden-content';

class FloxItem extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      ratingColor: this.formatRating(),
      rating: this.props.data.rating
    }
  }

  render() {
    let title = this.props.data.title;

    return (

      <div className={'item ' + this.props.loadClass + (this.props.isActive ? ' active' : '')}>

        <HiddenContent
          released={this.props.released}
          title={title}
          logged={this.props.logged}
          rating={this.state.rating}
          onHoverRate={this.onHoverRate.bind(this)}
          onChangeRate={this.onChangeRate.bind(this)}
          id={this.props.id}
          changeActiveKey={this.props.changeActiveKey}
        />

        <div className="item-image" onClick={this.props.isActive ? null : this.changeActiveKey.bind(this)}>
          {this.props.image ? <img src={this.props.image} /> : <i className="icon-no-image" />}
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