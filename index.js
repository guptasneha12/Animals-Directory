const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Mock animal data
let animals = [
    { id: 1, name: 'Elephant', type: 'Mammal' },
    { id: 2, name: 'Shark', type: 'Fish' },
    { id: 3, name: 'Eagle', type: 'Bird' }
];

// GET: Retrieve all animals
app.get('/animals', (req, res) => {
    res.json(animals);
});

// POST: Add a new animal
app.post('/animals', (req, res) => {
    const { name, type } = req.body;
    const newAnimal = { id: animals.length + 1, name, type };
    animals.push(newAnimal);
    res.status(201).json(newAnimal);
});

// PUT: Update an existing animal
app.put('/animals/:id', (req, res) => {
    const { id } = req.params;
    const { name, type } = req.body;
    const animal = animals.find(a => a.id === parseInt(id));

    if (animal) {
        animal.name = name;
        animal.type = type;
        res.json(animal);
    } else {
        res.status(404).json({ message: 'Animal not found' });
    }
});

// DELETE: Remove an animal
app.delete('/animals/:id', (req, res) => {
    const { id } = req.params;
    animals = animals.filter(a => a.id !== parseInt(id));
    res.json({ message: 'Animal deleted' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
