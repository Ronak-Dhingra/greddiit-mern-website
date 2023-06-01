import express from 'express';
import { body, validationResult } from 'express-validator';

import User from '../schemas/User.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/delete/:uid', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
        return res.status(404).json({ msg: 'User not found' });
        }
        // remove following from user's followings
        const index = user.following.findIndex(following => following.uid === req.params.uid);
        user.following.splice(index, 1);
        // remove user from following's followers
        const following = await User.findById(req.params.uid);
        const index2 = following.followers.findIndex(follower => follower.uid === req.user.id);
        following.followers.splice(index2, 1);
        await following.save();
        await user.save();
        res.status(200).json({ msg: 'following removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error 500');
    }
    }
)

export default router;