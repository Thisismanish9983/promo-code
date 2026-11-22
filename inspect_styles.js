const fs = require('fs');
const html = fs.readFileSync('reference.html', 'utf8');
const styles = html.match(/<style[^>]*>([\s\S]*?)<\/style>/g) || [];
console.log('Total style tags:', styles.length);
styles.forEach((s, idx) => {
  console.log(`STYLE #${idx} (length ${s.length}):`);
  console.log(s.substring(0, 500));
});
