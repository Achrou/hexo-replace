'use strict';

var hexo = hexo || {};

var options = {
    options: [
        { name: '-g, --global', desc: 'Document global replace' },
        { name: '-r --rule', desc: 'Search rules' }
    ]
};
hexo.extend.console.register('replace', 'Document replace', options, require('./lib/replace'));