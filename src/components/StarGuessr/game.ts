import { Vector3, MathUtils } from "three";

// J2000 coordinates: right ascension in hours, declination in degrees.
// Source: https://www.astronomy.ohio-state.edu/pogge.1/Ast350/Labs/messier.html
// M82's source RA separator is normalized; M102 uses NGC 5866 as in the source.
// Common names are preserved from the starter set; other objects use catalogue IDs.
export const messier = [
  {
    id: "M1",
    name: {
      en: "Crab Nebula",
      ja: "かに星雲",
    },
    constellation: "Taurus / おうし座",
    ra: 5.575,
    dec: 22.016666666666666,
  },
  {
    id: "M2",
    name: {
      en: "NGC 7089",
      ja: "NGC 7089",
    },
    constellation: "Aquarius / みずがめ座",
    ra: 21.558333333333334,
    dec: -0.8166666666666667,
  },
  {
    id: "M3",
    name: {
      en: "NGC 5272",
      ja: "NGC 5272",
    },
    constellation: "Canes Venatici / りょうけん座",
    ra: 13.703333333333333,
    dec: 28.383333333333333,
  },
  {
    id: "M4",
    name: {
      en: "NGC 6121",
      ja: "NGC 6121",
    },
    constellation: "Scorpius / さそり座",
    ra: 16.393333333333334,
    dec: -26.533333333333335,
  },
  {
    id: "M5",
    name: {
      en: "NGC 5904",
      ja: "NGC 5904",
    },
    constellation: "Serpens / へび座",
    ra: 15.31,
    dec: 2.0833333333333335,
  },
  {
    id: "M6",
    name: {
      en: "NGC 6405",
      ja: "NGC 6405",
    },
    constellation: "Scorpius / さそり座",
    ra: 17.668333333333333,
    dec: -32.21666666666667,
  },
  {
    id: "M7",
    name: {
      en: "NGC 6475",
      ja: "NGC 6475",
    },
    constellation: "Scorpius / さそり座",
    ra: 17.898333333333333,
    dec: -34.81666666666667,
  },
  {
    id: "M8",
    name: {
      en: "Lagoon Nebula",
      ja: "干潟星雲",
    },
    constellation: "Sagittarius / いて座",
    ra: 18.063333333333333,
    dec: -24.383333333333333,
  },
  {
    id: "M9",
    name: {
      en: "NGC 6333",
      ja: "NGC 6333",
    },
    constellation: "Ophiuchus / へびつかい座",
    ra: 17.32,
    dec: -18.516666666666666,
  },
  {
    id: "M10",
    name: {
      en: "NGC 6254",
      ja: "NGC 6254",
    },
    constellation: "Ophiuchus / へびつかい座",
    ra: 16.951666666666668,
    dec: -4.1,
  },
  {
    id: "M11",
    name: {
      en: "NGC 6705",
      ja: "NGC 6705",
    },
    constellation: "Scutum / たて座",
    ra: 18.851666666666667,
    dec: -6.266666666666667,
  },
  {
    id: "M12",
    name: {
      en: "NGC 6218",
      ja: "NGC 6218",
    },
    constellation: "Ophiuchus / へびつかい座",
    ra: 16.786666666666665,
    dec: -1.95,
  },
  {
    id: "M13",
    name: {
      en: "Hercules Cluster",
      ja: "ヘルクレス座球状星団",
    },
    constellation: "Hercules / ヘルクレス座",
    ra: 16.695,
    dec: 36.46666666666667,
  },
  {
    id: "M14",
    name: {
      en: "NGC 6402",
      ja: "NGC 6402",
    },
    constellation: "Ophiuchus / へびつかい座",
    ra: 17.626666666666665,
    dec: -3.25,
  },
  {
    id: "M15",
    name: {
      en: "NGC 7078",
      ja: "NGC 7078",
    },
    constellation: "Pegasus / ペガスス座",
    ra: 21.5,
    dec: 12.166666666666666,
  },
  {
    id: "M16",
    name: {
      en: "NGC 6611",
      ja: "NGC 6611",
    },
    constellation: "Serpens / へび座",
    ra: 18.313333333333333,
    dec: -13.783333333333333,
  },
  {
    id: "M17",
    name: {
      en: "NGC 6618",
      ja: "NGC 6618",
    },
    constellation: "Sagittarius / いて座",
    ra: 18.346666666666668,
    dec: -16.183333333333334,
  },
  {
    id: "M18",
    name: {
      en: "NGC 6613",
      ja: "NGC 6613",
    },
    constellation: "Sagittarius / いて座",
    ra: 18.331666666666667,
    dec: -17.133333333333333,
  },
  {
    id: "M19",
    name: {
      en: "NGC 6273",
      ja: "NGC 6273",
    },
    constellation: "Ophiuchus / へびつかい座",
    ra: 17.043333333333333,
    dec: -26.266666666666666,
  },
  {
    id: "M20",
    name: {
      en: "NGC 6514",
      ja: "NGC 6514",
    },
    constellation: "Sagittarius / いて座",
    ra: 18.043333333333333,
    dec: -23.033333333333335,
  },
  {
    id: "M21",
    name: {
      en: "NGC 6531",
      ja: "NGC 6531",
    },
    constellation: "Sagittarius / いて座",
    ra: 18.076666666666668,
    dec: -22.5,
  },
  {
    id: "M22",
    name: {
      en: "NGC 6656",
      ja: "NGC 6656",
    },
    constellation: "Sagittarius / いて座",
    ra: 18.606666666666666,
    dec: -23.9,
  },
  {
    id: "M23",
    name: {
      en: "NGC 6494",
      ja: "NGC 6494",
    },
    constellation: "Sagittarius / いて座",
    ra: 17.946666666666665,
    dec: -19.016666666666666,
  },
  {
    id: "M24",
    name: {
      en: "NGC 6603",
      ja: "NGC 6603",
    },
    constellation: "Sagittarius / いて座",
    ra: 18.281666666666666,
    dec: -18.483333333333334,
  },
  {
    id: "M25",
    name: {
      en: "IC 4725",
      ja: "IC 4725",
    },
    constellation: "Sagittarius / いて座",
    ra: 18.526666666666667,
    dec: -19.25,
  },
  {
    id: "M26",
    name: {
      en: "NGC 6694",
      ja: "NGC 6694",
    },
    constellation: "Scutum / たて座",
    ra: 18.753333333333334,
    dec: -9.4,
  },
  {
    id: "M27",
    name: {
      en: "Dumbbell Nebula",
      ja: "亜鈴状星雲",
    },
    constellation: "Vulpecula / こぎつね座",
    ra: 19.993333333333332,
    dec: 22.716666666666665,
  },
  {
    id: "M28",
    name: {
      en: "NGC 6626",
      ja: "NGC 6626",
    },
    constellation: "Sagittarius / いて座",
    ra: 18.408333333333335,
    dec: -24.866666666666667,
  },
  {
    id: "M29",
    name: {
      en: "NGC 6913",
      ja: "NGC 6913",
    },
    constellation: "Cygnus / はくちょう座",
    ra: 20.398333333333333,
    dec: 38.53333333333333,
  },
  {
    id: "M30",
    name: {
      en: "NGC 7099",
      ja: "NGC 7099",
    },
    constellation: "Capricornus / やぎ座",
    ra: 21.673333333333332,
    dec: -23.183333333333334,
  },
  {
    id: "M31",
    name: {
      en: "Andromeda Galaxy",
      ja: "アンドロメダ銀河",
    },
    constellation: "Andromeda / アンドロメダ座",
    ra: 0.7116666666666667,
    dec: 41.266666666666666,
  },
  {
    id: "M32",
    name: {
      en: "NGC 221",
      ja: "NGC 221",
    },
    constellation: "Andromeda / アンドロメダ座",
    ra: 0.7116666666666667,
    dec: 40.86666666666667,
  },
  {
    id: "M33",
    name: {
      en: "Triangulum Galaxy",
      ja: "さんかく座銀河",
    },
    constellation: "Triangulum / さんかく座",
    ra: 1.565,
    dec: 30.65,
  },
  {
    id: "M34",
    name: {
      en: "NGC 1039",
      ja: "NGC 1039",
    },
    constellation: "Perseus / ペルセウス座",
    ra: 2.7,
    dec: 42.78333333333333,
  },
  {
    id: "M35",
    name: {
      en: "NGC 2168",
      ja: "NGC 2168",
    },
    constellation: "Gemini / ふたご座",
    ra: 6.148333333333333,
    dec: 24.333333333333332,
  },
  {
    id: "M36",
    name: {
      en: "NGC 1960",
      ja: "NGC 1960",
    },
    constellation: "Auriga / ぎょしゃ座",
    ra: 5.601666666666667,
    dec: 34.13333333333333,
  },
  {
    id: "M37",
    name: {
      en: "NGC 2099",
      ja: "NGC 2099",
    },
    constellation: "Auriga / ぎょしゃ座",
    ra: 5.873333333333333,
    dec: 32.55,
  },
  {
    id: "M38",
    name: {
      en: "NGC 1922",
      ja: "NGC 1922",
    },
    constellation: "Auriga / ぎょしゃ座",
    ra: 5.473333333333334,
    dec: 35.833333333333336,
  },
  {
    id: "M39",
    name: {
      en: "NGC 7092",
      ja: "NGC 7092",
    },
    constellation: "Cygnus / はくちょう座",
    ra: 21.536666666666665,
    dec: 48.43333333333333,
  },
  {
    id: "M40",
    name: {
      en: "Winnecke 4",
      ja: "Winnecke 4",
    },
    constellation: "Ursa Major / おおぐま座",
    ra: 12.373333333333333,
    dec: 58.083333333333336,
  },
  {
    id: "M41",
    name: {
      en: "NGC 2287",
      ja: "NGC 2287",
    },
    constellation: "Canis Major / おおいぬ座",
    ra: 6.766666666666667,
    dec: -20.733333333333334,
  },
  {
    id: "M42",
    name: {
      en: "Orion Nebula",
      ja: "オリオン大星雲",
    },
    constellation: "Orion / オリオン座",
    ra: 5.59,
    dec: -5.45,
  },
  {
    id: "M43",
    name: {
      en: "NGC 1982",
      ja: "NGC 1982",
    },
    constellation: "Orion / オリオン座",
    ra: 5.593333333333334,
    dec: -5.266666666666667,
  },
  {
    id: "M44",
    name: {
      en: "Beehive Cluster",
      ja: "プレセペ星団",
    },
    constellation: "Cancer / かに座",
    ra: 8.668333333333333,
    dec: 19.983333333333334,
  },
  {
    id: "M45",
    name: {
      en: "Pleiades",
      ja: "プレアデス星団",
    },
    constellation: "Taurus / おうし座",
    ra: 3.783333333333333,
    dec: 24.116666666666667,
  },
  {
    id: "M46",
    name: {
      en: "NGC 2437",
      ja: "NGC 2437",
    },
    constellation: "Puppis / とも座",
    ra: 7.696666666666666,
    dec: -14.816666666666666,
  },
  {
    id: "M47",
    name: {
      en: "NGC 2422",
      ja: "NGC 2422",
    },
    constellation: "Puppis / とも座",
    ra: 7.61,
    dec: -14.5,
  },
  {
    id: "M48",
    name: {
      en: "NGC 2548",
      ja: "NGC 2548",
    },
    constellation: "Hydra / うみへび座",
    ra: 8.23,
    dec: -5.8,
  },
  {
    id: "M49",
    name: {
      en: "NGC 4472",
      ja: "NGC 4472",
    },
    constellation: "Virgo / おとめ座",
    ra: 12.496666666666666,
    dec: 8.0,
  },
  {
    id: "M50",
    name: {
      en: "NGC 2323",
      ja: "NGC 2323",
    },
    constellation: "Monoceros / いっかくじゅう座",
    ra: 7.053333333333334,
    dec: -8.333333333333334,
  },
  {
    id: "M51",
    name: {
      en: "Whirlpool Galaxy",
      ja: "子持ち銀河",
    },
    constellation: "Canes Venatici / りょうけん座",
    ra: 13.498333333333333,
    dec: 47.2,
  },
  {
    id: "M52",
    name: {
      en: "NGC 7654",
      ja: "NGC 7654",
    },
    constellation: "Cassiopeia / カシオペヤ座",
    ra: 23.403333333333332,
    dec: 61.583333333333336,
  },
  {
    id: "M53",
    name: {
      en: "NGC 5024",
      ja: "NGC 5024",
    },
    constellation: "Coma Berenices / かみのけ座",
    ra: 13.215,
    dec: 18.166666666666668,
  },
  {
    id: "M54",
    name: {
      en: "NGC 6715",
      ja: "NGC 6715",
    },
    constellation: "Sagittarius / いて座",
    ra: 18.918333333333333,
    dec: -30.483333333333334,
  },
  {
    id: "M55",
    name: {
      en: "NGC 6809",
      ja: "NGC 6809",
    },
    constellation: "Sagittarius / いて座",
    ra: 19.666666666666668,
    dec: -30.966666666666665,
  },
  {
    id: "M56",
    name: {
      en: "NGC 6779",
      ja: "NGC 6779",
    },
    constellation: "Lyra / こと座",
    ra: 19.276666666666667,
    dec: 30.183333333333334,
  },
  {
    id: "M57",
    name: {
      en: "Ring Nebula",
      ja: "環状星雲",
    },
    constellation: "Lyra / こと座",
    ra: 18.893333333333334,
    dec: 33.03333333333333,
  },
  {
    id: "M58",
    name: {
      en: "NGC 4579",
      ja: "NGC 4579",
    },
    constellation: "Virgo / おとめ座",
    ra: 12.628333333333334,
    dec: 11.816666666666666,
  },
  {
    id: "M59",
    name: {
      en: "NGC 4621",
      ja: "NGC 4621",
    },
    constellation: "Virgo / おとめ座",
    ra: 12.7,
    dec: 11.65,
  },
  {
    id: "M60",
    name: {
      en: "NGC 4649",
      ja: "NGC 4649",
    },
    constellation: "Virgo / おとめ座",
    ra: 12.728333333333333,
    dec: 11.55,
  },
  {
    id: "M61",
    name: {
      en: "NGC 4303",
      ja: "NGC 4303",
    },
    constellation: "Virgo / おとめ座",
    ra: 12.365,
    dec: 4.466666666666667,
  },
  {
    id: "M62",
    name: {
      en: "NGC 6266",
      ja: "NGC 6266",
    },
    constellation: "Ophiuchus / へびつかい座",
    ra: 17.02,
    dec: -30.116666666666667,
  },
  {
    id: "M63",
    name: {
      en: "NGC 5055",
      ja: "NGC 5055",
    },
    constellation: "Canes Venatici / りょうけん座",
    ra: 13.263333333333334,
    dec: 42.03333333333333,
  },
  {
    id: "M64",
    name: {
      en: "NGC 4826",
      ja: "NGC 4826",
    },
    constellation: "Coma Berenices / かみのけ座",
    ra: 12.945,
    dec: 21.683333333333334,
  },
  {
    id: "M65",
    name: {
      en: "NGC 3623",
      ja: "NGC 3623",
    },
    constellation: "Leo / しし座",
    ra: 11.315,
    dec: 13.083333333333334,
  },
  {
    id: "M66",
    name: {
      en: "NGC 3627",
      ja: "NGC 3627",
    },
    constellation: "Leo / しし座",
    ra: 11.336666666666666,
    dec: 12.983333333333333,
  },
  {
    id: "M67",
    name: {
      en: "NGC 2682",
      ja: "NGC 2682",
    },
    constellation: "Cancer / かに座",
    ra: 8.84,
    dec: 11.816666666666666,
  },
  {
    id: "M68",
    name: {
      en: "NGC 4590",
      ja: "NGC 4590",
    },
    constellation: "Hydra / うみへび座",
    ra: 12.658333333333333,
    dec: -26.75,
  },
  {
    id: "M69",
    name: {
      en: "NGC 6637",
      ja: "NGC 6637",
    },
    constellation: "Sagittarius / いて座",
    ra: 18.523333333333333,
    dec: -32.35,
  },
  {
    id: "M70",
    name: {
      en: "NGC 6681",
      ja: "NGC 6681",
    },
    constellation: "Sagittarius / いて座",
    ra: 18.72,
    dec: -32.3,
  },
  {
    id: "M71",
    name: {
      en: "NGC 6838",
      ja: "NGC 6838",
    },
    constellation: "Sagitta / や座",
    ra: 19.89666666666667,
    dec: 18.783333333333335,
  },
  {
    id: "M72",
    name: {
      en: "NGC 6981",
      ja: "NGC 6981",
    },
    constellation: "Aquarius / みずがめ座",
    ra: 20.891666666666666,
    dec: -12.533333333333333,
  },
  {
    id: "M73",
    name: {
      en: "NGC 6994",
      ja: "NGC 6994",
    },
    constellation: "Aquarius / みずがめ座",
    ra: 20.981666666666666,
    dec: -12.633333333333333,
  },
  {
    id: "M74",
    name: {
      en: "NGC 628",
      ja: "NGC 628",
    },
    constellation: "Pisces / うお座",
    ra: 1.6116666666666668,
    dec: 15.783333333333333,
  },
  {
    id: "M75",
    name: {
      en: "NGC 6864",
      ja: "NGC 6864",
    },
    constellation: "Sagittarius / いて座",
    ra: 20.101666666666667,
    dec: -21.916666666666668,
  },
  {
    id: "M76",
    name: {
      en: "NGC 650",
      ja: "NGC 650",
    },
    constellation: "Perseus / ペルセウス座",
    ra: 1.7066666666666666,
    dec: 51.56666666666667,
  },
  {
    id: "M77",
    name: {
      en: "NGC 1068",
      ja: "NGC 1068",
    },
    constellation: "Cetus / くじら座",
    ra: 2.711666666666667,
    dec: -0.016666666666666666,
  },
  {
    id: "M78",
    name: {
      en: "NGC 2068",
      ja: "NGC 2068",
    },
    constellation: "Orion / オリオン座",
    ra: 5.778333333333333,
    dec: 0.05,
  },
  {
    id: "M79",
    name: {
      en: "NGC 1904",
      ja: "NGC 1904",
    },
    constellation: "Lepus / うさぎ座",
    ra: 5.408333333333333,
    dec: -24.55,
  },
  {
    id: "M80",
    name: {
      en: "NGC 6093",
      ja: "NGC 6093",
    },
    constellation: "Scorpius / さそり座",
    ra: 16.283333333333335,
    dec: -22.983333333333334,
  },
  {
    id: "M81",
    name: {
      en: "NGC 3031",
      ja: "NGC 3031",
    },
    constellation: "Ursa Major / おおぐま座",
    ra: 9.926666666666666,
    dec: 69.06666666666666,
  },
  {
    id: "M82",
    name: {
      en: "NGC 3034",
      ja: "NGC 3034",
    },
    constellation: "Ursa Major / おおぐま座",
    ra: 9.93,
    dec: 69.68333333333334,
  },
  {
    id: "M83",
    name: {
      en: "NGC 5236",
      ja: "NGC 5236",
    },
    constellation: "Hydra / うみへび座",
    ra: 13.616666666666667,
    dec: -29.866666666666667,
  },
  {
    id: "M84",
    name: {
      en: "NGC 4374",
      ja: "NGC 4374",
    },
    constellation: "Virgo / おとめ座",
    ra: 12.418333333333333,
    dec: 12.883333333333333,
  },
  {
    id: "M85",
    name: {
      en: "NGC 4382",
      ja: "NGC 4382",
    },
    constellation: "Coma Berenices / かみのけ座",
    ra: 12.423333333333334,
    dec: 18.183333333333334,
  },
  {
    id: "M86",
    name: {
      en: "NGC 4406",
      ja: "NGC 4406",
    },
    constellation: "Virgo / おとめ座",
    ra: 12.436666666666667,
    dec: 12.95,
  },
  {
    id: "M87",
    name: {
      en: "NGC 4486",
      ja: "NGC 4486",
    },
    constellation: "Virgo / おとめ座",
    ra: 12.513333333333334,
    dec: 12.4,
  },
  {
    id: "M88",
    name: {
      en: "NGC 4501",
      ja: "NGC 4501",
    },
    constellation: "Coma Berenices / かみのけ座",
    ra: 12.533333333333333,
    dec: 14.416666666666666,
  },
  {
    id: "M89",
    name: {
      en: "NGC 4552",
      ja: "NGC 4552",
    },
    constellation: "Virgo / おとめ座",
    ra: 12.595,
    dec: 12.55,
  },
  {
    id: "M90",
    name: {
      en: "NGC 4569",
      ja: "NGC 4569",
    },
    constellation: "Virgo / おとめ座",
    ra: 12.613333333333333,
    dec: 13.166666666666666,
  },
  {
    id: "M91",
    name: {
      en: "NGC 4548",
      ja: "NGC 4548",
    },
    constellation: "Coma Berenices / かみのけ座",
    ra: 12.59,
    dec: 14.5,
  },
  {
    id: "M92",
    name: {
      en: "NGC 6341",
      ja: "NGC 6341",
    },
    constellation: "Hercules / ヘルクレス座",
    ra: 17.285,
    dec: 43.13333333333333,
  },
  {
    id: "M93",
    name: {
      en: "NGC 2447",
      ja: "NGC 2447",
    },
    constellation: "Puppis / とも座",
    ra: 7.743333333333333,
    dec: -23.866666666666667,
  },
  {
    id: "M94",
    name: {
      en: "NGC 4736",
      ja: "NGC 4736",
    },
    constellation: "Canes Venatici / りょうけん座",
    ra: 12.848333333333333,
    dec: 41.11666666666667,
  },
  {
    id: "M95",
    name: {
      en: "NGC 3351",
      ja: "NGC 3351",
    },
    constellation: "Leo / しし座",
    ra: 10.733333333333333,
    dec: 11.7,
  },
  {
    id: "M96",
    name: {
      en: "NGC 3368",
      ja: "NGC 3368",
    },
    constellation: "Leo / しし座",
    ra: 10.78,
    dec: 11.816666666666666,
  },
  {
    id: "M97",
    name: {
      en: "NGC 3587",
      ja: "NGC 3587",
    },
    constellation: "Ursa Major / おおぐま座",
    ra: 11.246666666666666,
    dec: 55.016666666666666,
  },
  {
    id: "M98",
    name: {
      en: "NGC 4192",
      ja: "NGC 4192",
    },
    constellation: "Coma Berenices / かみのけ座",
    ra: 12.23,
    dec: 14.9,
  },
  {
    id: "M99",
    name: {
      en: "NGC 4254",
      ja: "NGC 4254",
    },
    constellation: "Coma Berenices / かみのけ座",
    ra: 12.313333333333333,
    dec: 14.416666666666666,
  },
  {
    id: "M100",
    name: {
      en: "NGC 4321",
      ja: "NGC 4321",
    },
    constellation: "Coma Berenices / かみのけ座",
    ra: 12.381666666666666,
    dec: 15.816666666666666,
  },
  {
    id: "M101",
    name: {
      en: "NGC 5457",
      ja: "NGC 5457",
    },
    constellation: "Ursa Major / おおぐま座",
    ra: 14.053333333333333,
    dec: 54.35,
  },
  {
    id: "M102",
    name: {
      en: "NGC 5866",
      ja: "NGC 5866",
    },
    constellation: "Draco / りゅう座",
    ra: 15.108333333333333,
    dec: 55.766666666666666,
  },
  {
    id: "M103",
    name: {
      en: "NGC 581",
      ja: "NGC 581",
    },
    constellation: "Cassiopeia / カシオペヤ座",
    ra: 1.5533333333333332,
    dec: 60.7,
  },
  {
    id: "M104",
    name: {
      en: "Sombrero Galaxy",
      ja: "ソンブレロ銀河",
    },
    constellation: "Virgo / おとめ座",
    ra: 12.666666666666666,
    dec: -11.616666666666667,
  },
  {
    id: "M105",
    name: {
      en: "NGC 3379",
      ja: "NGC 3379",
    },
    constellation: "Leo / しし座",
    ra: 10.796666666666667,
    dec: 12.583333333333334,
  },
  {
    id: "M106",
    name: {
      en: "NGC 4258",
      ja: "NGC 4258",
    },
    constellation: "Canes Venatici / りょうけん座",
    ra: 12.316666666666666,
    dec: 47.3,
  },
  {
    id: "M107",
    name: {
      en: "NGC 6171",
      ja: "NGC 6171",
    },
    constellation: "Ophiuchus / へびつかい座",
    ra: 16.541666666666668,
    dec: -13.05,
  },
  {
    id: "M108",
    name: {
      en: "NGC 3556",
      ja: "NGC 3556",
    },
    constellation: "Ursa Major / おおぐま座",
    ra: 11.191666666666666,
    dec: 55.666666666666664,
  },
  {
    id: "M109",
    name: {
      en: "NGC 3992",
      ja: "NGC 3992",
    },
    constellation: "Ursa Major / おおぐま座",
    ra: 11.96,
    dec: 53.38333333333333,
  },
  {
    id: "M110",
    name: {
      en: "NGC 205",
      ja: "NGC 205",
    },
    constellation: "Andromeda / アンドロメダ座",
    ra: 0.6733333333333333,
    dec: 41.68333333333333,
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
