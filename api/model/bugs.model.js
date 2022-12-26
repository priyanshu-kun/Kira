import mongoose from "mongoose"
const bugSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true
  },
  Type: {
    type: String,
    required: true,
    enum: ['Bug','Task','Improvement','New Feature','Epic']
  },
  Description: {
    type: String,
    required: true
  },
  projectId: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  Reporter: {
    type: String,
    required: true
  },
  Priority: {
    type: String,
    required: true,
    enum: ['Low', 'Medium', 'High','Urgent','Immediate']
  },
  Attachment: Buffer,
  Severity: {
    type: String,
    required: true,
    enum: ['Minor', 'Major', 'Critical','Crash','Tweak']
  },
  Resolve: {
    type: Boolean,
    default: false
  },
  isAssigned: {
    type: Boolean
  },
  Owner: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  ProjectName: {
    type: String,
    required: true
  },
  AssignedTo: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});


export default mongoose.model('Bug', bugSchema,'bugs')
