import { Schema, model, models } from "mongoose";

const DiarySchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  diary: {
    type: String,
    required: [true, "Diary is required."],
  },
  tag: {
    type: String,
    required: [true, "Tag is required."],
  },
});

const Diary = models.Diary || model("Diary", DiarySchema);

export default Diary;
