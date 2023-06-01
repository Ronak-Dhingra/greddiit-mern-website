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
        // remove follower from user's followers
        const index = user.followers.findIndex(follower => follower.uid === req.params.uid);
        user.followers.splice(index, 1);
        // remove user from follower's following
        const follower = await User.findById(req.params.uid);
        const index2 = follower.following.findIndex(following => following.uid === req.user.id);
        follower.following.splice(index2, 1);
        await follower.save();
        await user.save();
        res.status(200).json({ msg: 'Follower removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error 500');
    }
    }
)

export default router;