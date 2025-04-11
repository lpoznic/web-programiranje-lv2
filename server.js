const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static('public')); // "posluzuje" index.html

// Automatski koristi sve iz mape public
app.get('/', (req, res) => {
    res.send("Ili obican tekst ako nema HTML datoteke.");
});

app.listen(PORT, () => {
    console.log("Server pokrenut na portu ${PORT}");
});