import mongoose from "mongoose";

const Schema = mongoose.Schema;

const reportSchema = new Schema({
  reported_by_id: { type: Schema.Types.ObjectId, ref: 'User', required: true  },
  reported_user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true  },
  concern: { type: String, required: true },
  subgreddiit_id: { type: Schema.Types.ObjectId, ref: 'Subgreddiit', required: true },
  post_id: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ['Default', 'Ignored', 'Blocked'], required: true, default: 'Default' }
});

const Report = mongoose.model('Report', reportSchema);

export default Report;