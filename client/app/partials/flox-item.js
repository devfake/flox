import React from 'react';

class FloxItem extends React.Component {

  render() {
    return (

      <div className={'item ' + this.props.loadClass}>

        <div className="icon-edit-wrap">
          <i className="icon-edit"></i>
        </div>

        <a href={"https://www.youtube.com/results?search_query=" + this.props.data.title + " Trailer"} target="_blank" className="item-image" style={this.props.bgStyle}>
          {this.props.bgStyle.backgroundImage ? '' : <i className="icon-no-image"></i>}
          <div className={"rating rating-" + this.props.data.rating}></div>
        </a>

        <div className="item-content">
          <span className="item-date" title={"Released on " + this.props.released().full}>{this.props.released().year}</span>
          <a href={"https://www.youtube.com/results?search_query=" + this.props.data.title + " Trailer"} target="_blank" className="item-title" title={this.props.data.title}>{this.props.data.title}</a>
        </div>
      </div>

    );
  }
}

export default FloxItem;