import supabase  from "../../supabase-client.js";
import { BAD_REQUEST, PASSWORD_MISMATCH, STUDENT_NOT_FOUND } from "../../errorMessages.js";

//Function to check if the student exists.
async function studentCheck(rollNo) {
    const {data, error} = await supabase.from("students").select("*").eq("student_id", rollNo);

    console.log(data.length)

    if(!data || data.length === 0) {
        console.log("Inside if")
        return false;
    }

    return true;
}

export const studentRegistrationController = {
    studentRegistration : async (request, response) => {
        try {
            //Variables
            let rollNo = request.body.rollNo;
            let email = request.body.email;
            let password = request.body.password;
            let confirm_password = request.body.confirmPassword;

            //Request body Validation: Checking if the roll Number entered is an Integer and is of correct length i.e. 12
            if(!Number.isInteger(request.body.rollNo) || String(request.body.rollNo).length != 12) {
                return response.status(401).json({
                    "success": "false",
                    "message": BAD_REQUEST
                });
            }

            //Student Check
            const studentExists = await studentCheck(rollNo);
            if (!studentExists) {
                return response.status(405).json({
                "success": false,
                "message": STUDENT_NOT_FOUND
                });
            }

            //Password Check
            if(password !== confirm_password) {
                return response.status(401).json({
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
                return response.status(400).json({
                    "success": "false",
                    "message": error
                });
            }

            //Successful Request
            return response.status(200).json({
                "success": "True",
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