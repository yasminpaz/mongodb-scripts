db.clientes.updateOne(
   { "_id": ObjectId("686c657b1298aa1b690cc3bb") },
   { $set: { "email": "novo_email_da_yasmin@email.com" } }
)

db.clientes.updateOne(
   { "_id": ObjectId("686c657b1298aa1b690cc3bb"), "vendas.data": ISODate("2025-07-07T00:00:00.000Z") },
   { $set: { "vendas.$.status_pagamento": "Pendente" } }
)

db.clientes.updateOne(
   { "_id": ObjectId("686c657b1298aa1b690cc3bb") },
   {
     $push: {
       "vendas": {
         "data": new Date(),
         "total": 450,
         "status_pagamento": "Aguardando Pagamento",
         "itens": [
           { "ingresso_id": ObjectId(), "valor": 450 }
         ]
       }
     }
   }
)

db.clientes.updateOne(
   { "_id": ObjectId("686c657b1298aa1b690cc3bb") },
   {
     $pull: {
       "vendas": { "status_pagamento": "Pendente" }
     }
   }
)