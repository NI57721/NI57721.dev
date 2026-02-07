/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

type SliderProps = {
  magnitudeCap: number;
  handleMagnitudeCapPinch: Function;
};

function Slider({ magnitudeCap, handleMagnitudeCapPinch }: SliderProps) {
  const style = css({
    backgroundColor: "#99f",
    direction: "rtl",
    height: 4,
  });

  return (
    <div>
      <p>Apparent Magnitude</p>
      <input
        css={style}
        min="-2"
        max="8.5"
        onChange={(e) => handleMagnitudeCapPinch(parseFloat(e.target.value))}
        step="0.1"
        type="range"
        value={magnitudeCap}
      />
      <p>{magnitudeCap}</p>
    </div>
  );
}

type LinerProps = {
  lined: boolean;
  handleLinedChange: Function;
};

function Liner({ lined, handleLinedChange }: LinerProps) {
  const style = css({
    height: 24,
    width: 24,
  });

  return (
    <div>
      <input
        css={style}
        id="lined"
        name="lined"
        onChange={(e) => handleLinedChange(e.target.value !== "true")}
        type="checkbox"
        value={String(lined)}
      />
      <label htmlFor="lined">Lines</label>
    </div>
  );
}

type ControllerProps = {
  magnitudeCap: number;
  handleMagnitudeCapPinch: Function;
  lined: boolean;
  handleLinedChange: Function;
};

function Controller({
  magnitudeCap,
  handleMagnitudeCapPinch,
  lined,
  handleLinedChange,
}: ControllerProps) {
  const style = css({
    backgroundColor: "#fff",
    fontSize: 16,
    padding: 8,
    position: "absolute",
    right: 0,
    textAlign: "center",
    top: 0,
    width: 180,
  });

  return (
    <div css={style}>
      <Slider
        magnitudeCap={magnitudeCap}
        handleMagnitudeCapPinch={handleMagnitudeCapPinch}
      />
      <Liner lined={lined} handleLinedChange={handleLinedChange} />
    </div>
  );
}

export default Controller;
