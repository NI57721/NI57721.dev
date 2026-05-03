import type { GameMode, Lang } from './StarGuessrApp';
import { text } from './text';

type Props = {
  lang: Lang;
  mode: GameMode;
  onModeChange: (mode: GameMode) => void;
  onStart: () => void;
};

export function MenuScreen({ lang, mode, onModeChange, onStart }: Props) {
  const t = text[lang];

  return (
    <main>
      <h1>{t.title}</h1>
      <p>{t.description}</p>

      <div>
        <button
          type="button"
          aria-pressed={mode === 'noHint'}
          onClick={() => onModeChange('noHint')}
        >
          {t.noHint}
        </button>

        <button
          type="button"
          aria-pressed={mode === 'hint'}
          onClick={() => onModeChange('hint')}
        >
          {t.hint}
        </button>
      </div>

      <button type="button" onClick={onStart}>
        {t.start}
      </button>
    </main>
  );
}
