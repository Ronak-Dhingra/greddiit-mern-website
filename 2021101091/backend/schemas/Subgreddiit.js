import mongoose from "mongoose";

const Schema = mongoose.Schema;

const subgreddiitSchema = new Schema({
  name: { type: String, required: true, trim: true  },
  description: { type: String, required: true, trim: true  },
  moderator_id: { type: Schema.Types.ObjectId, ref: 'User', required: true, trim: true },
  date_created: { type: Date, default: Date.now, required: true, trim: true  },
  tags: [{ type: String }],
  banned_words: [{ type: String }],
  users: [{
    status: { type: String, enum: ['Blocked', 'Requested', 'Joined', 'Moderator', 'Banned'], default: 'Requested' },
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date }
  }],
  posts: [{
    post_id: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
    date: { type: Date },
    status: { type: String, enum: ['Present', 'Deleted', 'Reported'], default: 'Present' }
  }],
  reports: [{
    report_id: { type: Schema.Types.ObjectId, ref: 'Report' },
  }]
});

const Subgreddiit = mongoose.model('Subgreddiit', subgreddiitSchema);

export default Subgreddiit;