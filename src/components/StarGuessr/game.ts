import { Vector3, MathUtils } from "three";

// J2000 positions (RA hours/minutes, declination degrees/minutes).
// Source: https://www.astronomy.ohio-state.edu/pogge.1/Ast350/Labs/messier.html
export const messier = [
  {
    id: "M1",
    name: { en: "Crab Nebula", ja: "かに星雲" },
    constellation: "Taurus / おうし座",
    ra: 5 + 34.5 / 60,
    dec: 22 + 1 / 60,
  },
  {
    id: "M8",
    name: { en: "Lagoon Nebula", ja: "干潟星雲" },
    constellation: "Sagittarius / いて座",
    ra: 18 + 3.8 / 60,
    dec: -(24 + 23 / 60),
  },
  {
    id: "M13",
    name: { en: "Hercules Cluster", ja: "ヘルクレス座球状星団" },
    constellation: "Hercules / ヘルクレス座",
    ra: 16 + 41.7 / 60,
    dec: 36 + 28 / 60,
  },
  {
    id: "M27",
    name: { en: "Dumbbell Nebula", ja: "亜鈴状星雲" },
    constellation: "Vulpecula / こぎつね座",
    ra: 19 + 59.6 / 60,
    dec: 22 + 43 / 60,
  },
  {
    id: "M31",
    name: { en: "Andromeda Galaxy", ja: "アンドロメダ銀河" },
    constellation: "Andromeda / アンドロメダ座",
    ra: 42.7 / 60,
    dec: 41 + 16 / 60,
  },
  {
    id: "M33",
    name: { en: "Triangulum Galaxy", ja: "さんかく座銀河" },
    constellation: "Triangulum / さんかく座",
    ra: 1 + 33.9 / 60,
    dec: 30 + 39 / 60,
  },
  {
    id: "M42",
    name: { en: "Orion Nebula", ja: "オリオン大星雲" },
    constellation: "Orion / オリオン座",
    ra: 5 + 35.4 / 60,
    dec: -(5 + 27 / 60),
  },
  {
    id: "M44",
    name: { en: "Beehive Cluster", ja: "プレセペ星団" },
    constellation: "Cancer / かに座",
    ra: 8 + 40.1 / 60,
    dec: 19 + 59 / 60,
  },
  {
    id: "M45",
    name: { en: "Pleiades", ja: "プレアデス星団" },
    constellation: "Taurus / おうし座",
    ra: 3 + 47 / 60,
    dec: 24 + 7 / 60,
  },
  {
    id: "M51",
    name: { en: "Whirlpool Galaxy", ja: "子持ち銀河" },
    constellation: "Canes Venatici / りょうけん座",
    ra: 13 + 29.9 / 60,
    dec: 47 + 12 / 60,
  },
  {
    id: "M57",
    name: { en: "Ring Nebula", ja: "環状星雲" },
    constellation: "Lyra / こと座",
    ra: 18 + 53.6 / 60,
    dec: 33 + 2 / 60,
  },
  {
    id: "M104",
    name: { en: "Sombrero Galaxy", ja: "ソンブレロ銀河" },
    constellation: "Virgo / おとめ座",
    ra: 12 + 40 / 60,
    dec: -(11 + 37 / 60),
  },
];
export type MessierObject = (typeof messier)[number];
export const ROUND_COUNT = 5;
export function newSession() {
  const objects = [...messier];
  for (let i = objects.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [objects[i], objects[j]] = [objects[j], objects[i]];
  }
  return objects.slice(0, ROUND_COUNT);
}
export function skyPosition(ra: number, dec: number) {
  const a = MathUtils.degToRad(ra * 15);
  const d = MathUtils.degToRad(dec);
  // Matches the existing Hipparcos star catalogue: north is +Z.
  return new Vector3(
    Math.cos(a) * Math.cos(d),
    Math.sin(a) * Math.cos(d),
    Math.sin(d),
  );
}
export function evaluateGuess(guess: Vector3, target: Vector3) {
  const error = MathUtils.radToDeg(guess.angleTo(target));
  // Preserve the original near-perfect cutoff while halving the decay rate.
  const isPerfect = Math.round(5000 * Math.exp(-error / 15)) === 5000;
  const score = isPerfect
    ? 5000
    : Math.min(4999, Math.round(5000 * Math.exp(-error / 30)));
  return { error, score };
}
