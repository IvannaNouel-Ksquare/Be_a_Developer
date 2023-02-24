import { Request, Response } from 'express';
import { User } from '../models/userModel';

export const getUserByUid = async (req: Request, res: Response) => {
    try {
        const { uid } = req.params;

        const user = await User.findOne({ where: { user_id: uid } });

        if (!user) {
            return res.status(404).json({
                message: 'user not found',
            });
        }
        return res.status(200).json({
            user,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Server error',
        });
    }
};