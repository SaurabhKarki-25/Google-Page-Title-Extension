const express = require('express');
const cors = require('cors'); // Import CORS
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const PORT = 5000;

// Enable CORS for all origins (or specify which origins if needed)
app.use(cors());

// Middleware
app.use(bodyParser.json());

// Sequelize init (SQLite for simplicity)
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

// Model
const Profile = sequelize.define('Profile', {
    name: DataTypes.STRING,
    url: DataTypes.STRING,
    about: DataTypes.TEXT,
    bio: DataTypes.TEXT,
    location: DataTypes.STRING,
    follower_count: DataTypes.INTEGER,
    connection_count: DataTypes.INTEGER
});

// Sync DB
sequelize.sync().then(() => console.log("DB Synced"));

// POST API
app.post('/api/profiles', async (req, res) => {
    try {
        const profile = await Profile.create(req.body);
        res.json(profile);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET API (for testing)
app.get('/api/profiles', async (req, res) => {
    const profiles = await Profile.findAll();
    res.json(profiles);
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));