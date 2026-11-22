const fs = require('fs');
const html = fs.readFileSync('reference.html', 'utf8');

console.log('--- HEAD LINKS & SCRIPTS ---');
const links = html.match(/<link[^>]+>/g) || [];
links.forEach(l => console.log(l));

console.log('--- SECTIONS & CLASSES ---');
const sectionMatches = html.match(/<(section|header|footer|nav)[^>]*>/g) || [];
sectionMatches.forEach(s => console.log(s));

console.log('--- HEADINGS ---');
const headings = html.match(/<h[1-4][^>]*>[\s\S]*?<\/h[1-4]>/g) || [];
headings.forEach(h => console.log(h.replace(/\s+/g, ' ').trim()));
