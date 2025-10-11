import supabase from "../../supabase-client.js";
import { WRONG_CREDENTIALS_TEACHER, WRONG_ROLE,TEACHER_NOT_FOUND} from "../../errorMessages.js";

function teacherIdValidation(teacherId) {
    if (!Number.isInteger(teacherId) || String(teacherId).length != 6) {
        return false;
    }
    return true;
};
async function doesTeacherExist(teacherId) {
    const { data, error } = await supabase.from("teachers").select("*").eq("teacher_id", teacherId);
    if (error) {
        return false;
    }
    return true;
};
export const teacherLoginController = {
    teacherLogin: async (request, response) => {
        try {
            //Variables
            let teacherId = request.body.teacherId;
            let password = request.body.password;
            let role = request.body.role;

            // Validation of the teacherId
            if (!teacherIdValidation(teacherId)) {
                return response.status(403).json({
                    "success": "false",
                    "message": WRONG_CREDENTIALS_TEACHER
                });
            };

             // teacherId validation is successful.Now check whether the teacher is registered or not
            if (!doesTeacherExist(teacherId)) {
                return response.status(403).json({
                    "success": "false",
                    "message": TEACHER_NOT_FOUND
                })
            };

            // Getting email from teachers table
            const { data: teacherData, error: teacherError } = await supabase.from("teachers").select("email").eq("teacher_id", teacherId);
            console.log(teacherData);

            // Login logic
            const { data, error } = await supabase.auth.signInWithPassword({
                email: teacherData[0].email,
                password
            });

            // Supabase API error
            if (error) {
                return response.status(400).json({
                    "success": "false",
                    "message": error.message
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