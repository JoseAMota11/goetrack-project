import express from 'express';
import peopleRoutes from './routes/people.route';

const app = express();
const port = 3000;

// Middlewares
app.use(express.json());

app.use('/api/v1', peopleRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
