import PrismaClient from "prisma/Client"
const express = require('express');  // Importer Express
const app = express();  // Créer une application Express

const PORT = 8080;  // Définir le port du serveur

// Route d'exemple
app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
app.use(express.json());

// 📌 1️⃣ Récupérer tous les étudiants
app.get("/etudiants", async (req, res) => {
  const etudiants = await prisma.etudiant.findMany();
  res.json(etudiants);
});

// 📌 2️⃣ Récupérer un étudiant par ID
app.get("/etudiants/:id", async (req, res) => {
  const { id } = req.params;
  const etudiant = await prisma.etudiant.findUnique({ where: { id: Number(id) } });
  
  if (!etudiant) return res.status(404).json({ message: "Étudiant non trouvé" });
  res.json(etudiant);
});

// 📌 3️⃣ Ajouter un nouvel étudiant
app.post("/etudiants", async (req, res) => {
  const { nom, prenom, age, classe, numero } = req.body;
  try {
    const newEtudiant = await prisma.etudiant.create({ data: { nom, prenom, age, classe, numero} });
    res.status(201).json(newEtudiant);
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la création" });
  }
});

// 📌 4️⃣ Modifier un étudiant
app.put("/etudiants/:id", async (req, res) => {
  const { id } = req.params;
  const { nom, prenom, age, classe, numero } = req.body;
  
  try {
    const updatedEtudiant = await prisma.etudiant.update({
      where: { id: Number(id) },
      data: { nom, prenom, age, classe, numero}
    });
    res.json(updatedEtudiant);
  } catch (error) {
    res.status(404).json({ message: "Étudiant non trouvé" });
  }
});

// 📌 5️⃣ Supprimer un étudiant
app.delete("/etudiants/:id", async (req, res) => {
  const { id } = req.params;
  
  try {
    await prisma.etudiant.delete({ where: { id: Number(id) } });
    res.json({ message: "Étudiant supprimé" });
  } catch (error) {
    res.status(404).json({ message: "Étudiant non trouvé" });
  }
});

// 📌 Lancer le serveur
app.listen(PORT, () => console.log("🚀 Serveur sur http://localhost:8080"));
