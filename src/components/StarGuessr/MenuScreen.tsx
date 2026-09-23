import type { GameMode, Lang } from "./";
import { text } from "./text";

type Props = {
  lang: Lang;
  mode: GameMode;
  onModeChange: (mode: GameMode) => void;
  onStart: () => void;
};

export function MenuScreen({ lang, mode, onModeChange, onStart }: Props) {
  const t = text[lang];

  return (
    <main className="sg-menu">
      <section className="sg-panel sg-intro">
        <p className="sg-eyebrow">MESSIER · SKY EXPLORER</p>
        <h1>{t.title}</h1>
        <p>{t.description}</p>
        <p className="sg-muted">{t.rules}</p>
        <p className="sg-muted">{t.catalogue}</p>

        <div className="sg-modes">
          <button
            type="button"
            aria-pressed={mode === "noHint"}
            onClick={() => onModeChange("noHint")}
          >
            {t.noHint}
            <small>{t.noHintDescription}</small>
          </button>

          <button
            type="button"
            aria-pressed={mode === "hint"}
            onClick={() => onModeChange("hint")}
          >
            {t.hint}
            <small>{t.hintDescription}</small>
          </button>
        </div>

        <button className="sg-primary" type="button" onClick={onStart}>
          {t.start}
        </button>
        <p className="sg-muted sg-source">
          <a href="https://www.astronomy.ohio-state.edu/pogge.1/Ast350/Labs/messier.html">
            Messier catalogue · J2000
          </a>
        </p>
      </section>
    </main>
  );
}
