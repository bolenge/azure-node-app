require('dotenv').config();

const mongoose = require('mongoose');
const { readJsonBlob } = require('./utils/blobService');
const Formation = require('./models/Formation');

(async () => {
  try {
    // Connexion MongoDB
    await mongoose.connect(process.env.MONGO_URI);
      
    console.log('✅ Connecté à MongoDB');

    // Lire depuis Azure Blob Storage
    const formationsData = await readJsonBlob('formations.json');
    console.log(`📦 ${formationsData.length} formations récupérées depuis Azure Blob`);

    // Réinitialiser et insérer
    await Formation.deleteMany();
    await Formation.insertMany(formationsData);

    console.log('🌱 Données formations importées avec succès !');
    process.exit();
  } catch (err) {
    console.error('❌ Erreur seed script:', err);
    process.exit(1);
  }
})();