import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name:{
    type: 'String',
    required: true
  },
  email:{
    type: 'String',
    required: true
  },
  password:{
    type: 'String',
    required: true
  },
  profilePhoto:{
    type: 'String',
    retuired: true
  }
},{timestamps: true});

const User = mongoose.model('User',userSchema);

export default User;

// image: {
//     type: String,

//     default: "https://images.unsplash.com/photo-1575217550311-249515c168e0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

//     set: (v)=>(v) === ""? "https://images.unsplash.com/photo-1575217550311-249515c168e0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D": v,

// },