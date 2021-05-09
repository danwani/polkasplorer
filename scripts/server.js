const express = require('express');
const path = require('path');
const basicAuth = require('express-basic-auth')
const app = express();
const port = process.env.PORT || 3000;

app.use(basicAuth({
  users: {'user': 'polkaforthewin'},
  challenge: true,
}))

app.use(express.static(path.join(__dirname, '../build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => console.log(`Server started on port ${port}`));