import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';

class ContentEditable extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.html !== findDOMNode(this).innerHTML;
  }

  componentDidUpdate() {
    const { html } = this.props;

    if (html !== findDOMNode(this).innerHTML) {
      findDOMNode(this).innerHTML = html;
    }
  }

  emitChange(evt) {
    var html = findDOMNode(this).innerHTML;

    if (this.props.onChange && html !== this.prevHtml) {
      evt.target = { value: html };
      this.props.onChange(html);
    }

    this.prevHtml = html;
  }

  render() {
    const { html } = this.props;

    return (
      <div
        { ...this.props }
        onInput={ this.emitChange.bind(this) }
        onBlur={ this.emitChange.bind(this) }
        contentEditable="true"
        dangerouslySetInnerHTML={{ __html: html }}>
      </div>
    );
  }
}

export default ContentEditable;
