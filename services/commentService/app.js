import express from 'express';
import commentRouter from './routes/commentRoutes.js';

const app = express();

app.use(express.json());

app.use('/healthCheck', (req, res) => {
  res.send('Comment service is up and running');
});

app.use('/comments', commentRouter);

export default app;
