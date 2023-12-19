import express from "express";
import cookieParser from "cookie-parser";
import passport from "passport";
import session from "express-session"; 
import cors from "cors";
import "./config/passport/passport.js";
import authRoutes from './routes/authRoutes.js';
import dotenv from "dotenv";
dotenv.config();
import { connect } from "./config/dbConfig.js";

const app = express();
connect()
const PORT = process.env.PORT || 4000;

app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
    session({
        name: "session",
        secret: "DairCloud",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 24 * 60 * 60 * 1000,
        },
    })
);

app.use(passport.initialize());
app.use(passport.session());

// Importing the base routes
import rootRouter from './routes/index.js';
app.use('/api', rootRouter);
app.use('/auth', authRoutes);

app.get("/", (req, res) => {
    return res.json({
        message: "The backend is up and running!",
        success: true,
    });
});


app.listen(PORT, () => {
    console.log(`The backend is up and running at ${PORT} `);
});
