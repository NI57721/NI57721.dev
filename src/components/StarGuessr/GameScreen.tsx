/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import type { GameMode, Lang } from "./";
import { CelestialSphere } from "./CelestialSphere";
import { text } from "./text";

type Props = {
  lang: Lang;
  mode: GameMode;
  onBackToMenu: () => void;
};

export function GameScreen({ lang, mode, onBackToMenu }: Props) {
  const t = text[lang];
  const style = css({
    backgroundColor: "#003",
    height: "100vh",
    position: "relative",
    width: "100%",
  });

  return (
    <main css={style}>
      <button type="button" onClick={onBackToMenu}>
        {t.backToMenu}
      </button>

      <CelestialSphere magnitudeCap={8.5} mode={mode} lined={true} />
    </main>
  );
}
