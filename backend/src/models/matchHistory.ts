import { model, Schema } from "mongoose";
import { IMatchHistory } from "../types";

const matchHistorySchema = new Schema<IMatchHistory>({
    user_id: { type: String, required: true },
    date: { type: Date, default: Date.now },
    category: { type: String, required: true },
    answers: [{ type: Schema.Types.ObjectId, ref: 'Answer' }],

});

export const MatchHistory = model<IMatchHistory>(
    'MatchHistory', matchHistorySchema
);

