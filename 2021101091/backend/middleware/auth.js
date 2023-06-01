import jwt from 'jsonwebtoken';

export default function auth (req, res, next) {
  const token = req.header('x-auth-token');
  console.log(token)
  if (!token) return res.status(401).send('Cannot give access, token not provided');
  try {
    const verified = jwt.verify(token, process.env.JWT_KEY);
    req.user = verified.user;
    next();
  }
  catch (err) {
    res.status(400).send('Invalid token.');
  }
}