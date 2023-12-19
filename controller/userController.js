import sendVerificationEmail from "../config/nodeMailer/nodeMailer.js"
import jwt from 'jsonwebtoken'
import User from '../models/UserModel.js'

export const MagicLinkController = async(req,res) =>{
    try{
       const { email } = req.body
     
       const user = await User.find({email});
       if(user.length>0){
        const token = jwt.sign({userId:user[0]._id},process.env.SALT_SECRET,{
            expiresIn:'2d'
           });
           console.log(user[0]._id)
        const emailResponse = await sendVerificationEmail(email,token)
        return  res.status(200).json({
                success:true,
                message:'Check you mail',
                emailResponse
            })
       }

      const newUser = new User({
        provider: 'local',
        email: email,
        name: email.split('@')[0],
      });
      
      const createdUser = await newUser.save();
      const token = jwt.sign({userId:createdUser._id},process.env.SALT_SECRET,{
        expiresIn:'2d'
       });

      const emailResponse = await sendVerificationEmail(email,token)

      console.log('Email sent: %s', emailResponse);

     res.status(200).json({
        success:true,
        message:'Check you mail',
        emailResponse
     })

    }catch(err){
       console.log('Error in Sending MagiLink ',err)
       res.status(400).json({
           success:false,
           message:'Error in sending Magic Link'
       })
    }
}

export const VerifyUser = async(req,res) =>{
    try{
     
        const {token} = req.query;
        // console.log(token)
        const decodeToken = jwt.verify(token,process.env.SALT_SECRET)
            console.log(decodeToken)
        const user = await User.findById(decodeToken.userId);
        if(user){
            res.cookie('token', token, { maxAge: 172800000, httpOnly: true });
            req.user = user;
            return res.redirect(`${process.env.CLIENT_URL}/dashboard`);

        }
        res.status(400).json({
            success:false,
            message:'something went wrong try again'
        })
 
    }catch(err){
       console.log('Error in Verying signin',err)
       res.status(400).json({
           success:false,
           message:'Error in Verying Link singin'
       })
    }
 }