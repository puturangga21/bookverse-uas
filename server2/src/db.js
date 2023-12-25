const mongoose = require('mongoose');

const connect = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://Puturangga21:Puturangga2004@cluster-bookverse.zhfxd94.mongodb.net/bookverse?retryWrites=true&w=majority'
    );
    console.log('Connected to MongoDB 🐲');
  } catch (error) {
    console.log(error);
  }
};

module.exports = connect;
