import express from 'express';
import cors from 'cors';

import routes from './routes/index.js';
const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.use(express.json());
app.use('/', routes);
app.listen(3030, () => console.log('Server ready at port 3030'));
