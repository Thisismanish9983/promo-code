const fs = require('fs');
const html = fs.readFileSync('reference.html', 'utf8');

function extractSnippet(startStr, endStr) {
  const start = html.indexOf(startStr);
  if (start === -1) return 'NOT FOUND: ' + startStr;
  const end = html.indexOf(endStr, start);
  return html.substring(start, end !== -1 ? end + endStr.length : start + 1500);
}

console.log('=== HEADER ===');
console.log(extractSnippet('<header class="site-header">', '</header>'));

console.log('=== HERO SECTION ===');
console.log(extractSnippet('<section class="hero-section"', '</section>'));

console.log('=== POPULAR STORES ===');
console.log(extractSnippet('<section class="store-section"', '</section>'));

console.log('=== TOP DEALS ===');
console.log(extractSnippet('<section class="landing-deals-section">', '</section>'));
