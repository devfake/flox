import React from 'react';

class FloxItem extends React.Component {

  render() {
    let title = this.props.data.title;

    return (

      <div className={'item ' + this.props.loadClass}>
        <a href={"https://www.youtube.com/results?search_query=" + title + " Trailer"} target="_blank" className="item-image">
          {this.props.image ? <img src={this.props.image} /> : <i className="icon-no-image"></i>}
          <div className={"rating rating-" + this.formatRating()}></div>
        </a>

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
}

export default FloxItem;