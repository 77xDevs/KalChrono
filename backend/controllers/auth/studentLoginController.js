import supabase from "../../supabase-client.js";
import { STUDENT_NOT_FOUND, STUDENT_NOT_REGISTERED, WRONG_CREDENTIALS, WRONG_ROLE } from "../../errorMessages.js";

// function to validate roll number
function rollNumberValidation(rollNo) {
    if (!Number.isInteger(rollNo) || String(rollNo).length != 12) {
        return false;
    }
    return true;
};

// function to check whether the student exists in the table or not
async function doesStudentExist(rollNo) {
    const { data, error } = await supabase.from("students").select("*").eq("student_id", rollNo);
    if (error) {
        return false;
    }
    return true;
};

export const studentLoginController = {
    studentLogin: async (request, response) => {
        try {
            //Variables
            let rollNo = request.body.rollNo;
            let password = request.body.password;
            let role = request.body.role;

            // Validation of the rollNo
            if (!rollNumberValidation(rollNo)) {
                return response.status(400).json({
                    "success": "false",
                    "message": WRONG_CREDENTIALS
                });
            };

            // rollNo validation is successfull. So, now check whether the student is registered or not
            if (!doesStudentExist(rollNo)) {
                return response.status(404).json({
                    "success": "false",
                    "message": STUDENT_NOT_FOUND
                })
            };

            // Getting email from students table
            const { data: studentData, error: studentError } = await supabase.from("students").select("email").eq("student_id", rollNo);
            console.log(studentData);

            // Checking the role of user
            if (role !== 'student') {
                return response.status(403).json({
                    "success": "false",
                    "message": WRONG_ROLE
                });
            };

            // Login logic
            const { data, error } = await supabase.auth.signInWithPassword({
                email: studentData[0].email,
                password
            });

            // Supabase API error
            if (error) {
                return response.status(400).json({
                    "success": "false",
                    "message": STUDENT_NOT_REGISTERED
                });
            };

            // Successful login
            return response.status(201).json({
                "statusCode": 200,
                "message": "Login successfully"
            });

        } catch (error) {

            // Internal Server Error
            return response.status(500).json({
                "success": "false",
                "message": error.message
            });
        }
    }
};
