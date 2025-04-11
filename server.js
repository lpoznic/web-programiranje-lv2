const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const imagesFolder = path.join(__dirname, 'public', 'images');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/galerija', (req, res) => {
    fs.readdir(imagesFolder, (err, files) => {
        if (err) {
            console.error('Error reading images folder:', err);
            return res.status(500).send('Error loading gallery');
        }

        const thumbnails = files.filter(file => /_thumb\.jpg$/.test(file));

        const images = thumbnails.map(thumb => {
            const large = thumb.replace('_thumb', '_large'); 
            if (files.includes(large)) {
                return {
                    thumbnail: `/images/${thumb}`,
                    url: `/images/${large}`,
                    title: thumb.replace('_thumb.jpg', '') 
                };
            }
        }).filter(image => image);

        res.render('galerija', { images });
    });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});