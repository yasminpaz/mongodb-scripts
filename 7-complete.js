// Cria novos artistas:
db.artistas.insertMany([
  {
    "_id": ObjectId("507f1f77bcf86cd799439011"),
    "nome": "Anitta",
    "genero": "Pop",
    "nacionalidade": "Brasileira",
    "classe": "A"
  },
  {
    "_id": ObjectId("507f1f77bcf86cd799439012"),
    "nome": "Justin Bieber",
    "genero": "Pop",
    "nacionalidade": "Canadense",
    "classe": "A"
  },
  {
    "_id": ObjectId("507f1f77bcf86cd799439013"),
    "nome": "Drake",
    "genero": "Hip Hop",
    "nacionalidade": "Canadense",
    "classe": "A"
  },
  {
    "_id": ObjectId("507f1f77bcf86cd799439014"),
    "nome": "Beyoncé",
    "genero": "R&B",
    "nacionalidade": "Americana (EUA)",
    "classe": "A"
  }
]);

// Cria um evento com 10 ingressos:
db.eventos.insertOne({
  "_id": ObjectId("607f1f77bcf86cd799439021"),
  "nome": "Super Festival Internacional",
  "tipo": "Festival",
  "data": new Date("2025-03-20T00:00:00Z"),
  "classe": "A+",
  "modelo_distribuicao": "Livre",
  "artistas": [
    ObjectId("686c64c45790daeb59dc70a6"),
    ObjectId("686c64c45790daeb59dc70a7"),
    ObjectId("507f1f77bcf86cd799439011"),
    ObjectId("507f1f77bcf86cd799439014")
  ],
  "local": {
    "nome": "Allianz Parque",
    "endereco": "São Paulo - SP",
    "setores": [
      {
        "nome": "Pista Premium",
        "capacidade": 5000
      },
      {
        "nome": "Cadeiras",
        "capacidade": 10000
      }
    ]
  },
  "ingressos": [
    { "_id": ObjectId("607f1f77bcf86cd799439031"), "tipo": "VIP", "setor": "Pista Premium", "valor": 500, "vendido": false },
    { "_id": ObjectId("607f1f77bcf86cd799439032"), "tipo": "VIP", "setor": "Pista Premium", "valor": 500, "vendido": false },
    { "_id": ObjectId("607f1f77bcf86cd799439033"), "tipo": "Inteira", "setor": "Pista Premium", "valor": 350, "vendido": false },
    { "_id": ObjectId("607f1f77bcf86cd799439034"), "tipo": "Inteira", "setor": "Pista Premium", "valor": 350, "vendido": false },
    { "_id": ObjectId("607f1f77bcf86cd799439035"), "tipo": "Meia", "setor": "Pista Premium", "valor": 175, "vendido": false },
    { "_id": ObjectId("607f1f77bcf86cd799439036"), "tipo": "VIP", "setor": "Cadeiras", "valor": 400, "vendido": false },
    { "_id": ObjectId("607f1f77bcf86cd799439037"), "tipo": "VIP", "setor": "Cadeiras", "valor": 400, "vendido": false },
    { "_id": ObjectId("607f1f77bcf86cd799439038"), "tipo": "Inteira", "setor": "Cadeiras", "valor": 250, "vendido": false },
    { "_id": ObjectId("607f1f77bcf86cd799439039"), "tipo": "Inteira", "setor": "Cadeiras", "valor": 250, "vendido": false },
    { "_id": ObjectId("607f1f77bcf86cd79943903a"), "tipo": "Meia", "setor": "Cadeiras", "valor": 125, "vendido": false }
  ]
});

// Cria novos clientes:
db.clientes.insertMany([
  {
    "_id": ObjectId("707f1f77bcf86cd799439041"),
    "nome": "Maria Silva",
    "cpf": "111.222.333-44",
    "email": "maria@email.com",
    "data_nasc": "1990-05-15",
    "telefone": "(11) 99999-8888",
    "vendas": []
  },
  {
    "_id": ObjectId("707f1f77bcf86cd799439042"),
    "nome": "João Oliveira",
    "cpf": "555.666.777-88",
    "email": "joao@email.com",
    "data_nasc": "1985-10-20",
    "telefone": "(11) 98888-7777",
    "vendas": []
  }
]);

