const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();

app.use(bodyParser.json());
app.use(express.static('public')); // Per servire file statici (es. CSS, JS, immagini)
app.use(express.urlencoded({ extended: true })); // Per richieste con dati codificati in URL

// Connettersi a MongoDB
console.log('Tentativo di connessione a MongoDB...');
mongoose.connect('mongodb://127.0.0.1:27017/unieat')
    .then(() => console.log('Connesso a MongoDB'))
    .catch(err => {
        console.error('Errore di connessione:', err.message);
        process.exit(1); // Termina il server in caso di errore critico
    });

// Schema e modello MongoDB
const userSchema = new mongoose.Schema({
    username: String,
    email: { type: String, unique: true },
    password: String
});

const User = mongoose.model('User', userSchema);

// Registrazione
app.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });
        await newUser.save();
        res.status(201).json({ message: 'Registrazione completata!' });
    } catch (error) {
        console.error('Errore nella registrazione:', error); // Log più dettagliato sul server
        res.status(400).json({ message: 'Errore nella registrazione', error: error.message });
    }
});


// Login
app.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ message: 'Utente non trovato' });

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: 'Password errata' });

    const token = jwt.sign({ id: user._id }, 'secret_key', { expiresIn: '1h' });
    res.json({ message: 'Login effettuato', token });
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/Untitled-1.html');
});

app.get('/home', (req, res) => {
    res.sendFile(__dirname + '/public/home.html');
});


// Avvia il server
app.listen(3000, () => console.log('Server avviato su http://localhost:3000'));
