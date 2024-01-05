import express = require('express');
import http = require('http');
import bodyParser = require('body-parser');
import cookieParser = require('cookie-parser');
import compression = require('compression');
import cors = require('cors');
import apiRouter from './router';
import mongoose from 'mongoose';

const app = express();

// app.use(cors({
//   credentials: true,
// }));
//
// app.use(compression());
// app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8080, () => {
  console.log('Server running on http://localhost:8080/');
});

const MONGO_URL: string = 'mongodb://127.0.0.1:27017/DashboardBuilder';

mongoose.Promise = Promise;
mongoose.set('strictQuery', true);
mongoose.connect(MONGO_URL).then(() => console.log("Connected to mongo db successfully!"));
mongoose.connection.on('error', (error: Error) => console.log(error));

app.use('/api', apiRouter);