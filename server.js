const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const morgan = require('morgan')
const path = require('path')
const fs = require('fs')
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), { flags: 'a' })

const {assetRouter} = require("./routers/routerAsset");
const {userRouter} = require("./routers/routerUser");
const {messageRouter} = require("./routers/routerMessage");
const { googleAuthRouther } = require('./routers/routerGoogleAuth');

app.use(cors({ origin: true, credentials: true }))
app.use(express.json());
app.use(express.urlencoded({extended: true})); 
app.use(cookieParser());
app.use(morgan('tiny', { stream: logStream }))

app.use('/api/auth', googleAuthRouther)
app.use('/api/assets', assetRouter);
app.use('/api/users',userRouter);
app.use('/api/messages', messageRouter);

app.use((req, res, next) => {
    res.status(500).send('Something is broken!');
});

app.listen(port, () => console.log('Express server is running on port ', port));