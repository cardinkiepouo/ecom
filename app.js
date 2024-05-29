const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const port = 3002; // Changez le port si nécessaire

// Middleware pour parser les données des formulaires
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/submit', (req, res) => {
    const productName = req.body.product_name;
    const price = parseFloat(req.body.price);
    const quantity = parseInt(req.body.quantity, 10);
    const total = price * quantity;

    console.log('Nom du produit:', productName);
    console.log('Prix:', price);
    console.log('Quantité:', quantity);
    console.log('Total:', total);

    // Envoyer les données au serveur Python
    axios.post('http://localhost:3002/receive', {
        product_name: productName,
        price: price,
        quantity: quantity,
        total: total
    })
        .then(response => {
            console.log('Réponse du serveur Python:', response.data);
            res.send(`
            <h1>Les informations du formulaire ont été reçues !</h1>
            <p>Nom du produit: ${productName}</p>
            <p>Prix: ${price}</p>
            <p>Quantité: ${quantity}</p>
            <p>Total: ${total}</p>
            <p>Réponse du serveur Python: ${response.data.message}</p>
        `);
        })
        .catch(error => {
            console.error('Erreur lors de l\'envoi des données au serveur Python:', error);
            res.status(500).send('Erreur lors de l\'envoi des données au serveur Python');
        });
});

app.listen(port, () => {
    console.log(`Serveur en écoute sur http://localhost:${5000}`);
});
// serveur.js