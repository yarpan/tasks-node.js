const express = require('express');
const fs = require('fs-extra');
const path = require('path');
const app = express();
const PORT = 3000;

const requestLogger = require('./requestLogger');
const filePath = path.join(__dirname, './data/tasks.json');

app.use(requestLogger);
app.use(express.json());
app.use((req, res, next) => {
    const now = new Date().toISOString();
    console.log(`[${now}] ${req.method} ${req.path}`);
    next();
});


const readTasks = async () => {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};


const writeTasks = async (tasks) => {
    await fs.writeFile(filePath, JSON.stringify(tasks, null, 2));
};


const validateTask = (task) => {
    if (!task.title || task.title.length < 3) {
        return 'Title має бути довжиною щонайменше 3 символи';
    }
    const statuses = ['todo', 'in-progress', 'done'];
    if (!statuses.includes(task.status)) {
        return `Status має бути одним із: ${statuses.join(', ')}`;
    }
    return null;
};


// GET /tasks
app.get('/tasks', async (req, res) => {
    const tasks = await readTasks();
    const { status } = req.query;

    if (status) {
        const filteredTasks = tasks.filter((task) => task.status === status);
        return res.json(filteredTasks);
    }

    res.json(tasks);
});


// GET /tasks/sorted
app.get('/tasks/sorted', async (req, res) => {
    const tasks = await readTasks();
    const { by } = req.query;

    if (by === 'createdAt') {
        tasks.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }
    res.json(tasks);
});


// POST /tasks
app.post('/tasks', async (req, res) => {
    const tasks = await readTasks();
    const newTask = { ...req.body, id: tasks.length + 1, createdAt: new Date().toISOString() };

    const error = validateTask(newTask);
    if (error) {
        return res.status(400).json({ error });
    }

    tasks.push(newTask);
    await writeTasks(tasks);
    res.status(201).json(newTask);
});
// REQUEST BODY
// {
//     "title": "Complete the project",
//     "description": "Finalize all the remaining tasks for the project",
//     "status": "todo"
// }


// PATCH /tasks/:id/status
app.patch('/tasks/:id/status', async (req, res) => {
    const tasks = await readTasks();
    const taskId = parseInt(req.params.id, 10);
    const { status } = req.body;

    const task = tasks.find((task) => task.id === taskId);
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }

    if (!['todo', 'in-progress', 'done'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
    }

    task.status = status;
    await writeTasks(tasks);
    res.json(task);
});
// REQUEST BODY
// {
//     "status": "in-progress"
// }


// DELETE /tasks/:id
app.delete('/tasks/:id', async (req, res) => {
    const tasks = await readTasks();
    const taskId = parseInt(req.params.id, 10);

    const index = tasks.findIndex((task) => task.id === taskId);
    if (index === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }

    tasks.splice(index, 1);
    await writeTasks(tasks);
    res.status(204).send();
});


app.listen(PORT, () => {
    console.log(`Сервер працює на http://localhost:${PORT}`);
});
