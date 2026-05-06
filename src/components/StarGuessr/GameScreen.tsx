import { useMemo, useState } from "react";
import type { Vector3 } from "three";
import type { GameMode, Lang } from "./";
import { CelestialSphere } from "./CelestialSphere";
import { text } from "./text";
import { evaluateGuess, newSession, ROUND_COUNT, skyPosition } from "./game";

type Props = { lang: Lang; mode: GameMode; onBackToMenu: () => void };

export function GameScreen({ lang, mode, onBackToMenu }: Props) {
  const t = text[lang];
  const [objects, setObjects] = useState(newSession);
  const [round, setRound] = useState(0);
  const [guess, setGuess] = useState<Vector3 | null>(null);
  const [results, setResults] = useState<ReturnType<typeof evaluateGuess>[]>(
    [],
  );
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">(
    "idle",
  );
  const [copying, setCopying] = useState(false);
  const [finished, setFinished] = useState(false);
  const object = objects[round];
  const target = useMemo(() => skyPosition(object.ra, object.dec), [object]);
  const revealed = results.length > round;
  const total = results.reduce((sum, result) => sum + result.score, 0);
  const shareText = [
    `StarGuessr · ${mode === "hint" ? t.hint : t.noHint}`,
    `${total.toLocaleString()} / 25,000`,
    ...results.map(
      (result, i) =>
        `${objects[i].id}: ${result.score.toLocaleString()} / 5,000 · ${result.error.toFixed(2)}°`,
    ),
    "#StarGuessr",
    `https://NI57721.dev/${lang === "ja" ? "ja/" : ""}starguessr/`,
  ].join("\n");
  async function copyResults() {
    setCopying(true);
    try {
      await navigator.clipboard.writeText(shareText);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    } finally {
      setCopying(false);
    }
  }
  function restart() {
    setCopyStatus("idle");
    setObjects(newSession());
    setRound(0);
    setGuess(null);
    setResults([]);
    setFinished(false);
  }
  return (
    <main className="sg-game">
      <div className="sg-sky">
        <CelestialSphere
          key={`${objects.map((o) => o.id).join("-")}-${round}`}
          magnitudeCap={8.5}
          mode={mode}
          lined={mode === "hint"}
          selectedPosition={guess}
          answer={revealed ? target : null}
          onSelect={setGuess}
        />
      </div>
      <header className="sg-header sg-panel">
        <button onClick={onBackToMenu} className="sg-quiet">
          ← {t.backToMenu}
        </button>
        <strong>
          StarGuessr{" "}
          <span className="sg-tag">{mode === "hint" ? t.hint : t.noHint}</span>
        </strong>
        <span>{total.toLocaleString()} / 25,000</span>
      </header>
      {finished ? (
        <section
          className="sg-panel sg-summary"
          aria-labelledby="summary-title"
        >
          <p className="sg-eyebrow">{t.complete}</p>
          <h1 id="summary-title">
            {total.toLocaleString()} <small>/ 25,000</small>
          </h1>
          <table>
            <thead>
              <tr>
                <th>{t.target}</th>
                <th>{t.error}</th>
                <th>{t.score}</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, i) => (
                <tr key={objects[i].id}>
                  <td>{objects[i].id}</td>
                  <td>{result.error.toFixed(2)}°</td>
                  <td>{result.score.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="sg-share">
            <a
              className="sg-share-link"
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.shareX}
            </a>
            <button type="button" onClick={copyResults} disabled={copying}>
              {copyStatus === "copied" ? t.copied : t.copyText}
            </button>
          </div>
          <p className="sg-muted" role="status">
            {copyStatus === "copied"
              ? t.copied
              : copyStatus === "failed"
                ? t.copyFailed
                : ""}
          </p>
          {copyStatus === "failed" && (
            <textarea
              className="sg-share-text"
              aria-label={t.copyText}
              readOnly
              value={shareText}
              onFocus={(event) => event.currentTarget.select()}
            />
          )}
          <button className="sg-primary" onClick={restart}>
            {t.playAgain}
          </button>
          <button className="sg-quiet" onClick={onBackToMenu}>
            {t.backToMenu}
          </button>
        </section>
      ) : (
        <>
          <section className="sg-panel sg-target">
            <p className="sg-eyebrow">
              {t.round} {round + 1} / {ROUND_COUNT}
            </p>
            <h1>{object.id}</h1>
            <p>{object.name[lang]}</p>
            {mode === "hint" && (
              <p className="sg-muted">
                {object.constellation.split(" / ")[lang === "en" ? 0 : 1]}
              </p>
            )}
          </section>
          <section className="sg-panel sg-action" aria-live="polite">
            {revealed ? (
              <>
                <p className="sg-eyebrow">{t.result}</p>
                <h2>
                  {results[round].score.toLocaleString()} <small>/ 5,000</small>
                </h2>
                <p>
                  {t.error}: <strong>{results[round].error.toFixed(2)}°</strong>
                </p>
                <p className="sg-muted">
                  <span className="sg-pink">● {t.yourGuess}</span> ·{" "}
                  <span className="sg-green">● {t.answer}</span>
                </p>
                <p className="sg-muted">
                  RA {object.ra.toFixed(3)}h · Dec {object.dec.toFixed(3)}°
                </p>
                <button
                  className="sg-primary"
                  onClick={() => {
                    if (round + 1 === ROUND_COUNT) setFinished(true);
                    else {
                      setRound(round + 1);
                      setGuess(null);
                    }
                  }}
                >
                  {round + 1 === ROUND_COUNT ? t.viewResults : t.next}
                </button>
              </>
            ) : (
              <>
                <p>{guess ? t.selected : t.placeGuess}</p>
                <p className="sg-muted">{t.controls}</p>
                <button
                  className="sg-primary"
                  disabled={!guess}
                  onClick={() => {
                    if (guess && !revealed)
                      setResults([...results, evaluateGuess(guess, target)]);
                  }}
                >
                  {t.submit}
                </button>
              </>
            )}
          </section>
        </>
      )}
    </main>
  );
}
