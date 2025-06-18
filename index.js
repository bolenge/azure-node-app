const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Définir EJS comme moteur de rendu
app.set('view engine', 'ejs');

// Route principale
app.get('/', (req, res) => {
  res.render('index');
});

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
