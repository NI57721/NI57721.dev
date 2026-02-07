/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import Controller from "./Controller";
import Scene from "./Scene";

type CelesphereProps = {
  backgroundColor: string;
};

function Celesphere({ backgroundColor }: CelesphereProps) {
  const style = css({
    backgroundColor: backgroundColor,
    height: "100vh",
    position: "relative",
    width: "100vw",
  });
  const [magnitudeCap, setMagnitudeCap] = useState(8.5);
  const [lined, setLined] = useState(true);

  function handleMagnitudeCapPinch(m: number) {
    setMagnitudeCap(m);
  }

  function handleLinedChange(b: boolean) {
    setLined(b);
  }

  return (
    <div css={style}>
      <Scene magnitudeCap={magnitudeCap} lined={lined} />
      <Controller
        magnitudeCap={magnitudeCap}
        handleMagnitudeCapPinch={handleMagnitudeCapPinch}
        lined={lined}
        handleLinedChange={handleLinedChange}
      />
    </div>
  );
}

export default Celesphere;
