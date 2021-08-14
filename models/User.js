const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema({
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      match: [/.+\@.+\..+/, 'Please enter a valid email address!']
    },
    thoughts: [
        { 
            type: Schema.Types.ObjectId, 
            ref: 'Thought'
        }
    ],    
    friends: [
        { 
            type: Schema.Types.ObjectId, 
            ref: 'User'
        }
    ] 
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
  );


// create the User model using the UserSchema
const User = model('User', UserSchema);

// get total count of friends
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

// export the User model
module.exports = User;