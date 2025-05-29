const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');

let serviceAccount;

if (process.env.FIREBASE_KEY) {
  // Producción (Render)
  serviceAccount = JSON.parse(process.env.FIREBASE_KEY);
} else {
  // Desarrollo local
  serviceAccount = require('./firebase-key.json');
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const app = express();

app.use(cors());
app.use(express.json());

// Crear nota
app.post('/notas', async (req, res) => {
  const data = req.body;
  const ref = await db.collection('notas').add(data);
  res.send({ id: ref.id });
});

// Leer notas
app.get('/notas', async (req, res) => {
  const snapshot = await db.collection('notas').get();
  const notas = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.send(notas);
});

// Actualizar nota
app.put('/notas/:id', async (req, res) => {
  const id = req.params.id;
  await db.collection('notas').doc(id).update(req.body);
  res.send({ status: 'actualizado' });
});

// Eliminar nota
app.delete('/notas/:id', async (req, res) => {
  const id = req.params.id;
  await db.collection('notas').doc(id).delete();
  res.send({ status: 'eliminado' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
