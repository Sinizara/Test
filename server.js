const express = require('express');  // Importer Express
const app = express();  // Créer une application Express

const PORT = 8080;  // Définir le port du serveur

// Route d'exemple
app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});

