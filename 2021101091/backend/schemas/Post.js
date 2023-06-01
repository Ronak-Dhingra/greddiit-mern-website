import mongoose from "mongoose";

const Schema = mongoose.Schema;

const postSchema = new Schema({
  text: { type: String, required: true },
  posted_by_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  posted_in_id: { type: Schema.Types.ObjectId, ref: 'Subgreddiit', required: true },
  upvotes: { type: Number, required: true, default: 0 },
  downvotes: { type: Number, required: true, default: 0 },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ['Present', 'Deleted', 'Reported'], required: true, default: 'Present' },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  saved_by: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

const Post = mongoose.model('Post', postSchema);

export default Post;