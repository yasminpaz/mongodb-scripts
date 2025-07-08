// Encontrar um evento específico pelo nome
db.eventos.find(
  { "nome": "Festival de Verão" }
)

// Encontrar todos os artistas de um determinado gênero musical
db.artistas.find(
  { "genero": "Axé" }
)

// Encontrar eventos que acontecerão em um local específico
db.eventos.find(
  { "local.nome": "Arena Fonte Nova" }
)

// Encontrar eventos que tenham um setor específico
db.eventos.find(
  { "local.setores.nome": "Pista" }
)

//  Encontrar ingressos com valor acima de R$ 200 (gt - greater than)
db.eventos.find(
  { "ingressos.valor": { $gt: 200 } }
)

// Listar um evento e linkar os dados dos seus artistas
db.eventos.aggregate([
  {
    $match: { "nome": "Festival de Verão" }
  },
  {
    $lookup: {
      from: "artistas",
      localField: "artistas",
      foreignField: "_id",
      as: "artistas_detalhes"
    }
  }
])