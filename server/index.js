const express = require('express');
const { Level } = require('level');
const cors = require('cors');
const path = require('path');

const app = express();
const db = new Level(path.join(__dirname, '../taskdb'), { valueEncoding: 'json' });

app.use(cors());
app.use(express.json());

app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = [];
    for await (const [key, value] of db.iterator()) {
      tasks.push({ id: key, ...value });
    }
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des tâches' });
  }
});

app.post('/api/tasks', async (req, res) => {
  try {
    if (!req.body.title || typeof req.body.title !== 'string') {
      return res.status(400).json({ error: 'Titre invalide' });
    }
    const id = Date.now().toString();
    const task = { ...req.body, id };
    await db.put(id, task);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création de la tâche' });
  }
});

app.put('/api/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const task = { ...req.body, id };
    await db.put(id, task);
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour de la tâche' });
  }
});

app.delete('/api/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params; // Récupère l'ID depuis les paramètres de l'URL
    if (!id) {
      return res.status(400).json({ error: 'ID de tâche manquant.' });
    }
    await db.del(id); // Supprime la tâche dans la base de données
    res.status(204).send(); // Succès : Pas de contenu
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression de la tâche.' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});