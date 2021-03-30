const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const TaskSchema = new Schema({
    topic: {
      type: Schema.Types.ObjectId,
      ref: 'topics'
    },
    title: {
      type: String,
      required: true
    },
    tasks: [
      {
        title: {
          type: String,
        }
      }
    ]
  },
  {
    timestamps: true,
  }
);

module.exports = Task = mongoose.model('tasks', TaskSchema);