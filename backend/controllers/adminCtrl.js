const doctorModel = require('../models/doctorModel')
const userModel = require('../models/userModels')

const getAllUsersController=async(req,res)=>{
    try {
        const users = await userModel.find({});
        res.status(200).send({success:true,message:'Users data',data:users});
    } catch (error) {
        console.log(error);
        res.status(500).send({success:false,message:'Error while fetching users',error})
    }

}

const getAllDoctorsController=async(req,res)=>{
    try {
        const doctors = await doctorModel.find({});
        res.status(200).send({success:true,message:'Doctors data list',data:doctors})
    } catch (error) {
        console.log(error);
        res.status(500).send({message:'Error while getting doctors data',error,success:false});
    }
}


const changeAccountStatusController=async(req,res)=>{
    try {
        const {doctorId,status} = req.body;
        const doctor = await doctorModel.findByIdAndUpdate(doctorId,{status});
        const user = await userModel.findOne({_id:doctor.userId});
        const notification = user.notification;
        notification.push({
            type:'doctor-account-request-updated',
            message:`Your Doctor Account Request Has ${status}`,
            onClickPath:'/notification'
        });
        user.isDoctor= status==='approved'?true:false;
        await user.save();
        res.status(201).send({success:true,message:'Account Status Updated',data:doctor})
    } catch (error) {
        console.log(error);
        res.status(500).send({success:false,message:'Erorr in account status',error})
    }
}


const deleteAccountController = async(req,res)=>{
    try {
        const {doctorId,status} = req.body;
        const doctor = await doctorModel.findByIdAndDelete(doctorId);
        const user = await userModel.findOne({_id:doctor.userId});
        const notification = user.notification;
        notification.push({
            type:'doctor-account-request-updated',
            message:`Your Doctor Account is deleted by Admin`,
            onClickPath:'/notification'
        });
        user.isDoctor=false;
        await user.save();
        res.status(201).send({success:true,message:'Account has been successfully deleted'});
    } catch (error) {
        console.log(error);
        res.status(500).send({success:false,message:'Error in account status',error});
    }
}

const deleteUserAccountController = async(req,res)=>{
    try {
        const candidateId = req.body.candidateId;
        const doctor = await doctorModel.findOne({userId:candidateId});
        // console.log(doctor);
        if(doctor){
            await doctorModel.findByIdAndDelete(doctor._id);
        }
        await userModel.findByIdAndDelete(candidateId);
        res.status(200).send({success:true,message:'User Account Successfully deleted!'});

    } catch (error) {
        console.log(error);
        res.status(500).send({success:false,message:'Error in deleting account',error});
    }
}


module.exports={deleteUserAccountController,deleteAccountController,changeAccountStatusController,getAllDoctorsController,getAllUsersController}