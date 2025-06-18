const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const dotenv = require('dotenv');

dotenv.config();

const { readJsonBlob } = require('./utils/blobService');

// Définir EJS comme moteur de rendu
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Route principale
app.get('/', async (req, res) => {
  try {
    const formations = await readJsonBlob('formations.json');
    res.render('index', { formations });
  } catch (err) {
    console.error('Erreur lecture formations:', err.message);
    res.status(500).send('Erreur chargement des formations');
  }
});

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
