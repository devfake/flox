import React from 'react';
import Api from '../api';
import Item from './item';

class Modal extends React.Component {

  state = {
    items: [],
    searching: false,
    searched: false,
    loadClass: 'loading'
  }

  componentDidMount() {
    // Avoid 'jerk' if overflow from body is hidden.
    setTimeout(() => {
      $('body').addClass('modal-active');
    }, 200);

    React.findDOMNode(this.refs.input).focus();

    setTimeout(() => {
      this.setState({
        loadClass: ''
      });
    }, 20);
  }

  componentWillUnmount() {
    $('body').removeClass('modal-active');
  }

  render() {
    let content = '';
    let items = this.state.items.map((value, key) => {
      return <Item key={key} data={value} category="" tmdb={this.props.type === 'flox' ? '' : 'true'} />
    });

    if( ! this.state.items.length && this.state.searched) {
      content = <div className="no-items-found">No items found :(</div>
    } else if(this.state.searching) {
      content = <i className="icon-content-load"></i>
    } else if(this.state.items.length && ! this.state.searching) {
      content = items;
    }

    return (

      <section className={'modal-wrap ' + this.state.loadClass}>
        <div className="search-items">
          <div className="wrap">
            <div className="icon-close-wrap" onClick={this.props.closeModal}><i className="icon-close"></i></div>
            <div className="search-wrap">
              <label className="modal-label" htmlFor="search">{this.props.type === 'flox' ? 'Search' : 'Add'}</label>
              <input type="text" className="modal-input" id="search" placeholder="Title..." ref="input" onKeyDown={this.searchKeyEvents.bind(this)} />
            </div>
            <div>

              {content}

            </div>
          </div>
        </div>
      </section>

    );
  }

  searchKeyEvents(event) {
    if(event.key === 'Enter') {
      this.setState({
        searching: true,
        searched: false
      });

      Api.search(this.props.type, event.target.value).then((value) => {
        setTimeout(() => {
          this.setState({
            searching: false,
            searched: true,
            items: value
          });
        }, 200);
      });
    } else if(event.key === 'Escape') {
      this.props.closeModal();
    }
  }
}

export default Modal;