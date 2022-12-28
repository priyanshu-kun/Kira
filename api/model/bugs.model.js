import mongoose from "mongoose"
const bugSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true
    // done
  },
  Type: {
    type: String,
    required: true,
    enum: ['Bug','Task','Improvement','New Feature','Epic']
    // done
  },
  Description: {
    type: String,
    required: true
    // done
  },
  ProjectId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Project"
  },
  Priority: {
    type: String,
    required: true,
    enum: ['Low', 'Medium', 'High','Urgent','Immediate'],
    // done
  },
  Attachment: Buffer,
  Severity: {
    type: String,
    required: true,
    enum: ['Minor', 'Major', 'Critical','Crash','Tweak']
    // done
  },
  Profile: {
    type: {
      Platform: "",
      OS: "",
      Version: ""
    }
    // done
  },
  isResolve: {
    type: Boolean,
    default: true
  },
  isAssigned: {
    type: Boolean,
    default: false
  },
  Reporter: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  ReporterName: {
    type: String,
    required: true
    // done
  },
  ProjectName: {
    type: String,
    required: true
    // done
  },
  AssignedTo: String,
  // done
  createdAt: {
    type: Date,
    default: Date.now
  }
});



export default mongoose.model('Bug', bugSchema,'bugs')