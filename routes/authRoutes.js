import express from 'express'
const router = express.Router();
import passport from "passport";
import { MagicLinkController,VerifyUser } from '../controller/userController.js';
import User from '../models/UserModel.js'
import jwt from 'jsonwebtoken'
import { attachUserMiddleware } from '../middleware/userVerification.js';

router.get("/login/success", async (req, res) => {
    try {
        console.log('Login Success Route',req.user)
        if (req.user) {
          const email = req.user.emails[0].value;
           console.log(email)
          // Check if the user exists in the database
          const user = await User.findOne({ email });
          if (user) {
            const token = jwt.sign({userid:user._id.toString()}, process.env.SALT_SECRET, { expiresIn: '2d' });
             
            res.cookie('token', token, { maxAge: 172800000, httpOnly: true });

            res.status(200).json({
              success: true,
              message: "Successful",
              user: user,
            });
          } else {

           const provider = req.user.provider === 'google' ? 'google' : (req.user.provider === 'github' ? 'github' : 'local');
            const name = req.user.displayName;
            const email = req.user.emails[0].value;

            // Create a new user and save it to the database
            const newUser = new User({
              provider: provider,
              email: email,
              name: name,
            });

            await newUser.save();
            const token = jwt.sign({userid:newUser._id.toString()}, process.env.SALT_SECRET, { expiresIn: '2d' });

            res.cookie('token', token, { maxAge: 172800000, httpOnly: true });

            res.status(200).json({
              success: true,
              message: "Successful",
              user: newUser,
            });
          }
        } else {
          res.status(400).json({
            success: false,
            message: "User does not exist",
          });
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error', error: err });
    }
});


router.get("/login/failed", (req, res) => {
    res.status(401).json({
        success: false,
        message: "failure",
    });
});

router.get("/logout", (req, res) => {
    req.logout((err) => {
        console.log(err)
    });
    console.log('Logout Route')
    res.redirect(`${process.env.CLIENT_URL}`);
});


router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }), (req, res) => {
    console.log("I'M Google Route");
});

router.get(
    "/google/callback",
    passport.authenticate("google", {
        successRedirect: `${process.env.CLIENT_URL}/dashboard`,
        failureRedirect: "/login/failed",
    }), (req, res) => {
        console.log("I'M Google Callback Route");
    }
);

router.get("/github", passport.authenticate("github", { scope: ["profile"] }), (req, res) => {
    console.log("I'M GitHub Route");
});

router.get(
    "/github/callback",
    passport.authenticate("github", {
        successRedirect: `${process.env.CLIENT_URL}/dashboard`,
        failureRedirect: "/login/failed",
    }), (req, res) => {
        console.log("I'M GitHub Callback Route");
    }
);

router.post("/magiclogin", MagicLinkController);
router.get("/verify", VerifyUser);

export default router;