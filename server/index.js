import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Define a route that listens for GET requests at the root
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Set the server to listen on port 3000
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
