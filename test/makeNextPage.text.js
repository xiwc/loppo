'use strict';

// const path = require('path');
const test = require('tape');
// const fs = require('fs-extra');
const makeNextPage = require('../lib/utils').makeNextPage;

const log = require('../lib/utils').log;
log.setLevel('error');

const test_title = '[utils.js/makeNextPage] ';

test(
  test_title +
  'root directory and no other content',
  function (t) {
    const opt = {
      dir: 'docs',
      site: 'My Site',
      chapters: []
    };
    const optionObj = makeNextPage('/', opt);
    t.equal(optionObj.next_page, null);
    t.end();
  }
);

test(
  test_title +
  'root directory and the only item is index.md',
  function (t) {
    const opt = {
      dir: 'docs',
      site: 'My Site',
      chapters: [
        { 'index.md': 'Title Index' }
      ]
    };
    const optionObj = makeNextPage('/', opt);
    t.equal(optionObj.next_page, null);
    t.end();
  }
);

test(
  test_title +
  'root directory and chapters.yml\'s first item is not index.md',
  function (t) {
    const opt = {
      dir: 'docs',
      site: 'My Site',
      chapters: [
        { 'a.md': 'Title A' }
      ]
    };
    const optionObj = makeNextPage('/', opt);
    t.deepEqual(optionObj.next_page, { 'a.md': 'Title A' });
    t.end();
  }
);

test(
  test_title +
  'index.md and it is the only item',
  function (t) {
    const opt = {
      dir: 'docs',
      site: 'My Site',
      chapters: [
        { 'index.md': 'Title Index' }
      ]
    };
    const optionObj = makeNextPage('index.md', opt);
    t.equal(optionObj.next_page, null);
    t.end();
  }
);

test(
  test_title +
  'index.md and it is not the only item',
  function (t) {
    const opt = {
      dir: 'docs',
      site: 'My Site',
      chapters: [
        { 'index.md': 'Title Index' },
        { 'a.md': 'Title A' }
      ]
    };
    const optionObj = makeNextPage('index.md', opt);
    t.deepEqual(optionObj.next_page, { 'a.md': 'Title A' });
    t.end();
  }
);

test(
  test_title +
  'regular item and it is the last item',
  function (t) {
    const opt = {
      dir: 'docs',
      site: 'My Site',
      chapters: [
        { 'a.md': 'Title A' },
        { 'b.md': 'Title B' }
      ]
    };
    const optionObj = makeNextPage('a.md', opt);
    t.deepEqual(optionObj.next_page, { 'b.md': 'Title B' });
    t.end();
  }
);

test(
  test_title +
  'regular item and it is not the last item',
  function (t) {
    const opt = {
      dir: 'docs',
      site: 'My Site',
      chapters: [
        { 'a.md': 'Title A' },
        { 'b.md': 'Title B' }
      ]
    };
    const optionObj = makeNextPage('b.md', opt);
    t.deepEqual(optionObj.next_page, null);
    t.end();
  }
);
