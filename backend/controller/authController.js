const Admin = require("../models/admin")
const Students = require("../models/students")
const sendEmail = require("../Email/sendEmail")
exports.login = async(req,res)=>{
    console.log("hello");
    const {email,password} = req.body;

    const admin = await Admin.findOne({email:email});
    if(!admin){
        return  res.status(401).send('Invalid Email or Password');
    }

    if(admin.password!==password)
    {
        return  res.status(401).json('Email or Password is incorrect');

    }

    res.json({status:"loggedIn"});
}

exports.update = async(req,res)=>{
    try{
    const {email} = req.params;

    await Students.findOneAndUpdate({email:email}, req.body);

    const  student = await Students.find()

    res.json({
        status:'updated',
        students:students
    })

    }catch(err)
    {
        res.json({
            status:'fail',
            error:err
        })
    }

}

exports.deleteData = async(req,res)=>{
    try{
    const  email=req.query.email;

    await Students.findOneAndDelete({email:email})

    res.json({
        ststus:"succes"
    })
    }catch(err)
    {
        res.json({
            ststus:"failed"
        })
    }
}

exports.deleteEntry = async(req,res)=>{
    try{
        const email = req.params.email;

        console.log(email);

        await Students.findOneAndDelete({email:email});

        const students = await  Students.find();

        res.json({status:"deleted", students:students})
    }
    catch(err)
    {
        res.json({
            status:"fail",
            error:err
        })
    }
}


exports.assignScholarships = async (req,res) => {
    try {
      const students = await Students.find({}, 'name email rollNumber mobileNumber CGPA attendence');
  
      const eligibleStudents = students.filter(student => {
        return parseFloat(student.CGPA) > 6 && parseFloat(student.attendence) > 75 ;
      });
  
      console.log(`Eligible students for scholarship: ${eligibleStudents.map(student => student.name).join(', ')}`);
  
      // Send email notification to eligible students
      for (const student of eligibleStudents) {
        const emailText = `Dear ${student.name},\n\nCongratulations! You have been selected for a scholarship. Please contact us for further details.`;
        await sendEmail({email:student.email, subject: 'Scholarship Assigned', text:emailText});
        await Students.findOneAndUpdate({email:student.email},{scholarshipSent:true});
;
      }

      res.json({status:"success", eligibleStudents:eligibleStudents})
  
    } catch (err) {
      console.error(err);
      res.status({status:"fail"})
    }
  };
  
//   assignScholarships();