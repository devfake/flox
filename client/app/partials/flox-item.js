import React from 'react';

class FloxItem extends React.Component {

  render() {
    let title = this.props.data.title;

    return (

      <div className={'item ' + this.props.loadClass}>
        <a href={"https://www.youtube.com/results?search_query=" + title + " Trailer"} target="_blank" className="item-image" style={this.props.bgStyle}>
          {this.props.bgStyle.backgroundImage ? '' : <i className="icon-no-image"></i>}
          <div className={"rating rating-" + this.formatRating()} title={this.props.data.rating + " / 5 Points"}></div>
        </a>

        <div className="item-content">
          <span className="item-date" title={"Released on " + this.props.released().full}>{this.props.released().year}</span>
          <a href={"https://www.youtube.com/results?search_query=" + title + " Trailer"} target="_blank" className="item-title" title={title}>{title}</a>
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