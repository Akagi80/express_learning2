const express = require('express');
const { v4: uuidv4 } = require('uuid'); // losuje id
const cors = require('cors');

const app = express();
//Middleware
// app.use(express.static(path.join(__dirname, '/public'))); // dodaje dostęp do plików z kat. /public
app.use(express.urlencoded({ extended: false })); // umożliwia obsługę formularzy x-www-form-urlencoded (Postman)
app.use(express.json()); // umożliwia odbieranie danych w formacie JSON (mogą być wysyłane za pomocą form-data)
app.use(cors()) // wymaga instalacji - odblokowuje wszystkie połączenia lub je ogranicza do wybranych (np a konkretnej domeny albo publicznych API - z każdej domeny)

//Tablica imitująca
const db = [
  { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
  { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
];

// zwraca całą zawartość tablicy
app.get('/testimonials', (req, res) => {
  res.json(db);  
});

// zwracamy tylko jeden element tablicy, zgodny z :id
app.get('/testimonials/:id', (req, res) => {
  res.json(db[`${req.params.id}`]);
});

// zwracamy losowy element z tablicy
app.get('/testimonials/random', (req, res) => {
  const randomID = Math.floor(Math.random() * db.length); // losuje pozycje z tablicy
  res.json(db[randomID]);
  // res.json(db[Math.floor(Math.random() * db.length)]);
});

// dodajemy nowy element do tablicy. Możesz założyć, że body przekazywane przez klienta będzie obiektem z dwoma atrybutami author i text. Id dodawanego elementu musisz losować (uuivd4).
app.post('/testimonials', (req, res) => {
  const data = {
    id: uuidv4(), // kozystamy z losowego id
    author: req.body.author,
    text: req.body.text,
  }
  db.push(data);
  res.json({message: 'OK'});
});

// modyfikujemy atrybuty author i text elementu tablicy o pasującym :id. Załóż, że body otrzymane w requeście będzie obiektem z atrybutami author i text.
app.put('/testimonials/:id', (req, res) => {
  db[req.params.id].author = req.body.author;
  db[req.params.id].text = req.body.text;
  res.json({message: 'OK'});
});

// usuwamy z tablicy wpis o podanym id.
app.delete('/testimonials/:id', (req, res) => {
  db.splice(`${req.params.id}`, 1);
  res.json({message: 'OK'});
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});