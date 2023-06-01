import express from 'express';
import connectDB from './utils/connectDB.js';
import userRoutes from './routes/user.js';
import authRoutes from './routes/auth.js';
import followersRoutes from './routes/followers.js';
import followingRoutes from './routes/following.js';
import mysubgreddiitRoutes from './routes/subgreddiit.js';

const app = express()
app.use(express.json())

connectDB()

app.use('/api/profile', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/followers', followersRoutes)
app.use('/api/following', followingRoutes)
app.use('/api/mysubgreddiits', mysubgreddiitRoutes)

app.get('/', (req, res) => {
    res.send('Test!')
    })

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))