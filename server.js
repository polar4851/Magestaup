const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const TASKS_FILE = path.join(__dirname, 'tasks.json');

// Middleware para entender JSON e servir os arquivos estáticos (html, css, js do cliente)
app.use(express.json());
app.use(express.static(__dirname));

// ROTA PARA OBTER AS TAREFAS
app.get('/api/tasks', (req, res) => {
    fs.readFile(TASKS_FILE, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao ler o arquivo de tarefas.');
        }
        res.json(JSON.parse(data));
    });
});

// ROTA PARA SALVAR AS TAREFAS
app.post('/api/tasks', (req, res) => {
    const tasks = req.body;
    fs.writeFile(TASKS_FILE, JSON.stringify(tasks, null, 2), (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao salvar o arquivo de tarefas.');
        }
        res.status(200).send('Tarefas salvas com sucesso.');
    });
});

app.listen(PORT, () => {
    console.log(`Servidor Magestá rodando em http://localhost:${PORT}`);
});
