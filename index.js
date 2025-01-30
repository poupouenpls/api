// importation du module express

const express = require('express')
const app = express()

// acceder facilement aux donnees, on doit utiliser l'analyseur json express

app.use(express.json())

// declaration de l'objet produits

let produits = [
    { 
      "id": "1",
      "name": "the vert matcha", 
      "prix": "11.99",
      "quantite": "10"
    },
    {
      "id": "2",
      "name": "the rouge matcha", 
      "prix": "22.99",
      "quantite": "10"
    },
    {
      "id": "3",
      "name": "the jaune matcha", 
      "prix": "33.99",
      "quantite": "10"
    }
]

// recuperer une ressource

app.get('/produits', (request, response) => {
  response.status(200).json(produits) // on lui demande d'afficher l'objet produits dans un format json
  // status 200 indique que le status a marche
})

// ajouter une ressource

app.post('/produits', (request, response) => {
  const { name, prix, quantite } = request.body // on lui demande de recuperer les parametres certaines parametres

  // on genere un ID, on prend la longueur du tableau + 1 et on le converti en chaine de caractere
  const newID = (produits.length + 1).toString()

  // on cree un nouveau produit avec certains parametres
  const newProduit = {
    id: newID,
    name,
    prix,
    quantite
  }

  produits.push(newProduit) // on lui demande d'ajouter la variable newproduit a l'objet produits

  response.status(201).json(newProduit) // status du code qui indique que la requete a marcher
})

// mettre a jour une ressource

app.put('/produits/:id', (request, response) => {
  const id = request.params.id // on definit le parametre id de la requete dans une variable ID
  const { name, prix, quantite } = request.body // acceder a certaines donnees avec la propriete body

  // on lui demande de trouver la note dont l'identifiant correspond au parametre
  const produitID = produits.findIndex(produit => produit.id === id)

  // on creer un nouvelle objet avec les nouvelles valeurs 
  produits[produitID] = { id, name, prix, quantite }

  // on affiche une reponse au format json
  response.status(200).json(produits[produitID]) // status 200 indique que le status a marche
})

// supprimer une ressource

app.delete('/produits/:id', (request, response) => {
  const id = request.params.id // on definit le parametre id de la requete dans une variable ID

  // on creer un nouveau tableau sans l'id en question
  produits = produits.filter(produit => produit.id !== id)

  // si la note existe et est supprimee, on repond avec le code 204 no content et on renvoie aucune donnee avec la reponse
  response.status(204).end()
})

// requete get a la racine du serveur, petite suprise :)

app.get('/', (request, response) => {
  response.status(200).redirect('https://youtu.be/oHg5SJYRHA0?si=nt4JqQZPlDgAa69r')
  // status 200 indique que le status a marche
})

// connexion a l'application avec le port 3001

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})