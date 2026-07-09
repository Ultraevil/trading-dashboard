import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import i18next from 'i18next';

/**
 * A separate i18next instance (not the app's singleton) purely for
 * building expected strings in E2E specs, which run in Node rather than
 * a browser — the app's own `shared/i18n/config.ts` uses
 * i18next-browser-languagedetector, which needs `window`/`navigator` and
 * would throw here. Reading the same locale JSON keeps these assertions
 * coupled to translation *keys*, not to whatever the copy currently says.
 *
 * Read via `fs` + `JSON.parse` rather than a JSON module import: under
 * Node's ESM loader (this project is `"type": "module"`), importing
 * `.json` directly requires an import-attribute (`with { type: 'json' }`)
 * whose exact syntax varies by Node version — reading the file avoids
 * that entirely.
 */
const dirname = path.dirname(fileURLToPath(import.meta.url));

const loadLocale = (locale: string) =>
  JSON.parse(
    readFileSync(
      path.join(
        dirname,
        `../src/shared/i18n/locales/${locale}/translation.json`,
      ),
      'utf-8',
    ),
  );

const e2eI18n = i18next.createInstance();

e2eI18n.init({
  lng: 'en',
  resources: {
    en: { translation: loadLocale('en') },
    uk: { translation: loadLocale('uk') },
  },
  interpolation: { escapeValue: false },
});

export const t = e2eI18n.getFixedT('en');
export const tUk = e2eI18n.getFixedT('uk');
