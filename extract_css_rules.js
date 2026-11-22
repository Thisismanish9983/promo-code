const fs = require('fs');
const css = fs.readFileSync('ref-main-utf8.css', 'utf8');

const classes = [
  'container',
  'site-header',
  'site-header__left',
  'site-header__logo',
  'site-header__nav',
  'site-header__menu',
  'site-header__right',
  'site-header__search',
  'site-header__searchbox',
  'site-header__toggle',
  'hero-section',
  'hero-content',
  'hero-description',
  'store-section',
  'store-section__title',
  'store-grid',
  'store-item',
  'store-item__logo',
  'store-item__name',
  'top-deals-section__title',
  'landing-deals-section',
  'landing-deal-card',
  'landing-deal-card__logo',
  'landing-deal-card__content',
  'landing-deal-card__title',
  'landing-deal-card__cta',
  'deal-grid',
  'accordion',
  'accordion__trigger',
  'accordion__title',
  'accordion__content',
  'accordion__grid',
  'accordion__item',
  'accordion__link',
  'newsletter-section',
  'newsletter-section__container',
  'newsletter-section__image',
  'newsletter-section__content',
  'newsletter-section__title',
  'newsletter-section__desc',
  'newsletter-section__form',
  'text-section',
  'text-section__title',
  'text-section__body',
  'site-footer',
  'site-footer__top',
  'site-footer__brand',
  'site-footer__columns',
  'site-footer__column',
  'site-footer__bottom',
  'site-footer__fineprint-link'
];

let extractedRules = [];
// Find rules matching each class
classes.forEach(cls => {
  const regex = new RegExp('(?:^|\\})([^{}]*\\.' + cls + '[^{]*\\{[^}]+\\})', 'g');
  let m;
  while ((m = regex.exec(css)) !== null) {
    extractedRules.push(m[1].trim());
  }
});

console.log('Found rules count:', extractedRules.length);
fs.writeFileSync('extracted_rules.css', extractedRules.join('\n'), 'utf8');
