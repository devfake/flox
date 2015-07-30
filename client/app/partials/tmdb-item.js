import React from 'react';
import Api from '../api';

class TMDBItem extends React.Component {

  render() {
    return (

      <div className={'item ' + this.props.loadClass}>
        <div className="item-image" style={this.props.bgStyle} onClick={this.addNewItem.bind(this)}>
          {this.props.bgStyle.backgroundImage ? '' : <i className="icon-no-image"></i>}
        </div>

        <div className="item-content">
          <span className="item-date" title={"Released on " + this.props.released().full}>{this.props.released().year}</span>
          <div className="item-title" onClick={this.addNewItem.bind(this)} title={this.props.data.title}>{this.props.data.title}</div>
        </div>
      </div>

    );
  }

  addNewItem() {
    Api.addItem(this.props.data).then((value) => {
      location.reload();
    });
  }
}

export default TMDBItem;