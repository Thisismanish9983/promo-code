const fs = require('fs');
const html = fs.readFileSync('reference.html', 'utf8');
const styles = html.match(/<style[^>]*>([\s\S]*?)<\/style>/g) || [];
styles.forEach((s, idx) => {
  console.log(`\n================== STYLE #${idx} ==================\n`);
  console.log(s);
});
