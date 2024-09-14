const express = require('express');
const app = express();
const port = 3000;

let jobs = [];
let currentId = 1;

app.post('/jobs', (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
        return res.status(400).json({ message: 'Title and description are required.' });
    }
    const newJob = { id: currentId++, title, description };
    jobs.push(newJob);
    res.status(201).json(newJob);
});

app.put('/jobs/:id', (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    const job = jobs.find(j => j.id === parseInt(id));
    if (!job) {
        return res.status(404).json({ message: 'Job not found.' });
    }
    if (title) job.title = title;
    if (description) job.description = description;
    res.json(job);
});

app.delete('/jobs/:id', (req, res) => {
    const { id } = req.params;
    const index = jobs.findIndex(j => j.id === parseInt(id));
    if (index === -1) {
        return res.status(404).json({ message: 'Job not found.' });
    }
    jobs.splice(index, 1);
    res.status(204).end();
});

app.get('/jobs', (req, res) => {
    res.json(jobs);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
