import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import cors from "cors";

// ----------------------------------------------------------------------
// Fix for __dirname in ES Modules
// Note: __dirname is not available in ES Module scope.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://DB_Maintenancemfu:uZV2z9d6ZeEfhep7@dbmaintenancemfu.ijmr0wh.mongodb.net/?appName=DBMaintenancemfu')
// mongoose.connect('mongodb://localhost:27017/')
  .then(() => console.log('connection successfully! '))
  .catch((err) => console.error(err))


import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import ticketRouter from './routes/ticket.routes.js';
import categoryRouter from './routes/category.routes.js';
import buildingRouter from './routes/building.routes.js';

var app = express();

app.use(cors({
  origin: "http://localhost:8080",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "api-key"]
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/ticket", ticketRouter);
app.use("/category", categoryRouter);
app.use("/building", buildingRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
