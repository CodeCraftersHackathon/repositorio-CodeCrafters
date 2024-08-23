import {model, Schema} from 'mongoose';

const MCQuestionsSchema = new Schema({
    activityTeorical: {
        type: {
          explicacion: String,
          pregunta: [String],
          seleccionables: {
            type: Map,
            of: [String],
          },
        },
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
},{
    timestamps: true,
});

const MCQuestions = model('MCQuestions', MCQuestionsSchema);
export default MCQuestions;