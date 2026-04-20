require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection
let db;
const mongoUri = process.env.MONGODB_URI;

MongoClient.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    console.log('✓ Connected to MongoDB Atlas');
    db = client.db('pranav_portfolio');
  })
  .catch(err => {
    console.error('✗ MongoDB Connection Error:', err);
    process.exit(1);
  });

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Pranav Navghare Portfolio API is running!' });
});

// Submit Contact Form
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Insert into MongoDB
    const contactsCollection = db.collection('contacts');
    const result = await contactsCollection.insertOne({
      name,
      email,
      message,
      createdAt: new Date(),
      ipAddress: req.ip,
    });

    res.status(201).json({
      success: true,
      message: 'Message received! I will get back to you soon.',
      id: result.insertedId,
    });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({ error: 'Failed to save message' });
  }
});

// Get All Contacts (Admin - optional authentication can be added)
app.get('/api/contacts', async (req, res) => {
  try {
    const contactsCollection = db.collection('contacts');
    const contacts = await contactsCollection.find({}).toArray();
    res.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🎮 Server running on http://localhost:${PORT}`);
});
