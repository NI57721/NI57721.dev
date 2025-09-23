/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState } from 'react';
import * as THREE from 'three'
import Controller from './Controller';
import Scene from './Scene';

type CelesphereProps = {
  backgroundColor: string;
};

function Celesphere({ backgroundColor }: CelesphereProps) {
  const style = css({
    backgroundColor: backgroundColor,
    height: '100vh',
    position: 'relative',
    width: '100vw',
  });
  const [magnitudeCap, setMagnitudeCap] = useState(8.5);

  function handleMagnitudeCapPinch(m: number) {
    setMagnitudeCap(m);
  };

  return(
    <div css={style}>
      <Scene backgroundColor={backgroundColor} magnitudeCap={magnitudeCap} />
      <Controller magnitudeCap={magnitudeCap} handleMagnitudeCapPinch={handleMagnitudeCapPinch} />
    </div>
  );
}

export default Celesphere;

