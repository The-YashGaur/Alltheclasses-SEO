require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Lead = require('./models/lead');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.post('/api/leads', async (req, res) => {
    try {
        const { fullName, phone, email, examType, currentClass, consentForUpdates } = req.body;
        
        // Basic validation
        if (!fullName || !phone || !examType || !currentClass) {
            return res.status(400).json({ error: 'Full name, phone number, exam type, and current class are required' });
        }

        // Create new lead with all fields
        const lead = new Lead({
            fullName,
            phone,
            email: email || '',
            examType,
            currentClass,
            consentForUpdates: consentForUpdates || false,
            submissionDate: new Date(),
            status: 'new'
        });

        await lead.save();
        res.status(201).json({ message: 'Form submitted successfully!', lead });
    } catch (error) {
        console.error('Error saving lead:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get all leads (for admin purposes)
app.get('/api/leads', async (req, res) => {
    try {
        const leads = await Lead.find().sort({ submissionDate: -1 });
        res.json(leads);
    } catch (error) {
        console.error('Error fetching leads:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
