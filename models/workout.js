const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    day: {
      type: Date,
      default: Date.now
    },
    exercises: [
      {
        type: {
          type: String,
          required: "Enter an exercise type"
        },
        name: {
          type: String,
          trim: true,
          required: "Enter an exercise name"
        },
        duration: {
          type: Number,
          required: "Enter an exercise duration in minutes"
        },
        weight: {
          type: Number,
          default: 0
        },
        reps: {
          type: Number,
          default: 0
        },
        sets: {
          type: Number,
          default: 0
        },
        distance: {
          type: Number,
          default: 0
        }
      }
    ]
  },
  {
    toJSON: {
      // include any virtual properties when data is requested
      virtuals: true
    }
  }
);

// adds a dynamically-created property to schema
workoutSchema.virtual("totalDuration").get(function totalDuration() {
  return this.exercises.reduce((total, exercise) => 
    total + exercise.duration, 0);
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
