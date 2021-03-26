const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const TopicSchema = new Schema({
    title: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

module.exports = Admin = mongoose.model('topics', TopicSchema);
