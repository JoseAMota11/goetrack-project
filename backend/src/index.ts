import express from 'express';
import peopleRoutes from './routes/people.route';
import cors from 'cors';

const app = express();
const port = 3000;

// Middlewares
app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);
app.use(express.json());

app.use('/api/v1', peopleRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
