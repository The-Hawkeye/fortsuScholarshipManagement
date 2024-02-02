Render URl foir backend

url= https://anubhav-fortsu.onrender.com




Used MailTrap to verify email is sent properly
Used nodemailer to send email 



Upon making a get request to url/api/v1/students
    will extract the excel sheet uploaded in the render and save the documents in the database
    It will send an emil to the student witha text prompting them to submit the other details 


Endpoint 
    GET api/v1/students/getAllStudents
        will return all the students having duplicate data and will save the rest of data in the Db 


Endpoint 
    POST
        api/v1/admin/login

            will login the admin to admin portal 

            The only admin allowed is 
               {
                    "email":"admin1@gmail.com",
                    "password":"admin1"
                }



    PATCH

        api/v1/admin/:email
        This endpoint will update the details of the user who's email is mentioned in the params


    DELETE

        api/v1/admin/:email
        Will delete the account of the user whose email is mentioned in the params

    GET

        api/v1/admin/assignScholarship

        will return all the eligible candidates for the  scholarships



Once the admin clicks on the Assign Scholarship Button , a get request is made : In the backend , it checks if the student has been assigned any scholarship or not and also matches the elegibility criteria and if successful send an email to the each eleigible user in their mail


# fortsuScholarshipManagement
