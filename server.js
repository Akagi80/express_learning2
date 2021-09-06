const express = require('express');
const { v4: uuidv4 } = require('uuid'); // losuje id
const cors = require('cors');
const db = require('./db');

// import routers
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

const app = express();

//Middleware
// app.use(express.static(path.join(__dirname, '/public'))); // dodaje dostęp do plików z kat. /public
app.use(express.urlencoded({ extended: false })); // umożliwia obsługę formularzy x-www-form-urlencoded (Postman)
app.use(express.json()); // umożliwia odbieranie danych w formacie JSON (mogą być wysyłane za pomocą form-data)
app.use(cors()) // wymaga instalacji - odblokowuje wszystkie połączenia lub je ogranicza do wybranych (np a konkretnej domeny albo publicznych API - z każdej domeny)

// używamy "/api" do zaimportowanych routers 
app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);

app.use((req, res) => {
  res.status(404).send('404 not found...');
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});