import type { Lang } from './StarGuessrApp';

export const text = {
  en: {
    title: 'StarGuessr',
    description: 'Guess the position of stars and deep-sky objects on the celestial sphere.',
    noHint: 'No Hint',
    hint: 'Hint',
    start: 'Start',
    backToMenu: 'Back to Menu',
  },
  ja: {
    title: 'StarGuessr',
    description: '星や天体の位置を当てよう。',
    noHint: 'ノーヒント',
    hint: 'ヒントあり',
    start: 'スタート',
    backToMenu: 'メニューに戻る',
  },
} satisfies Record<Lang, Record<string, string>>;
