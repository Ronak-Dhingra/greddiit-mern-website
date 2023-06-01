import express from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../schemas/User.js';
import Subgreddiit from '../schemas/Subgreddiit.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/create', [
  body('name').escape(),
  body('description').trim().escape(),
  body('tags').escape(),
  body('banned_words').escape(),
],
  auth, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let { name, description, tags, banned_words } = req.body;

    if (tags) {
        tags = Array.from(new Set(tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')));
      }
    
      if (banned_words) {
        banned_words = Array.from(new Set(banned_words.split(',').map(word => word.trim()).filter(word => word !== '')));
      }

    try {
      let subgreddiit = new Subgreddiit({ name, description, tags, banned_words, moderator_id: req.user.id, date_created: Date.now(), users: [{ status: 'Joined', user_id: req.user.id, date: Date.now() }] });
      console.log("subgreddit",subgreddiit);
        let user = await User.findById(req.user.id);
        user.subgreddiits.push({ sg_id: subgreddiit._id, status: 'Moderator' });
        await user.save();
        await subgreddiit.save();
        res.status(201).json({ subgreddiit });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error 500');
    }
  }
)

router.get('/getmy', auth, async (req, res) => {
  try {
    let subgreddiits = await Subgreddiit.find({ moderator_id: req.user.id});
    res.status(200).json(subgreddiits );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error 500');
  }
})

router.delete('/delete/:id', auth, async (req, res) => {
  try {
    let subgreddiit = await Subgreddiit.findById(req.params.id);
    if (!subgreddiit) {
      return res.status(404).json({ msg: 'Subgreddiit not found' });
    }
    if (subgreddiit.moderator_id.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    await subgreddiit.remove();
    res.status(200).json({ msg: 'Subgreddiit removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error 500');
  }
})

router.get('/show/:id', auth, async (req, res) => {
  try {
    let subgreddiit = await Subgreddiit.findById(req.params.id);
    if (!subgreddiit) {
      return res.status(404).json({ msg: 'Subgreddiit not found' });
    }
    res.status(200).json(subgreddiit);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error 500');
  }
})





export default router;
