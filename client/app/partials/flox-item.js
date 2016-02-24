import React from 'react';
import Api from '../api';
import Rating from 'react-rating';

class FloxItem extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      removed: false
    }
  }

  render() {
    let title = this.props.data.title;

    return (

      <div className={'item ' + this.props.loadClass + (this.props.isActive ? ' active' : '')} onClick={this.props.isActive ? null : this.changeActiveKey.bind(this)}>
        <div className="item-hidden-content">
          <span className="item-date">{this.props.released().year}</span>
          <span className="item-title">{title}</span>

          <div className="icons-rating">
            <Rating empty='fa fa-star-o fa-2x' full='fa fa-star fa-2x' fractions={2} onRate={this.onHoverRate.bind(this)} />
          </div>

          <i className="icon-close-small" onClick={this.closeHiddenContent.bind(this)}></i>
          <a href={"https://www.youtube.com/results?search_query=" + title + " Trailer"} target="_blank" className="trailer-btn">Watch Trailer</a>
          <span className={'remove-btn' + (this.state.removed ? ' reset' : '')} onClick={this.handleItemRemove.bind(this)}>{this.state.removed ? "Bring it back" : "Remove from list"}</span>
        </div>
        <div className="item-image">
          {this.props.image ? <img src={this.props.image} /> : <i className="icon-no-image"></i>}
          <div className={"rating rating-" + this.formatRating()}></div>
        </div>

        <div className="item-content">
          <span className="item-title" title={title}>{title}</span>
          <span className="item-rating">{this.props.data.rating + "/5 Rating"}</span>
        </div>
      </div>

    );
  }

  formatRating() {
    let rating = this.props.data.rating;

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
      alert("Error");
    });
  }

  onHoverRate(value) {
    console.log(value);
  }
}

export default FloxItem;