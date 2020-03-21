'use strict';

var hexo = hexo || {};

var options = {
    usage: '<source> <replace>',
    arguments: [
      {name: 'source', desc: 'Original string'},
      {name: 'replace', desc: 'New string'}
    ],
    options: [
        { name: '-g, --global', desc: 'Global match string' },
        { name: '-r, --rule', desc: 'You can use a regular expression, a function or an Express-style pattern string.' }
    ]
};
hexo.extend.console.register('replace', 'Text substitution tool', options, require('./lib/replace'));