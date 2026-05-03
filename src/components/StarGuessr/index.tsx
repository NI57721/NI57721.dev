import { useState } from 'react';
import { MenuScreen } from './MenuScreen';
import { GameScreen } from './GameScreen';

export type Lang = 'en' | 'ja';
export type GameMode = 'noHint' | 'hint';

type Props = {
  lang: Lang;
};

export function StarGuessrApp({ lang }: Props) {
  const [screen, setScreen] = useState<'menu' | 'game'>('menu');
  const [mode, setMode] = useState<GameMode>('noHint');

  if (screen === 'game') {
    return (
      <GameScreen
        lang={lang}
        mode={mode}
        onBackToMenu={() => setScreen('menu')}
      />
    );
  }

  return (
    <MenuScreen
      lang={lang}
      mode={mode}
      onModeChange={setMode}
      onStart={() => setScreen('game')}
    />
  );
}

export default StarGuessrApp;
