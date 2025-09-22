/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import * as THREE from 'three'
import Scene from './Scene';

type CelesphereProps = {
  backgroundColor: string;
};

function Celesphere({ backgroundColor }: CelesphereProps) {
  const style = css({
    backgroundColor: backgroundColor,
    height: '100vh',
    width: '100vw',
  });

  return(
    <div css={style}>
      <Scene backgroundColor={backgroundColor} />
    </div>
  )
}

export default Celesphere;

