import express from 'express';
import userRouter from './routes/userRoutes.js';

const app = express();

app.use(express.json());

app.use('/healthCheck', (req, res) => {
  res.send('User service is up and running');
});

app.use('/', userRouter);

export default app;
