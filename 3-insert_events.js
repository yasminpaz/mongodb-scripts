db.eventos.insertOne({
  nome: "Festival de Verão",
  tipo: "Festival",
  data: new Date("2025-01-15"),
  classe: "A",
  modelo_distribuicao: "Livre",
  artistas: [
    ObjectId("686c64c45790daeb59dc70a6"),
    ObjectId("686c64c45790daeb59dc70a7")
  ],
  local: {
    nome: "Arena Fonte Nova",
    endereco: "Salvador - BA",
    setores: [
      { nome: "Pista", capacidade: 6000 },
      { nome: "Camarote", capacidade: 1000 }
    ]
  },
  ingressos: [
    {
      tipo: "Inteira",
      setor: "Pista",
      valor: 120.00
    },
    {
      tipo: "Inteira",
      setor: "Camarote",
      valor: 250.00
    }
  ]
});
