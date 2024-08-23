import { model, Schema } from "mongoose";

const TodoSchema = new Schema(
  {
    todo: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    limitDate: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

const Todo = model("Todo", TodoSchema);
export default Todo;
