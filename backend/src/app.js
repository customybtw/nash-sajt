const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('./config/env');
const authRoutes = require('./routes/authRoutes');
const contentRoutes = require('./routes/contentRoutes');
const ecommerceRoutes = require('./routes/ecommerceRoutes');
const communicationRoutes = require('./routes/communicationRoutes');
const careerRoutes = require('./routes/careerRoutes');
const blogRoutes = require('./routes/blogRoutes');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(helmet());
app.use(cors({ origin: config.clientOrigin, credentials: true }));
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.json({
    name: 'Nash Sajt API',
    version: '1.0.0',
    status: 'online',
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/ecommerce', ecommerceRoutes);
app.use('/api/communications', communicationRoutes);
app.use('/api/careers', careerRoutes);
app.use('/api/blog', blogRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
