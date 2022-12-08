
const connectDB = require('./config/connectDB');
const authRouter = require('./routers/auth');
const userRouter = require('./routers/user');
const msgRouter = require('./routers/message');
const notiRouter = require('./routers/noti');
connectDB()
module.exports = (app) => {
    app.use('/api/auth', authRouter);
    app.use('/api/user', userRouter);
    app.use('/api/msg', msgRouter);
    app.use('/api/noti', notiRouter);
}


