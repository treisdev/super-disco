export const tags = {
  "meio-ambiente": {
    id: "meio-ambiente",
    descricao: "Meio Ambiente e Desenvolvimento Sustentável"
  },
  "trabalho-escravo": { id: "trabalho-escravo", descricao: "Trabalho Escravo" },
  mulheres: { id: "mulheres", descricao: "Mulheres" },
  "violencia-domestica": {
    id: "violencia-domestica",
    descricao: "Violência Doméstica"
  },
  "direito-financeiro": {
    id: "direito-financeiro",
    descricao: "Direito Financeiro"
  },
  tributos: { id: "tributos", descricao: "Tributos" }
};

export const proposicoes = [
  {
    siglaTipo: "PL",
    tipoImg: "assets/img/pl.png",
    numero: 2431,
    ano: 2011,
    tags: [
      tags["meio-ambiente"],
      tags["trabalho-escravo"],
      tags["violencia-domestica"],
      tags["direito-financeiro"]
    ]
  },
  {
    siglaTipo: "PL",
    tipoImg: "assets/img/pec.png",
    numero: 2432,
    ano: 2011,
    tags: [tags["meio-ambiente"], tags["trabalho-escravo"]]
  },
  {
    siglaTipo: "PL",
    tipoImg: "assets/img/plp.png",
    numero: 2433,
    ano: 2011,
    tags: [tags["direito-financeiro"], tags["violencia-domestica"]]
  },
  {
    siglaTipo: "PL",
    tipoImg: "assets/img/pl.png",
    numero: 2431,
    ano: 2011,
    tags: [tags["meio-ambiente"]]
  },
  {
    siglaTipo: "PL",
    tipoImg: "assets/img/pec.png",
    numero: 2432,
    ano: 2011,
    tags: [tags["direito-financeiro"]]
  },
  {
    siglaTipo: "PL",
    tipoImg: "assets/img/plp.png",
    numero: 2433,
    ano: 2011,
    tags: [tags["mulheres"]]
  },
  {
    siglaTipo: "PL",
    tipoImg: "assets/img/pl.png",
    numero: 2431,
    ano: 2011,
    tags: []
  },
  {
    siglaTipo: "PL",
    tipoImg: "assets/img/pec.png",
    numero: 2432,
    ano: 2011,
    tags: []
  },
  {
    siglaTipo: "PL",
    tipoImg: "assets/img/plp.png",
    numero: 2433,
    ano: 2011,
    tags: []
  }
];
