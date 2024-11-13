const mongoose = require('mongoose');

const DBConnection = () => {
  mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB Connection Failed:', err));
};

module.exports = DBConnection;

