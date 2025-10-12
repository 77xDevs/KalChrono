import supabase  from "../../supabase-client.js";
import { BAD_REQUEST, PASSWORD_MISMATCH, STUDENT_NOT_FOUND } from "../../errorMessages.js";

//Checking if the roll number is of correct format
function rollNumberValidation(rollNo) {
    if(!Number.isInteger(rollNo) || String(rollNo).length != 12) {
        return false;
    }

    return true;
}

//Function to check if the student exists.
async function checkIfStudentExistsWithRollNo(rollNo) {
    const {data, error} = await supabase.from("students").select("*").eq("student_id", rollNo);

    if(!data || data.length === 0) {
        return false;
    }

    return true;
}

//Function to check if password and retype password are same or not
function checkPasswordAndConfirmPassword(password, confirm_password) {
    if(password !== confirm_password) {
        return false;
    }

    return true;
}

//Main controller code(Driver code)
export const studentRegistrationController = {
    studentRegistration : async (request, response) => {
        try {
            
            //Variables
            let rollNo = request.body.rollNo;
            let email = request.body.email;
            let password = request.body.password;
            let confirm_password = request.body.confirmPassword;

            //Valid roll number check
            const validRollNo = rollNumberValidation(rollNo);
            if(!validRollNo) {
                return response.status(400).json({
                    "success": "false",
                    "message": BAD_REQUEST
                });
            }

            //Student Check
            const ifStudentExists = await checkIfStudentExistsWithRollNo(rollNo);
            if (!ifStudentExists) {
                return response.status(404).json({
                "success": false,
                "message": STUDENT_NOT_FOUND
                });
            }

            //Password Check
            const passwordCheck = checkPasswordAndConfirmPassword(password, confirm_password)
            if(!passwordCheck) {
                return response.status(400).json({
                    "success": "false",
                    "message": PASSWORD_MISMATCH
                });
            }

            //Registration logic
            const {data, error} = await supabase.auth.signUp({
                "email": email,
                "password": password
            });

            //Supabase API error
            if(error) {
                return response.status(error.status).json({
                    "success": "false",
                    "message": error.code
                });
            }

            //Successful Request
            return response.status(201).json({
                "success": "true",
                "message": "Registered as student successfully"
            })

        } catch(error) {

            //Internal server Error
            return response.status(500).json({
                "success": "false",
                "message": error.message
            });
        }
    }
}
