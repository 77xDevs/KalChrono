import supabase from "../../supabase-client.js";
import { WRONG_CREDENTIALS_TEACHER, WRONG_ROLE } from "../../errorMessages.js";

function teacherIdValidation(teacherId) {
    // Assuming teacher ID is numeric and 6 digits long
    if (!Number.isInteger(teacherId) || String(teacherId).length !== 6) {
        return false;
    }
    return true;
}

export const teacherLoginController = {
    teacherLogin: async (request, response) => {
        try {
            //Variables
            let teacherId = request.body.teacherId;
            let password = request.body.password;
            let role = request.body.role;


            const validTeacherId = teacherIdValidation(teacherId);
            if (!validTeacherId) {
                return response.status(422).json({
                    success: false,
                    message: BAD_REQUEST
                });
            }

            // Checking the role of user
            if (role !== 'teacher') {
                return response.status(403).json({
                    "success": "false",
                    "message": WRONG_ROLE
                });
            };

            // Login logic
            const email = `${teacherId}@pujyank.com`;

            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            // Supabase API error
            if (error) {
                return response.status(400).json({
                    "success": "false",
                    "message": WRONG_CREDENTIALS_TEACHER
                });
            };

            // Successful login
            return response.status(200).json({
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