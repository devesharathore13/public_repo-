const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello from Backend!');
});

app.listen(port, () => {
  console.log(`Backend is listening at http://localhost:${port}`);
});
