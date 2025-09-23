/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react'

type SliderProps = {
  magnitudeCap: number;
  handleMagnitudeCapPinch: Function;
};

function Slider({ magnitudeCap, handleMagnitudeCapPinch }: SliderProps) {
  const style = css({
    backgroundColor: '#99f',
    direction: 'rtl',
    height: 4,
  });

  return(
    <input
      css={style}
      min="-2"
      max="8.5"
      onChange={(e) => handleMagnitudeCapPinch(parseFloat(e.target.value))}
      step="0.1"
      type="range"
      value={magnitudeCap}
    />
  );
}

type ControllerProps = {
  magnitudeCap: number;
  handleMagnitudeCapPinch: Function;
};

function Controller({ magnitudeCap, handleMagnitudeCapPinch }: ControllerProps) {
  const radius = 10;

  const style = css({
    backgroundColor: '#fff',
    fontSize: 16,
    padding: 8,
    position: 'absolute',
    right: 0,
    textAlign: 'center',
    top: 0,
    width: 180,
  });

  return(
    <div css={style}>
      <p>Apparent Magnitude</p>
      <Slider magnitudeCap={magnitudeCap} handleMagnitudeCapPinch={handleMagnitudeCapPinch} />
      <p>{magnitudeCap}</p>
    </div>
  );
}

export default Controller;

