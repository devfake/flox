import React from 'react';

class FloxItem extends React.Component {

  render() {
    let title = this.props.data.title;

    return (

      <div className={'item ' + this.props.loadClass + (this.props.isActive ? ' active' : '')} onClick={this.props.isActive ? null : this.changeActiveKey.bind(this)}>
        <div className="item-hidden-content">
          <span className="item-title">{title}</span>
          <i className="icon-close-small" onClick={this.closeHiddenContent.bind(this)}></i>
          <a href={"https://www.youtube.com/results?search_query=" + title + " Trailer"} target="_blank" className="trailer-btn">Watch Trailer</a>
        </div>
        <div className="item-image">
          {this.props.image ? <img src={this.props.image} /> : <i className="icon-no-image"></i>}
          <div className={"rating rating-" + this.formatRating()}></div>
        </div>

        <div className="item-content">
          <span className="item-title" title={title}>{title}</span>
          <span className="item-rating">{this.props.data.rating + "/5 Points"}</span>
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
}

export default FloxItem;