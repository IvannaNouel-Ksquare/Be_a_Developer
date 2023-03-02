import { model, Schema } from "mongoose";
import { IMatchHistory } from "../types";

const matchHistorySchema = new Schema<IMatchHistory>({
    user_id: { type: String, required: true },
    date: { type: Date, default: Date.now },
    category: { type: String, required: true },
    answers: [{
        question: { type: String, required: true },
        answer: { type: String, required: true },
        is_correct: { type: Boolean, required: true },
    }],
});

export const MatchHistory = model<IMatchHistory>(
    'MatchHistory', matchHistorySchema
);

