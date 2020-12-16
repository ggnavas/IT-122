const path = require('path');
const express = require('express');
const app = express();

const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath)); 
app.set('view engine', 'hbs');

app.get('/', function (req, res) {
  res.render('index', {
    title: "Home",
    name: "Christopher"
  });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});