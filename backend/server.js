const express = require('express');
const cors = require('cors');
const app = express();

// aktiverer cors og json-parsing
app.use(cors());
app.use(express.json());

// håndtering av autentisering
const authRoutes = require('./routes/auth'); // backend router
app.use('/auth', authRoutes); // ruten backend of frontend kommuniserer via

// håndtering av spotify api for å hente bruker info
// const webRoutes = require('./routes/webAPI'); // backend router
// app.use('/spotify-api', webRoutes);


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server kjører på http://localhost:${PORT}`);
});