import { model, Schema } from "mongoose";

const FreeQuestionsSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    question: {
      type: String,
      required: true,
    },
    calification: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

const FreeQuestions = model("FreeQuestions", FreeQuestionsSchema);
export default FreeQuestions;
