import express from 'express';
import cors from 'cors';
import noticiasRoutes from './routes/noticiasRoutes.js'; 

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/noticias', noticiasRoutes);

app.get('/', (req, res) => {
    res.send('API do site de notícias rodando com sucesso com ES Modules! ');
});

export default app;
