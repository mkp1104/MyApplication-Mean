var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FormDataSchema = new Schema({
  candidatename: { type: String, required: true },
  comments: { type: String, required: true },
  date: { type: Date, required: true },
  interviewername: { type: String, required: true },
  practiceArea: { type: String, required: true },
  projectname: { type: String, required: true },
  requester: { type: String, required: true },
  skillsReff1: [{interviewrating:{type:String,required:true},jrssrating:{type:String,required:true},name:{type:String,required:true}}],
  skillsReff2: [{interviewrating:{type:String,required:true},jrssrating:{type:String,required:true},name:{type:String,required:true}}]
});

module.exports = mongoose.model('MyApplicationData', FormDataSchema);