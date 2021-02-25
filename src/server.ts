import 'reflect-metadata';
import express from 'express';
import './database';

const app = express();

app.get('/users', (req, res) => {
	res.json({ message: 'OK' });
})

app.listen(3333, () => console.log('Server is running'));