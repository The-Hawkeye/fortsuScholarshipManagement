const fs = require("fs");
const xlsx = require("xlsx");
const Students = require("../models/students");
const sendEmail = require("../Email/sendEmail");

exports.extractDataFromExcel = async(req, res) => {
    const filePath = "/Users/anubhavmaurya/Desktop/FORTSU Assessment/Task1/data/SampleData1.numbers";

    try {
        const workbook = xlsx.readFile(filePath);
        const sheetNames = workbook.SheetNames;
        // const data = {};

        const includedRollNo=[];
        const includedEmail = [];

        const defaulter = [];
        const duplicateData = [];


        for (const sheetName of sheetNames) {
            const sheet = workbook.Sheets[sheetName];
            const jsonData = xlsx.utils.sheet_to_json(sheet);

            // Skip empty sheets
            if (jsonData.length === 0) continue;

            // data[sheetName] = jsonData;

            
            for(let i of  jsonData){

                console.log(i)

                const rollNumber =i.Roll_No;
                const    name=i.Name;
                const    email=i.Mobile;
                const    mobileNumber=i.Email

                //Removing rows if any of the required field is missing

                if(!rollNumber||!name||!email||!mobileNumber)
                {
                    defaulter.push(i);
                    continue;
                }

                //Removing rows having duplicate Roll Number or Email

                const x = includedRollNo.includes(i.Roll_No);
                const y = includedEmail.includes(i.Email)

                if(x||y)
                {
                    duplicateData.push(i)
                    const duplicate = await Students.find({$or:[{rollNumber: i.Roll_No },{email: i.Email }]})
                    duplicateData.push(...duplicate);

                    const indexOfRn = includedRollNo.indexOf(x);
                    includedRollNo.splice(indexOfRn,1)

                    const indexOfEmail  = includedEmail.indexOf(y);
                    includedEmail.splice(indexOfEmail ,1)
                    await Students.findOneAndDelete({$or:[{rollNumber: i.Roll_No },{email: i.Email }]})
                    continue;
                }
               


                //Removing the row containg column names
                // if(i.Roll_No==="Name") continue;

                console.log(includedEmail);
                console.log(includedRollNo);


                includedEmail.push(i.Email);
                includedRollNo.push(i.Roll_No);


                

                await Students.create({
                    rollNumber:i.Roll_No,
                    name: i.Name,
                    email:i.Email,
                    mobileNumber:i.Mobile

                })
                //Prompting an email to completely fill their details
                await sendEmail({
                                email:i.Email,
                                subject:"Regarding Filling The Details",
                                text:"Kindy fill the complete details to continue the scholarship further process"
                            });
            }


            
        }

        // const correctData = await Students.find();

        res.json({
            totalSheets: sheetNames.length,
            ststus:"Data uploaded of correct students",
           One_Or_More_Fields_Are_Missing:defaulter,
           Duplicate_data : duplicateData,
        //    Correct_Entries : correctData.length ,
        //    data:correctData
        });
    } catch (error) {
        console.error("Error reading Excel file:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// module.exports = extractDataFromExcel;


exports.getAllStudents = async(req,res)=>{
    try{
    const  allStudentData =  await Students.find()
    res.json({
        status:"Data fetched from DB",
        Correct_Entries : allStudentData.length ,
        students:allStudentData
    })
    }catch(err)
    {
        res.status(404).json({
            message: 'Something went wrong',
            error:err
        })
    }


}
