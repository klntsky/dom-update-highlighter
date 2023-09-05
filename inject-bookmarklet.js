import fs from 'fs';

const file = fs.readFileSync('./content.min.js').toString();

const html = fs.readFileSync('index.html').toString();
const htmlOut = html.replace('<!--bookmarklet-->', 'javascript:'+encodeURI(file));
fs.writeFileSync('public/index.html', htmlOut);
