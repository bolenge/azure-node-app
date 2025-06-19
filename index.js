const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const dotenv = require('dotenv');

dotenv.config();

const mongoose = require('mongoose');

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('✅ Connecté à MongoDB'))
  .catch(err => console.error('❌ Erreur MongoDB :', err));

//const { readJsonBlob } = require('./utils/blobService');

// Définir EJS comme moteur de rendu
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Route principale
app.get('/', async (req, res) => {
  res.render('index');
});

app.get('/formations', async (req, res) => {
  try {
    //const formations = await readJsonBlob('formations.json');

    const Formation = require('./models/Formation');
    const formations = await Formation.find({});

    res.render('formations', { formations });
  } catch (err) {
    console.error('Erreur lecture formations:', err.message);

    res.status(500).send('Erreur chargement des formations');
  }
});

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
