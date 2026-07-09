import i18n from '@/shared/i18n/config';

/**
 * A translation function fixed to English, for building expected strings
 * in tests instead of hardcoding literal copy. This keeps tests coupled to
 * translation *keys* (which rarely change) rather than to the exact
 * wording (which changes often and shouldn't break tests when it does).
 *
 * `getFixedT` also sidesteps any cross-test pollution from a component
 * under test calling `i18n.changeLanguage(...)` — it always returns
 * English regardless of the instance's current active language.
 */
export const t = i18n.getFixedT('en');
