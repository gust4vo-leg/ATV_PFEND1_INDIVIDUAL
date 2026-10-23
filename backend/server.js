import app from './app.js'; 
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
    console.log(`Server rodando na porta http://localhost:${PORT}`);
});
