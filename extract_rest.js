const fs = require('fs');
const html = fs.readFileSync('reference.html', 'utf8');

function extractSnippet(startStr, endStr) {
  const start = html.indexOf(startStr);
  if (start === -1) return 'NOT FOUND: ' + startStr;
  const end = html.indexOf(endStr, start);
  return html.substring(start, end !== -1 ? end + endStr.length : start + 1500);
}

console.log('=== CATEGORIES ACCORDION ===');
console.log(extractSnippet('<section class="landing-links-section"', '</section>'));

console.log('=== NEWSLETTER & WHAT WE DO ===');
console.log(extractSnippet('<section class="newsletter-section">', '</section>'));
console.log(extractSnippet('<section class="text-section">', '</section>'));

console.log('=== FOOTER ===');
console.log(extractSnippet('<footer class="site-footer">', '</footer>'));
