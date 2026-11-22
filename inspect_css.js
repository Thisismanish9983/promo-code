const fs = require('fs');
if (fs.existsSync('critical.css')) {
  const css = fs.readFileSync('critical.css', 'utf8');
  console.log('critical.css size:', css.length);
  const root = css.match(/:root\s*\{[^}]+\}/g);
  if (root) console.log(root[0]);
  const headers = css.match(/\.site-header[^{]*\{[^}]+\}/g);
  if (headers) console.log(headers.slice(0, 5).join('\n'));
  const dealCards = css.match(/\.landing-deal-card[^{]*\{[^}]+\}/g);
  if (dealCards) console.log(dealCards.slice(0, 5).join('\n'));
  const btns = css.match(/\.coupon-btn[^{]*\{[^}]+\}/g);
  if (btns) console.log(btns.slice(0, 5).join('\n'));
} else {
  console.log('critical.css does not exist');
}
