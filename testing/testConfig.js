require('babel-register')();

import { expect } from 'chai';
import sinon from 'sinon';
import { jsdom } from 'jsdom';
import MockLocalStorage from 'mock-localstorage';

// Export expect and sinon so we don't have to keep requiring them
// Place any additional boilerplate here, and expose it on `global`
global.expect = expect;
global.sinon = sinon;

const mockStorage = new MockLocalStorage();
const exposedProperties = ['window', 'navigator', 'document'];

global.localStorage = mockStorage;
global.document = jsdom('');
global.window = document.defaultView;

Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};
