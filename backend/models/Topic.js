const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const TopicSchema = new Schema({
    title: {
      type: String,
      required: true
    },
    tasks: [
      {
        title: {
          type: String
        },
        text: {
          type: String
        },
        events: [
          {
            text: {
              type: String
            }
          }
        ],
        tasks: [
          {
            type: {
              type: String
            },
            text: {
              type: String
            },
            rows: [
              {
                ssz: {
                  type: String
                },
                megnevezes: {
                  type: String
                },
                tartozik: {
                  type: String
                },
                kovetel: {
                  type: String
                },
                amount: {
                  type: String
                },
              }
            ]
          }
        ]
      }
    ]
  },
  {
    timestamps: true,
  }
);

module.exports = Topic = mongoose.model('topics', TopicSchema);
