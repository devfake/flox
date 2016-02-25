import React from 'react';
import Api from '../api';

class TMDBItem extends React.Component {

  render() {
    return (

      <div className={'item ' + this.props.loadClass}>
        <div className="item-image" style={this.props.bgStyle} onClick={this.addNewItem.bind(this)}>
          {this.props.image ? <img src={this.props.image} /> : <i className="icon-no-image" />}
        </div>

        <div className="item-content">
          <div className="item-title" onClick={this.addNewItem.bind(this)} title={this.props.data.title}>{this.props.data.title}</div>
          <span className="item-date" title={"Released on " + this.props.released().full}>{this.props.released().year}</span>
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