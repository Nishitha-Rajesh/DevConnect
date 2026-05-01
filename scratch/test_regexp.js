const { pathToRegexp } = require('path-to-regexp');

try {
    const regexp = pathToRegexp('/a{b}c');
    console.log('Regex /a{b}c:', regexp.regexp);
} catch (e) {
    console.error('Error with /a{b}c:', e.message);
}

try {
    const regexp = pathToRegexp('/ab+c');
    console.log('Regex /ab+c:', regexp.regexp);
} catch (e) {
    console.error('Error with /ab+c:', e.message);
}

try {
    const regexp = pathToRegexp('/a{bc}d');
    console.log('Regex /a{bc}d:', regexp.regexp);
} catch (e) {
    console.error('Error with /a{bc}d:', e.message);
}

