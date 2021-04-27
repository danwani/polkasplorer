const express = require('express');
const path = require('path');
const basicAuth = require('express-basic-auth')
const app = express();

app.use(basicAuth({
  users: {'admin': 'acalaforthewin'},
  challenge: true,
}))

app.use(express.static(path.join(__dirname, '../build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(3000, () => console.log('Server started on port 3000'));