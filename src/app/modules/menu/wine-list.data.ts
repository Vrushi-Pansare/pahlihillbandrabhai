import { Menu } from './menu.model';

/** Transcribed from WineandSpirit.pdf (19 Aug 2026). Prices in GBP. */
const BTG = '125ml · 175ml · 500ml · bottle';

export const WINE_LIST: Menu = {
  slug: 'wine-list',
  title: 'Wine & Spirits',
  intro:
    'Wines by the glass and bottle, bin ends, and a spirits list spanning grain, botanicals, agave, barley and beyond. An extended list is available in the room.',
  pdfUrl:
    'https://cshare-leader-prod-new.s3.ap-south-1.amazonaws.com/2026-08-19T14:57:12.464Z/WineandSpirit.pdf',
  footnotes: [
    'Wines by the glass are poured in 125ml, 175ml and 500ml carafe measures. Spirits are served as 50ml.',
    '125ml measures are available on request for any wine sold by the glass.',
    'Vintages change with stock — the list in the room is definitive.',
    'A 12.5% discretionary service charge is added to your bill.',
  ],
  groups: [
    {
      id: 'by-the-glass',
      title: 'Wines by the Glass',
      sections: [
        {
          id: 'btg-sparkling',
          title: 'Sparkling',
          caption: BTG,
          items: [
            {
              name: 'NV Via Vai, Prosecco, Veneto, Italy',
              desc: 'Glera · sparkling & zesty',
              price: '9 · – · – · 45',
            },
            {
              name: 'NV Cattier, Premier Cru Brut, Champagne, France',
              desc: 'Pinot Noir, Chardonnay, Pinot Meunier · nutty, acacia honey',
              price: '19 · – · – · 85',
            },
            {
              name: 'NV Ruinart Blanc de Blancs, Champagne, France',
              desc: 'Chardonnay · citrus',
              price: 'bottle 130',
            },
          ],
        },
        {
          id: 'btg-white',
          title: 'White',
          caption: BTG,
          items: [
            {
              name: '2023 Aubert & Mathieu “Kate”, Languedoc-Roussillon, France',
              desc: 'Sauvignon Blanc · aromatic & dry',
              price: '7 · 10 · 21 · 30',
            },
            {
              name: '2024 Blanco Sobre Lías, Care, Spain',
              desc: 'Chardonnay, Grenache Blanc · crisp, dry & refreshing',
              price: '9 · 12 · 27 · 35',
            },
            {
              name: '2025 Gavi di Gavi “La Minaia”, Nicola Bergaglio, Piemonte, Italy',
              desc: 'Cortese · crisp, dry & refreshing',
              price: '11 · 14 · 33 · 40',
            },
          ],
        },
        {
          id: 'btg-rose',
          title: 'Rosé',
          caption: BTG,
          items: [
            {
              name: '2025 Planeta, Rosé Sicilia, Sicily, Italy',
              desc: 'Syrah, Nero d’Avola · delicate & floral',
              price: '11 · 13 · 34 · 45',
            },
          ],
        },
        {
          id: 'btg-red',
          title: 'Red',
          caption: BTG,
          items: [
            {
              name: '2024 Embrujo Tempranillo Organic, Bodegas Verum, Spain',
              desc: 'Tempranillo · fresh & fruity',
              price: '7 · 10 · 21 · 30',
            },
            {
              name: '2022 Quinta do Crasto, Flor de Crasto, Douro, Portugal',
              desc: 'Tinta Roriz, Touriga Franca, Touriga Nacional · warm & spicy',
              price: '9 · 12 · 27 · 35',
            },
            {
              name: '2024 Valpolicella Valpantena DOC, Bertani, Veneto, Italy',
              desc: 'Corvina Veronese, Rondinella · medium-bodied & elegant',
              price: '11 · 14 · 33 · 40',
            },
          ],
        },
      ],
    },
    {
      id: 'bottles',
      title: 'Wine Bottles',
      sections: [
        {
          id: 'btl-white',
          title: 'White',
          caption: 'Bottle',
          items: [
            {
              name: '2024 San Sisto, Verdicchio dei Castelli di Jesi Classico, Italy',
              desc: 'Verdicchio · crisp, dry & refreshing',
              price: '32',
            },
            {
              name: '2025 SLPV, Sauvignon Blanc / Sémillon, Western Cape, South Africa',
              desc: 'Sauvignon Blanc, Sémillon · aromatic & dry',
              price: '35',
            },
            {
              name: '2024 Weingut Tesch, Riesling “Queen of Whites” (Dry), Nahe, Germany',
              desc: 'Riesling · crisp, dry & refreshing',
              price: '37',
            },
            {
              name: '2025 Réserve Roquemolière, Picpoul de Pinet, Languedoc-Roussillon, France',
              desc: 'Picpoul · crisp, dry & refreshing',
              price: '40',
            },
            {
              name: '2024 Colterenzio, Pinot Grigio, Alto Adige, Italy',
              desc: 'Pinot Grigio · crisp, dry & refreshing',
              price: '50',
            },
            {
              name: '2023 Vignerons des Terres Secrètes, Saint-Véran “Les Préludes”, Burgundy, France',
              desc: 'Chardonnay · aromatic & dry',
              price: '52',
            },
            {
              name: '2023 Collio Ribolla Gialla “Maralba”, Marco Felluga, Italy',
              desc: 'Ribolla Gialla · crisp & mineral',
              price: '62',
            },
            {
              name: '2022 Chardonnay, Thelema, Stellenbosch, South Africa',
              desc: 'Chardonnay · crisp, creamy nuttiness',
              price: '68',
            },
            {
              name: '2024 Chablis, Joseph Drouhin, Burgundy, France',
              desc: 'Chardonnay · crisp, dry & refreshing',
              price: '75',
            },
            {
              name: '2018 Château Lamothe-Bouscaut Blanc, Pessac-Léognan, Bordeaux, France',
              desc: 'Sauvignon Blanc, Sémillon · round & fruity',
              price: '80',
            },
          ],
        },
        {
          id: 'btl-rose',
          title: 'Rosé',
          caption: 'Bottle',
          items: [
            {
              name: '2024 G de Galoupet, Côtes de Provence, France',
              desc: 'Grenache, Mourvèdre, Cinsault, Syrah · layered, fresh & delicate',
              price: '60',
            },
          ],
        },
        {
          id: 'btl-red',
          title: 'Red',
          caption: 'Bottle',
          items: [
            {
              name: "2021 Bosco Nestore, Linea Classica Montepulciano d'Abruzzo, Italy",
              desc: 'Montepulciano · medium-bodied & elegant',
              price: '48',
            },
            {
              name: '2022 Open Gate Malbec, Alpasión, Mendoza, Argentina',
              desc: 'Malbec · medium-bodied & elegant',
              price: '49',
            },
            {
              name: '2023 Roble, Pago de los Capellanes, Ribera del Duero, Spain',
              desc: 'Tempranillo · light & juicy',
              price: '56',
            },
            {
              name: '2020 Rioja Crianza, Sierra Cantabria, Spain',
              desc: 'Tempranillo · full-bodied & richly textured',
              price: '65',
            },
            {
              name: '2024 Puiatti Pinot Nero, Friuli-Venezia Giulia, Italy',
              desc: 'Pinot Nero · light & juicy',
              price: '70',
            },
            {
              name: '2023 Maillard Père et Fils, Chorey-lès-Beaune Rouge, Burgundy, France',
              desc: 'Pinot Noir · medium-bodied & elegant',
              price: '80',
            },
            {
              name: '2015 Château Teyssier, Saint-Émilion Grand Cru, Bordeaux, France',
              desc: 'Merlot, Cabernet Franc · medium-bodied & elegant',
              price: '84',
            },
            {
              name: "2020 Fontanafredda, Barolo di Serralunga d'Alba, Piemonte, Italy",
              desc: 'Nebbiolo · full-bodied & richly textured',
              price: '100',
            },
          ],
        },
      ],
    },
    {
      id: 'bin-ends',
      title: 'Bin Ends',
      sections: [
        {
          id: 'bin-white',
          title: 'White',
          caption: 'Bottle · limited stock',
          items: [
            {
              name: '2023 Azienda Agricola Ottella “Le Creete”, Lugana, Veneto, Italy',
              desc: 'Turbiana · round & fruity',
              price: '65',
            },
            {
              name: '2022 Marama Sauvignon Blanc, Seresin Estate, Marlborough, New Zealand',
              desc: 'Sauvignon Blanc · generous & intense',
              price: '75',
            },
          ],
        },
        {
          id: 'bin-red',
          title: 'Red',
          caption: 'Bottle · limited stock',
          items: [
            {
              name: '2023 Château Léoube “Love by Léoube” Rouge, Provence, France',
              desc: 'Syrah, Grenache, Mourvèdre · light & juicy',
              price: '47',
            },
            {
              name: '2023 Vumbaca Giuseppe, Rosso Classico Superiore, Cirò, Calabria, Italy',
              desc: 'Gaglioppo · full-bodied & richly textured',
              price: '50',
            },
            {
              name: '2023 Atlántico Sur Tannat, Familia Deicas, Canelón, Uruguay',
              desc: 'Tannat · full-bodied & richly textured',
              price: '55',
            },
            {
              name: '2024 La Spinetta, Langhe Nebbiolo, Italy',
              desc: 'Nebbiolo · full-bodied & richly textured',
              price: '60',
            },
            {
              name: '2020 Domaine Rolet, Arbois Trousseau, Jura, France',
              desc: 'Trousseau · light-bodied, refreshing acidity',
              price: '70',
            },
          ],
        },
      ],
    },
    {
      id: 'spirits',
      title: 'Spirits',
      sections: [
        {
          id: 'spirits-grain',
          title: 'Grain',
          caption: '50ml',
          items: [
            { name: 'Desi Daru Original', price: '10' },
            { name: 'Belvedere', price: '12' },
            { name: 'Desi Daru Mango', price: '13' },
            { name: 'Edwards Rhubarb', price: '13' },
            { name: 'Konik’s Tail', price: '13' },
            { name: 'Beluga Noble', price: '20' },
          ],
        },
        {
          id: 'spirits-botanicals',
          title: 'Botanicals',
          caption: '50ml',
          items: [
            { name: 'Salcombe Start Point', price: '11' },
            { name: 'Plymouth Sloe Gin', price: '12' },
            { name: 'Hendrick’s', price: '12' },
            { name: 'Hendrick’s (Another)', price: '12' },
            { name: 'Cotswolds', price: '12' },
            { name: 'Sipsmith London Dry', price: '12' },
            { name: 'Gin Mare', price: '13' },
            { name: 'Salcombe Rosé Sainte Marie', price: '14' },
            { name: 'Monkey 47', price: '14' },
            { name: 'Hapusa (Indian)', price: '15' },
            { name: 'Tanqueray No. Ten', price: '16' },
          ],
        },
        {
          id: 'spirits-sugarcane',
          title: 'Sugarcane',
          caption: '50ml',
          items: [
            { name: 'Bacardí Carta Blanca', price: '9' },
            { name: 'Havana Club 3 Años', price: '9' },
            { name: 'Sitara Spiced Rum', price: '10' },
            { name: 'Gosling’s', price: '11' },
            { name: 'Kraken', price: '11' },
            { name: 'Ten To One Dark Rum', price: '12' },
            { name: 'Ten To One White Rum', price: '12' },
            { name: 'Wray & Nephew', price: '13' },
            { name: 'Diplomático', price: '15' },
          ],
        },
        {
          id: 'spirits-agave',
          title: 'Agave',
          caption: '50ml',
          items: [
            { name: 'Rooster Rojo Reposado', price: '10' },
            { name: 'Tres Tribus Ensamble (Mezcal)', price: '10' },
            { name: 'El Rayo Plata', price: '12' },
            { name: 'El Rayo Reposado', price: '13' },
            { name: 'Ojo de Dios (Mezcal)', price: '13' },
            { name: 'Teremana Blanco', price: '13' },
            { name: 'Teremana Reposado', price: '15' },
            { name: 'Teremana Añejo', price: '17' },
            { name: 'Mijenta Blanco', price: '15' },
            { name: 'Pensador (Mezcal)', price: '15' },
            { name: 'Mijenta Reposado', price: '18' },
            { name: 'Del Maguey Vida (Mezcal)', price: '19' },
            { name: 'Clase Azul Reposado', price: '31' },
            { name: 'Clase Azul Durango (Mezcal)', price: '52' },
          ],
        },
        {
          id: 'spirits-barley',
          title: 'Barley',
          caption: '50ml',
          items: [
            { name: 'Johnnie Walker Black', price: '10' },
            { name: 'Monkey Shoulder', price: '10' },
            { name: 'Glenfiddich 12', price: '12' },
            { name: 'Talisker 10', price: '13' },
            { name: 'Laphroaig 10', price: '14' },
            { name: 'GlenDronach 12', price: '18' },
            { name: 'Macallan 12', price: '26' },
            { name: 'Macallan 15', price: '39' },
            { name: 'Ardbeg 19', price: '45' },
            { name: 'Macallan Harmony Vibrant Oak', price: '52' },
          ],
        },
        {
          id: 'spirits-rye',
          title: 'Rye',
          caption: '50ml',
          items: [
            { name: 'Rittenhouse', price: '11' },
            { name: 'Michter’s Rye', price: '15' },
          ],
        },
        {
          id: 'spirits-corn',
          title: 'Corn',
          caption: '50ml',
          items: [
            { name: 'Maker’s Mark', price: '10' },
            { name: 'Woodford Reserve', price: '11' },
            { name: 'Blanton’s', price: '26' },
          ],
        },
        {
          id: 'spirits-world',
          title: 'World',
          caption: '50ml',
          items: [
            { name: 'Jameson (Irish)', price: '10' },
            { name: 'Slane', price: '10' },
            { name: 'Amrut (Indian)', price: '13' },
            { name: 'Nikka From the Barrel (Japanese)', price: '16' },
            { name: 'Rampur Asava (Indian)', price: '16' },
            { name: 'Indri Trini Three Wood (Indian)', price: '18' },
            { name: 'Hibiki (Japanese)', price: '26' },
          ],
        },
        {
          id: 'spirits-grape',
          title: 'Grape',
          caption: '50ml',
          items: [
            { name: 'Hennessy VS', price: '10' },
            { name: 'Metaxa 12 Stars', price: '12' },
            { name: 'Rémy Martin', price: '13' },
            { name: 'Frapin Multimillésime', price: '70' },
          ],
        },
      ],
    },
  ],
};
