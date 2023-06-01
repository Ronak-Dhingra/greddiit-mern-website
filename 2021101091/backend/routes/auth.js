import express from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../schemas/User.js';

const router = express.Router();

/**
 * @route POST api/auth/signup
 * @desc  signup
 * @access Public
 * @returns {token}
 */
router.post('/signup', [
  body('fname').escape(),
  body('lname').escape(),
  body('email').isEmail().normalizeEmail(),
  body('uname').trim().escape(),
  body('age').isInt({ min: 13, max: 99 }).withMessage('Age 13-99 only'),
  body('contact').isMobilePhone().escape(),
  body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long')
],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fname, lname, email, uname, age, contact, password } = req.body;

    try {
      let user = await User.findOne({ uname });
      if (user) {
        return res.status(400).json({ errors: [{ msg: 'Username taken' }] });
      }

      user = new User({ fname, lname, email, uname, age, contact, password });

      const salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const token = user.genToken();
      res.status(201).json({ token });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error 500');
    }
  }
)

/**
 * @route POST api/auth/login
 * @desc login
 * @access Public
 * @returns {token}
 */
router.post('/login', [
  body('uname').not().isEmpty().withMessage('User name is required').trim().escape(),
  body('password').isLength({ min: 5 }).withMessage('Password is required')
],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { uname, password } = req.body;

    console.log(uname, password);

    try {
      const user = await User.findOne({ uname });
      if (!user) {
        return res.status(400).json({ message: "No user match found" });
      }
      const isMatch = await user.checkPassword(password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid password" });
      }
      const token = user.genToken();
      res.status(200).json({ token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server Error 500" });
    }
  }

);

 


export default router;