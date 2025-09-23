#!/usr/bin/env ruby
# frozen_string_literal: true

class Hipparcos
  attr_reader :id, :ra, :de, :hp, :bv, :m, :t, :xc, :yc
  def initialize(
    # Hipparcos identifier
    id:,
    # Right Ascension in ICRS, Ep=1991.25 [rad]
    ra:,
    # Declination in ICRS, Ep=1991.25 [rad]
    de:,
    # Hipparcos magnitude [mag]
    hp:,
    # B-V Colour index [mag]
    bv:
  )
    @id = id
    @ra = ra
    @de = de
    @hp = hp
    @bv = bv
    @m = apparentMagnitude
    @t = surfaceTemperature
    @xc = xc
    @yc = yc
  end

  def apparentMagnitude
    @hp - 0.2964 * @bv + 0.1110 * @bv**2 + 0.0157 * @bv**3  + 0.0072
  end

  def surfaceTemperature
    4600  * (1 / (0.92 * @bv + 1.7) + 1 / (0.92 * @bv + 0.62))
  end

  # x in the xy space of the Planckian locus
  def xc
    if 1667 <= @t && @t <= 4000
      -0.2661239e9 / @t**3 - 0.2343589e6 / @t**2 + 0.8776956e3 / @t + 0.179910
    elsif 4000 <= t && t <= 25000
      -3.0258469e9 / @t**3 + 2.1070379e6 / @t**2 + 0.2226347e3 / @t + 0.240390
    else
      1
      # raise('Invalid temperature: %f' % @t)
    end
  end

  # y in the xy space of the Planckian locus
  def yc
    if 1667 <= @t && @t <= 2222
      -1.1063814 * @xc**3 - 1.34811020 * @xc**2 + 2.18555832 * @xc - 0.20219683
    elsif 2222 <= @t && @t <= 4000
      -0.9549476 * @xc**3 - 1.37418593 * @xc**2 + 2.09137015 * @xc - 0.16748867
    elsif 4000 <= @t && @t <= 25000
      3.0817580 * @xc**3 - 5.87338670 * @xc**2 + 3.75112997 * @xc - 0.37001483
    else
      1
      # raise('Invalid temperature: %f' % t)
    end
  end

  def cie_xyz(y = 1)
    [
      y * @xc / @yc,
      y,
      (1 - @xc - @yc) * y / @yc
    ]
  end

  def srgb(m = 1, correct: false)
    x, y, z = cie_xyz(m)
    srgb = [
       3.2406255 * x - 1.5372080 * y - 0.4986286 * z,
      -0.9689307 * x + 1.8757561 * y + 0.0415175 * z,
       0.0557101 * x - 0.2040211 * y + 1.0569959 * z
    ]
    if correct
      srgb = srgb.map{_1.abs / srgb.max}
    end
    srgb
  end

  def self.fromCatalogue(str)
    arr = str.split.values_at(0, 4, 5, 19, 23)
    new(
      id: arr[0].to_i,
      ra: arr[1].to_f,
      de: arr[2].to_f,
      hp: arr[3].to_f,
      bv: arr[4].to_f,
    )
  end

  # Use Hipparcos Catalogue (hip2.dat) from
  # https://cdsarc.cds.unistra.fr/viz-bin/cat?I/311
  def self.fromData
    open('hip2.dat').read.split("\n").map{self.fromCatalogue(_1)}
  end

  def self.fromDataToJSON(magnitudeCap: false)
    data = fromData
    arr = data.map do |hip|
      if !magnitudeCap || hip.m > magnitudeCap
        next
      end
      {
        position: [Math.cos(hip.ra) * Math.cos(hip.de), Math.sin(hip.ra) * Math.cos(hip.de), Math.sin(hip.de)],
        magnitude: hip.m,
        color: hip.srgb(correct: true),
        name: COMMON_NAMES[hip.id],
      }
    end.compact
    JSON.generate(arr)
  end

  # Use constellationship.fab
  def self.fromDataToConstellationLineJSON
    data = fromData
    h = {}
    data.each do |hip|
      h[hip.id] = [Math.cos(hip.ra) * Math.cos(hip.de), Math.sin(hip.ra) * Math.cos(hip.de), Math.sin(hip.de)]
    end.compact
    pairs = open('constellationship.fab').read.split("\n")
      .flat_map{_1.split.map(&:to_i).each_slice(2).to_a[1..]}
      .map{|a, b| puts b if h[b].nil? ;[h[a], h[b]]}
    JSON.generate(pairs)
  end


  COMMON_NAMES = {
    13847 => 'Acamar',
    7588 => 'Achernar',
    3821 => 'Achird',
    78820 => 'Acrab',
    60718 => 'Acrux',
    44066 => 'Acubens',
    50335 => 'Adhafera',
    33579 => 'Adhara',
    6411 => 'Adhil',
    20889 => 'Ain',
    92761 => 'Ainalrami',
    94481 => 'Aladfar',
    90004 => 'Alasia',
    94141 => 'Albaldah',
    102618 => 'Albali',
    95947 => 'Albireo',
    59199 => 'Alchiba',
    65477 => 'Alcor',
    17702 => 'Alcyone',
    21421 => 'Aldebaran',
    105199 => 'Alderamin',
    108085 => 'Aldhanab',
    83895 => 'Aldhibah',
    101421 => 'Aldulfin',
    106032 => 'Alfirk',
    100064 => 'Algedi',
    1067 => 'Algenib',
    50583 => 'Algieba',
    14576 => 'Algol',
    60965 => 'Algorab',
    31681 => 'Alhena',
    62956 => 'Alioth',
    102488 => 'Aljanah',
    67301 => 'Alkaid',
    75411 => 'Alkalurops',
    44471 => 'Alkaphrah',
    115623 => 'Alkarab',
    53740 => 'Alkes',
    23416 => 'Almaaz',
    9640 => 'Almach',
    109268 => 'Alnair',
    88635 => 'Alnasl',
    26311 => 'Alnilam',
    26727 => 'Alnitak',
    80112 => 'Alniyat',
    46390 => 'Alphard',
    76267 => 'Alphecca',
    677 => 'Alpheratz',
    7097 => 'Alpherg',
    83608 => 'Alrakis',
    9487 => 'Alrescha',
    86782 => 'Alruba',
    96100 => 'Alsafi',
    41075 => 'Alsciaukat',
    42913 => 'Alsephina',
    98036 => 'Alshain',
    100310 => 'Alshat',
    97649 => 'Altair',
    94376 => 'Altais',
    46750 => 'Alterf',
    35904 => 'Aludra',
    55203 => 'Alula Australis',
    55219 => 'Alula Borealis',
    92946 => 'Alya',
    32362 => 'Alzirr',
    29550 => 'Amadioha',
    110003 => 'Ancha',
    13288 => 'Angetenar',
    57820 => 'Aniara',
    2081 => 'Ankaa',
    95771 => 'Anser',
    80763 => 'Antares',
    72845 => 'Arcalís',
    69673 => 'Arcturus',
    95294 => 'Arkab Posterior',
    95241 => 'Arkab Prior',
    25985 => 'Arneb',
    93506 => 'Ascella',
    42911 => 'Asellus Australis',
    42806 => 'Asellus Borealis ',
    43109 => 'Ashlesha',
    45556 => 'Aspidiske',
    17579 => 'Asterope',
    80331 => 'Athebyne',
    17448 => 'Atik',
    17847 => 'Atlas',
    82273 => 'Atria',
    41037 => 'Avior',
    118319 => 'Axólotl',
    13993 => 'Ayeyarwady',
    107136 => 'Azelfafage',
    13701 => 'Azha',
    38170 => 'Azmidi',
    73136 => 'Baekdu',
    87937 => 'Barnard\'s Star',
    8645 => 'Baten Kaitos',
    20535 => 'Beemim',
    19587 => 'Beid',
    95124 => 'Belel',
    25336 => 'Bellatrix',
    27989 => 'Betelgeuse',
    13209 => 'Bharani',
    48711 => 'Bibhā',
    109427 => 'Biham',
    107251 => 'Bosona',
    14838 => 'Botein',
    73714 => 'Brachium',
    26380 => 'Bubup',
    12191 => 'Buna',
    106786 => 'Bunda',
    6643 => 'Bélénos',
    30438 => 'Canopus',
    24608 => 'Capella',
    746 => 'Caph',
    36850 => 'Castor',
    4422 => 'Castula',
    86742 => 'Cebalrai',
    37284 => 'Ceibo',
    17489 => 'Celaeno',
    86796 => 'Cervantes',
    53721 => 'Chalawan',
    20894 => 'Chamukuy',
    61317 => 'Chara',
    99894 => 'Chechia',
    54879 => 'Chertan',
    1547 => 'Citadelle',
    33719 => 'Citalá',
    3479 => 'Cocibolca',
    43587 => 'Copernicus',
    63125 => 'Cor Caroli',
    80463 => 'Cujam',
    23875 => 'Cursa',
    100345 => 'Dabih',
    14879 => 'Dalim',
    102098 => 'Deneb',
    107556 => 'Deneb Algedi',
    57632 => 'Denebola',
    64241 => 'Diadem',
    54158 => 'Dingolay',
    3419 => 'Diphda',
    66047 => 'Dofida',
    78401 => 'Dschubba',
    54061 => 'Dubhe',
    86614 => 'Dziban',
    114322 => 'Ebla',
    75458 => 'Edasich',
    17499 => 'Electra',
    70755 => 'Elgafar',
    29034 => 'Elkurud',
    25428 => 'Elnath',
    87833 => 'Eltanin',
    5529 => 'Emiw',
    107315 => 'Enif',
    116727 => 'Errai',
    90344 => 'Fafnir',
    78265 => 'Fang',
    97165 => 'Fawaris',
    48615 => 'Felis',
    2247 => 'Felixvarela',
    57370 => 'Flegetonte',
    113368 => 'Fomalhaut',
    56508 => 'Formosa',
    2920 => 'Fulu',
    113889 => 'Fumalsamakah',
    61177 => 'Funi',
    30122 => 'Furud',
    87261 => 'Fuyue',
    61084 => 'Gacrux',
    42446 => 'Gakyid',
    56211 => 'Giausar',
    59803 => 'Gienah',
    60260 => 'Ginan',
    36188 => 'Gomeisa',
    87585 => 'Grumium',
    77450 => 'Gudja',
    94645 => 'Gumala',
    84405 => 'Guniibuu',
    68702 => 'Hadar',
    23767 => 'Haedus',
    9884 => 'Hamal',
    23015 => 'Hassaleh',
    26241 => 'Hatysa',
    113357 => 'Helvetios',
    66249 => 'Heze',
    21109 => 'Hoggar',
    112029 => 'Homam',
    55174 => 'Hunahpú',
    80076 => 'Hunor',
    78104 => 'Iklil',
    47087 => 'Illyrian',
    59747 => 'Imai',
    84787 => 'Inquill',
    15578 => 'Intan',
    46471 => 'Intercrus',
    108375 => 'Itonda',
    72105 => 'Izar',
    79374 => 'Jabbah',
    37265 => 'Jishui',
    12706 => 'Kaffaljidhma',
    47202 => 'Kalausi',
    79219 => 'Kamuy',
    69427 => 'Kang',
    76351 => 'Karaka',
    90185 => 'Kaus Australis',
    90496 => 'Kaus Borealis',
    89931 => 'Kaus Media',
    92895 => 'Kaveh',
    19849 => 'Keid',
    69974 => 'Khambalia',
    104987 => 'Kitalpha',
    72607 => 'Kochab',
    12961 => 'Koeia',
    80816 => 'Kornephoros',
    61359 => 'Kraz',
    108917 => 'Kurhah',
    62223 => 'La Superba',
    82396 => 'Larawag',
    85696 => 'Lesath',
    97938 => 'Libertas',
    66192 => 'Liesma',
    13061 => 'Lilii Borea',
    110813 => 'Lionrock',
    30860 => 'Lucilinburhuc',
    30905 => 'Lusitânia',
    85693 => 'Maasym',
    52521 => 'Macondo',
    24003 => 'Mago',
    28380 => 'Mahasim',
    82651 => 'Mahsati',
    17573 => 'Maia',
    80883 => 'Marfik',
    113963 => 'Markab',
    45941 => 'Markeb',
    79043 => 'Marsic',
    112158 => 'Matar',
    32246 => 'Mebsuta',
    59774 => 'Megrez',
    26207 => 'Meissa',
    34088 => 'Mekbuda',
    42556 => 'Meleph',
    28360 => 'Menkalinan',
    14135 => 'Menkar',
    68933 => 'Menkent',
    18614 => 'Menkib',
    53910 => 'Merak',
    72487 => 'Merga',
    94114 => 'Meridiana',
    17608 => 'Merope',
    8832 => 'Mesarthim',
    45238 => 'Miaplacidus',
    62434 => 'Mimosa',
    42402 => 'Minchir',
    63090 => 'Minelauva',
    25930 => 'Mintaka',
    10826 => 'Mira',
    5447 => 'Mirach',
    13268 => 'Miram',
    15863 => 'Mirfak',
    30324 => 'Mirzam',
    14668 => 'Misam',
    65378 => 'Mizar',
    8796 => 'Mothallah',
    22491 => 'Mouhoun',
    34045 => 'Muliphein',
    67927 => 'Muphrid',
    41704 => 'Muscida',
    103527 => 'Musica',
    72339 => 'Mönch',
    44946 => 'Nahn',
    39429 => 'Naos',
    106985 => 'Nashira',
    48235 => 'Natasha',
    73555 => 'Nekkar',
    7607 => 'Nembus',
    5054 => 'Nenque',
    32916 => 'Nervia',
    33856 => 'Nganurganity',
    25606 => 'Nihal',
    74961 => 'Nikawiy',
    31895 => 'Nosaxa',
    92855 => 'Nunki',
    75695 => 'Nusakan',
    13192 => 'Nushagak',
    40687 => 'Násti',
    80838 => 'Ogma',
    93747 => 'Okab',
    81266 => 'Paikauhale',
    100751 => 'Peacock',
    26634 => 'Phact',
    58001 => 'Phecda',
    75097 => 'Pherkad',
    99711 => 'Phoenicia',
    40881 => 'Piautos',
    88414 => 'Pincoya',
    82545 => 'Pipirima',
    17851 => 'Pleione',
    116084 => 'Poerava',
    11767 => 'Polaris',
    104382 => 'Polaris Australis',
    89341 => 'Polis',
    37826 => 'Pollux',
    61941 => 'Porrima',
    53229 => 'Praecipua',
    20205 => 'Prima Hyadum',
    37279 => 'Procyon',
    29655 => 'Propus',
    70890 => 'Proxima Centauri ',
    16537 => 'Ran',
    17378 => 'Rana',
    83547 => 'Rapeto',
    48455 => 'Rasalas',
    84345 => 'Rasalgethi',
    86032 => 'Rasalhague',
    85670 => 'Rastaban',
    49669 => 'Regulus',
    5737 => 'Revati',
    24436 => 'Rigel',
    71683 => 'Rigil Kentaurus',
    81022 => 'Rosalíadecastro',
    101769 => 'Rotanev',
    6686 => 'Ruchbah',
    95347 => 'Rukbat',
    84012 => 'Sabik',
    23453 => 'Saclateni',
    110395 => 'Sadachbia',
    112748 => 'Sadalbari',
    109074 => 'Sadalmelik',
    106278 => 'Sadalsuud',
    100453 => 'Sadr',
    56572 => 'Sagarmatha',
    27366 => 'Saiph',
    115250 => 'Salm',
    86228 => 'Sargas',
    84379 => 'Sarin',
    21594 => 'Sceptrum',
    113881 => 'Scheat',
    3179 => 'Schedar',
    20455 => 'Secunda Hyadum',
    8886 => 'Segin',
    71075 => 'Seginus',
    96757 => 'Sham',
    55664 => 'Shama',
    79431 => 'Sharjah',
    85927 => 'Shaula',
    92420 => 'Sheliak',
    8903 => 'Sheratan',
    95262 => 'Sika',
    32349 => 'Sirius',
    111710 => 'Situla',
    113136 => 'Skat',
    104780 => 'Solaris',
    65474 => 'Spica',
    43674 => 'Stribor',
    101958 => 'Sualocin',
    47508 => 'Subra',
    44816 => 'Suhail',
    93194 => 'Sulafat',
    69701 => 'Syrma',
    106824 => 'Sāmaya',
    22449 => 'Tabit',
    57399 => 'Taiyangshou',
    63076 => 'Taiyi',
    44127 => 'Talitha',
    50801 => 'Tania Australis',
    50372 => 'Tania Borealis',
    38041 => 'Tapecue',
    97278 => 'Tarazed',
    40526 => 'Tarf',
    17531 => 'Taygeta',
    40167 => 'Tegmine',
    30343 => 'Tejat',
    98066 => 'Terebellum',
    21393 => 'Theemin',
    68756 => 'Thuban',
    112122 => 'Tiaki',
    26451 => 'Tianguan',
    62423 => 'Tianyi',
    80687 => 'Timir',
    7513 => 'Titawin',
    71681 => 'Toliman',
    58952 => 'Tonatiuh',
    8198 => 'Torcular',
    17096 => 'Tupi',
    60644 => 'Tupã',
    39757 => 'Tureis',
    47431 => 'Ukdah',
    57291 => 'Uklun',
    77070 => 'Unukalhai',
    96078 => 'Uruk',
    91262 => 'Vega',
    116076 => 'Veritate',
    63608 => 'Vindemiatrix',
    35550 => 'Wasat',
    27628 => 'Wazn',
    34444 => 'Wezen',
    5348 => 'Wurren',
    82514 => 'Xamidimura',
    91852 => 'Xihe',
    69732 => 'Xuange',
    79882 => 'Yed Posterior',
    79593 => 'Yed Prior',
    85822 => 'Yildun',
    60129 => 'Zaniah',
    18543 => 'Zaurak',
    57757 => 'Zavijava',
    48356 => 'Zhang',
    15197 => 'Zibal',
    54872 => 'Zosma',
    72622 => 'Zubenelgenubi',
    76333 => 'Zubenelhakrabi',
    74785 => 'Zubeneschamali',
  }
end