// Vende 3 ingressos para Maria e 2 para João:
function venderIngresso(clienteId, eventoId, ingressoId) {
  db.eventos.updateOne(
    { "_id": ObjectId(eventoId), "ingressos._id": ObjectId(ingressoId) },
    { $set: { "ingressos.$.vendido": true } }
  );
  
  const evento = db.eventos.findOne({ "_id": ObjectId(eventoId) });
  const ingresso = evento.ingressos.find(i => i._id.equals(ObjectId(ingressoId)));
  
  db.clientes.updateOne(
    { "_id": ObjectId(clienteId) },
    {
      $push: {
        "vendas": {
          "data": new Date(),
          "total": ingresso.valor,
          "status_pagamento": "Pago",
          "itens": [{
            "ingresso_id": ObjectId(ingressoId),
            "valor": ingresso.valor
          }]
        }
      }
    }
  );
}

venderIngresso(
  "707f1f77bcf86cd799439041",
  "607f1f77bcf86cd799439021",
  "607f1f77bcf86cd799439031"
);

venderIngresso(
  "707f1f77bcf86cd799439041",
  "607f1f77bcf86cd799439021",
  "607f1f77bcf86cd799439033"
);

venderIngresso(
  "707f1f77bcf86cd799439041",
  "607f1f77bcf86cd799439021",
  "607f1f77bcf86cd799439036"
);

venderIngresso(
  "707f1f77bcf86cd799439042",
  "607f1f77bcf86cd799439021",
  "607f1f77bcf86cd799439032"
);

venderIngresso(
  "707f1f77bcf86cd799439042",
  "607f1f77bcf86cd799439021",
  "607f1f77bcf86cd799439038"
);


// Consultar o evento com ingressos vendidos
db.eventos.findOne(
  { "_id": ObjectId("607f1f77bcf86cd799439021") },
  {
    "nome": 1,
    "data": 1,
    "ingressos": {
      $filter: {
        input: "$ingressos",
        as: "ingresso",
        cond: { $eq: ["$$ingresso.vendido", true] }
      }
    }
  }
);


// Consultar clientes que compraram os ingressos:
db.clientes.aggregate([
  { $match: { 
    $or: [
      { "_id": ObjectId("707f1f77bcf86cd799439041") },
      { "_id": ObjectId("707f1f77bcf86cd799439042") }
    ]
  }},
  { $unwind: "$vendas" },
  { $unwind: "$vendas.itens" },
  {
    $lookup: {
      from: "eventos",
      localField: "vendas.itens.ingresso_id",
      foreignField: "ingressos._id",
      as: "evento_info"
    }
  },
  { $unwind: "$evento_info" },
  {
    $project: {
      "cliente": "$nome",
      "data_compra": "$vendas.data",
      "valor": "$vendas.itens.valor",
      "evento": "$evento_info.nome",
      "data_evento": "$evento_info.data",
      "ingresso": {
        $arrayElemAt: [
          {
            $filter: {
              input: "$evento_info.ingressos",
              as: "ingresso",
              cond: { $eq: ["$$ingresso._id", "$vendas.itens.ingresso_id"] }
            }
          },
          0
        ]
      }
    }
  },
  {
    $project: {
      "cliente": 1,
      "evento": 1,
      "data_evento": 1,
      "data_compra": 1,
      "tipo_ingresso": "$ingresso.tipo",
      "setor": "$ingresso.setor",
      "valor": 1
    }
  }
]);


// Artistas do evento:
db.eventos.aggregate([
  { $match: { "_id": ObjectId("607f1f77bcf86cd799439021") } },
  { $unwind: "$artistas" },
  {
    $lookup: {
      from: "artistas",
      localField: "artistas",
      foreignField: "_id",
      as: "artista_info"
    }
  },
  { $unwind: "$artista_info" },
  {
    $project: {
      "evento": "$nome",
      "artista": "$artista_info.nome",
      "genero": "$artista_info.genero",
      "nacionalidade": "$artista_info.nacionalidade"
    }
  }
]);


// Resume as vendas de ingresso do evento:
db.eventos.aggregate([
  { $match: { "_id": ObjectId("607f1f77bcf86cd799439021") } },
  { $unwind: "$ingressos" },
  {
    $group: {
      _id: {
        evento: "$nome",
        status: "$ingressos.vendido"
      },
      total: { $sum: 1 },
      valor_total: { $sum: "$ingressos.valor" }
    }
  },
  {
    $project: {
      "evento": "$_id.evento",
      "status": {
        $cond: {
          if: "$_id.status",
          then: "Vendido",
          else: "Disponível"
        }
      },
      "total": 1,
      "valor_total": 1,
      "_id": 0
    }
  }
]);