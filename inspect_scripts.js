const fs = require('fs');
const html = fs.readFileSync('reference.html', 'utf8');

// Let's find script and style tags or link to CSS
const scriptMatches = html.match(/<script[^>]*>[\s\S]*?<\/script>/g) || [];
console.log('Total scripts:', scriptMatches.length);
scriptMatches.forEach((s, idx) => {
  if (s.includes('coupon') || s.includes('modal') || s.includes('click') || s.includes('showCode') || s.includes('search')) {
    console.log(`\nSCRIPT #${idx}:\n`, s.substring(0, 1000));
  }
});
