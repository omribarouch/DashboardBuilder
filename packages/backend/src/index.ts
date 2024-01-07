import express = require('express');
import http = require('http');
import bodyParser = require('body-parser');
import cookieParser = require('cookie-parser');
import compression = require('compression');
import cors = require('cors');
import apiRouter from './router';
import mongoose from 'mongoose';
import { UserModel } from "./models/user";
import { EventSchemaModel } from "./models/eventSchema";
import { DashboardModel } from "./models/dashboard";
import { EventModel } from "./models/event";
import * as process from "process";
require('dotenv').config();

const app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/api', apiRouter);

const server = http.createServer(app);

mongoose.Promise = Promise;
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Connected to mongo db successfully!");
    Promise.all([
        UserModel.createCollection,
        UserModel.findOneAndUpdate({
            username: process.env.ADMIN_USER,
            password: process.env.ADMIN_PASS,
            isAdmin: true}, {},
            {upsert: true}),
        EventSchemaModel.createCollection,
        EventModel.createCollection,
        DashboardModel.createCollection
    ])
        .then(() => {
            server.listen(process.env.PORT, () => {
                console.log(`Server running on http://localhost:${process.env.PORT}`);
            });
        });
});
mongoose.connection.on('error', (error: Error) => console.log(error));