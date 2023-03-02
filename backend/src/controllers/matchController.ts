import { Request, Response } from 'express';
import { MatchHistory } from '../models/matchHistory';

// Controller for saving match history
export const saveMatchHistory = async (req: Request, res: Response) => {
  try {
    const { user_id, category, questions } = req.body;

    // Create a new match history object
    const matchHistory = new MatchHistory({
      user_id,
      category,
      questions,
      date: new Date(),
    });

    await matchHistory.save();

    return res.status(200).json({ 
        message: 'Match history saved successfully'
     });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const getMatchHistoryForUser = async (req: Request, res: Response) => {
  try {
    const { uid } = req.params;

    const matchHistory = await MatchHistory.find({ user_id: uid });

    // Return the match history entries
    return res.status(200).json({ matchHistory });
  } catch (error) {
    // Handle any errors that occurred
    return res.status(500).json({ error  });
  }
};
