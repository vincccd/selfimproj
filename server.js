const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/selfimproj';

const dataSchema = new mongoose.Schema({}, { strict: false });
const UserData = mongoose.model('UserData', dataSchema);

app.use(express.json());
app.use(express.static(__dirname));

app.get('/api/data', async (req, res) => {
  try {
    const doc = await UserData.findOne();
    res.json(doc ? doc.toObject() : {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/data', async (req, res) => {
  try {
    await UserData.findOneAndUpdate({}, req.body, { upsert: true, new: true });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

mongoose.connect(MONGODB_URI)
  .then(() => {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
