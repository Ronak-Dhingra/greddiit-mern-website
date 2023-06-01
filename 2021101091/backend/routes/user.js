import express from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import auth from '../middleware/auth.js';
import User from '../schemas/User.js';

const router = express.Router();

// router.get('/', (req, res) => {
//   res.send('This is a user get request');
// });

/**
 * @route POST api/profile/
 * @desc login
 * @access private
 * @returns {token}
 */
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      console.log('User not found')
      return res.status(404).json({ msg: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

 /**
 * @route POST api/profile/edit
 * @desc  Update user profile
 * @access Private
 * @returns {message}
 */
 router.post('/edit', [
  body('fname').escape(),
  body('lname').escape(),
  body('email').isEmail().normalizeEmail(),
  body('uname').trim().escape(),
  body('age').isInt({ min: 13, max: 99 }).withMessage('Age 13-99 only'),
  body('contact').isMobilePhone().escape(),
],auth,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log("user", req.user.id)

    const { fname, lname, email, uname, age, contact} = req.body;

    try {
      console.log("user", req.user.id)
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(400).json({ errors: [{ msg: 'User not found' }] });
      }

      user.fname = fname || user.fname;
      user.lname = lname || user.lname;
      user.email = email || user.email;
      user.uname = uname || user.uname;
      user.age = age || user.age;
      user.contact = contact || user.contact;

      // if (password) {
      //   const salt = await bcrypt.genSalt();
      //   user.password = await bcrypt.hash(password, salt);
      // }

      await user.save();

      res.status(200).json({ message: 'Profile updated successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error 500');
    }
  }
);


export default router;