const userModel=require('../models/userModels')
const bcrypt=require('bcryptjs')
const jwt = require('jsonwebtoken')
const doctorModel = require('../models/doctorModel');
const moment = require('moment');
const appointmentModel = require('../models/appointmentModel')
const registerController=async(req,res)=>{
    try {
        const existingUser = await userModel.findOne({email:req.body.email})
        if(existingUser)
        {return res.status(200).send({message:'User Already Exists!',success:false})}
         const password=req.body.password;
         const salt = await bcrypt.genSalt(10);
         const hassedpassword = await bcrypt.hash(password,salt);
         req.body.password=hassedpassword;
         const newUser = new userModel(req.body);
         await newUser.save();
         res.status(201).send({message:'Registered Successfully!',success:true})
         }
    catch (error) {
        console.log(error);
        res.status(500).send({message:`Register controller ${error.message}`,success:false})
    }
}





const loginController=async(req,res)=>{
    try {
        const user = await userModel.findOne({email:req.body.email});
        if(!user)
        {
            return res.status(200).send({message:'User Not Found!',success:false});
        }
        const isMatch = await bcrypt.compare(req.body.password,user.password);
        if(!isMatch){
            res.status(200).send({message:'Invalid username or password',success:false});
        }
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1d'})
        res.status(200).send({message:'Login Success!',success:true,token})
    } catch (error) {
        console.log(error);
        res.status(500).send({message:`Error in login CTRL ${error.message}`})
        
    }
}



const authController = async(req,res)=>{
    try {
        const user = await userModel.findById({_id:req.body.userId});
        user.password=undefined
        if(!user){
            return res.status(200).send({message:'User Not Found!',success:false})
        }else{
            res.status(200).send({success:true,data:user})
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({message:'Auth Error',success:false,error});
    }
}


const applyDoctorController=async(req,res)=>{
    try {
        const newDoctor = await doctorModel({...req.body,status:'pending'});
        await newDoctor.save();
        const adminUser = await userModel.findOne({isAdmin:true});
        const notification = adminUser.notification;
        notification.push({
            type:'apply-doctor request',
            message:`${newDoctor.firstName} ${newDoctor.lastName} has apply for the doctor Account`,
            data:{
                doctorId:newDoctor._id,
                name:newDoctor.firstName + newDoctor.lastName,
                onClickPath:'/admin/doctors'
            }
        })
        await userModel.findByIdAndUpdate(adminUser._id , {notification})
        res.status(201).send({success:true,message:'Doctor Account Applied Successfully!'})
    } catch (error) {
        console.log(error);
        res.status(500).send({success:false,error,message:'Error while Applying for doctor'});
    }
}


const getAllNotificationController = async (req, res) => {
    try {
      const user = await userModel.findOne({ _id: req.body.userId });
      const seennotification = user.seennotification;
      const notification = user.notification;
      seennotification.push(...notification);
      user.notification = [];
      user.seennotification = notification;
      const updatedUser = await user.save();
      res.status(200).send({
        success: true,
        message: "all notification marked as read!",
        data: updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error in notification",
        success: false,
        error,
      });
    }
  };


const deleteAllNotificationController=async(req,res)=>{
    try {
        const user = await userModel.findOne({_id:req.body.userId});
        user.notification=[]
        user.seennotification=[]
        const updatedUser = await user.save();
        updatedUser.password=undefined;
        res.status(200).send({message:'Notifications Deleted Successfully!',success:true,data:updatedUser})
    } catch (error) {
        console.log(error);
        res.status(500).send({success:false,message:'Unable to delete notifications',error});
    }
}


const getAllDoctorsController = async (req, res) => {
    try {
      const doctors = await doctorModel.find({ status: "approved" });
      res.status(200).send({
        success: true,
        message: "Docots Lists Fetched Successfully",
        data: doctors,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Errro WHile Fetching DOcotr",
      });
    }
  };



const bookAppointmentController=async(req,res)=>{
    try {
        req.body.date = req.body.date;
    req.body.time = req.body.time;
        req.body.status='pending';
        const newAppointment = new appointmentModel(req.body);
        await newAppointment.save()
        const user = await userModel.findOne({_id:req.body.doctorInfo.userId});

        user.notification.push({
            type:'New-appointment-request',
            message:`A new appointment request from ${req.body.userInfo.name}`,
            onClickPath:'/appointments'
        })
        await user.save(); 
        res.status(200).send({success:true,message:'Appointment Book Successfully'})
    } catch (error) {
        console.log(error);
        res.status(500).send({success:false,message:'Error while booking appointment',error})
    }
}


const bookingAvailabilityController=async(req,res)=>{
    try {
      const date = req.body.date;
      const fromTime = req.body.time;
      // console.log("fromtime: ",fromTime);
      console.log(date);
      console.log(fromTime)
      let data = new Date('2022-01-01T' + fromTime + ':00Z');
      let newDate = new Date(data.getTime()+60*60000);
      let newDateSplit = newDate.toISOString().split(':');
      let first = newDateSplit[0].split('T')[1];
      let toTime = first +':'+newDateSplit[1];
      console.log(toTime);



      // const toTime=0;
    // console.log("toTime: ",toTime);
    const doctorId = req.body.doctorId;
    const appointments = await appointmentModel.find({
      doctorId,
      date,
      time: {
        $gte: fromTime,
        $lte: toTime,
      },
    });
    if (appointments.length > 0) {
      return res.status(200).send({
        message: "Appointments are not Available at this time and date",
        success: false,
      });
    } else {
      return res.status(200).send({
        success: true,
        message: "Appointment is available at this date and time",
      });
    }}
     catch (error) {
        console.log(error);
        res.status(500).send({success:false,message:'Error in Booking',error});
    }
}


const userAppointmentController = async (req, res) => {
    try {
      const appointments = await appointmentModel.find({
        userId: req.body.userId,
      });
      res.status(200).send({
        success: true,
        message: "Users Appointments Fetch SUccessfully",
        data: appointments,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error In User Appointments",
      });
    }
  };

module.exports={userAppointmentController,bookingAvailabilityController,bookAppointmentController,getAllDoctorsController,deleteAllNotificationController,getAllNotificationController,loginController,registerController,authController,applyDoctorController};