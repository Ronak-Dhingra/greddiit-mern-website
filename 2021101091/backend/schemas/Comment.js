import mongoose from "mongoose";

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  post_id: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  text: { type: String, required: true },
  commenter_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;