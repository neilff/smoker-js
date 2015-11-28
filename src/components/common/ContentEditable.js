import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

class ContentEditable extends Component {
  static propTypes = {
    html: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  _emitChange(evt) {
    const html = findDOMNode(this).innerHTML;

    if (this.props.onChange && html !== this.prevHtml) {
      evt.target = { value: html };
      this.props.onChange(html);
    }

    this.prevHtml = html;
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.html !== findDOMNode(this).innerHTML;
  }

  componentDidUpdate() {
    const { html } = this.props;

    if (html !== findDOMNode(this).innerHTML) {
      findDOMNode(this).innerHTML = html;
    }
  }

  render() {
    const { html } = this.props;

    return (
      <div
        { ...this.props }
        onInput={ this._emitChange.bind(this) }
        onBlur={ this._emitChange.bind(this) }
        contentEditable="true"
        dangerouslySetInnerHTML={{ __html: html }}>
      </div>
    );
  }
}

export default ContentEditable;
