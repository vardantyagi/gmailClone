import mongoose, { Schema } from "mongoose";

const emailSchema = new Schema({
  to:{
    type: 'String',
    required: true
  },
  subject:{
    type: 'String',
    required: true
  },
  message:{
    type: 'String',
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
},{timestamps: true});

const Email = mongoose.model('Email',emailSchema);

export default Email;