const mongoose = require("mongoose");
// const Schema = mongoose.Schema;


const UserSchema = new mongoose.Schema({
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  email: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
  password: { type: String },
  token: { type: String },
  roles: {
    admin: {
      type: Boolean,
      default: false
    },
    staff: {
      type: Boolean,
      default: false
    }
 }
});

UserSchema
.virtual('name')
.get( function() {
// To avoid errors in cases where an author does not have either a family name or first name
// We want to make sure we handle the exception by returning an empty string for that case
  var fullname = 'No Fullname';
  if (this.first_name && this.last_name) {
    fullname = this.last_name + ', ' + this.first_name
  }
  if (this.first_name && !this.last_name) {
    fullname = this.first_name;
  }
  if (!this.first_name && this.last_name) {
    fullname = this.last_name;
  }
  return fullname;
});

UserSchema
.virtual('url')
.get(function (){
  return '/users/' + this._id;
})

UserSchema.virtual('todos', {
  ref: 'Todos', //The Model to use
  localField: '_id', //Find in Model, where localField 
  foreignField: 'user', // is equal to foreignField
});

// Set Object and Json property to true. Default is set to false
UserSchema.set('toObject', { virtuals: true });
UserSchema.set('toJSON', { virtuals: true });


module.exports = mongoose.model("Users", UserSchema);