import express from 'express';
import blogRouter from './routes/blogRoutes.js';

const app = express();

app.use(express.json());

app.use('/healthCheck', (req, res) => {
  res.send('Blog service is up and running');
});

app.use('/blogs', blogRouter);

export default app;
