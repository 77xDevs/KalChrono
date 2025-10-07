import supabase from "../../supabase-client.js";
import { BAD_REQUEST, PASSWORD_MISMATCH, TEACHER_NOT_FOUND } from "../../errorMessages.js";

// Function to validate teacher ID format
function teacherIdValidation(teacherId) {
    // Assuming teacher ID is numeric and 6 digits long
    if (!Number.isInteger(teacherId) || String(teacherId).length !== 6) {
        return false;
    }
    return true;
}

// Function to check if teacher exists in the database
async function checkIfTeacherExists(teacherId) {
    const { data, error } = await supabase
        .from("teachers")
        .select("*")
        .eq("teacher_id", teacherId);

    if (!data || data.length === 0) {
        return false;
    }

    return true;
}

// Function to verify password and confirm password
function checkPasswordMatch(password, confirmPassword) {
    return password === confirmPassword;
}

// Main controller (driver code)
export const teacherRegistrationController = {
    teacherRegistration: async (request, response) => {
        try {
            // Extract data from request body
            const teacherId = request.body.teacherId;
            const email = request.body.email;
            const password = request.body.password;
            const confirmPassword = request.body.confirmPassword;

            // Validate teacher ID format
            const validTeacherId = teacherIdValidation(teacherId);
            if (!validTeacherId) {
                return response.status(422).json({
                    success: false,
                    message: BAD_REQUEST
                });
            }

            // Check if teacher exists in DB
            const ifTeacherExists = await checkIfTeacherExists(teacherId);
            if (!ifTeacherExists) {
                return response.status(404).json({
                    success: false,
                    message: TEACHER_NOT_FOUND
                });
            }

            // Check if passwords match
            const passwordsMatch = checkPasswordMatch(password, confirmPassword);
            if (!passwordsMatch) {
                return response.status(400).json({
                    success: false,
                    message: PASSWORD_MISMATCH
                });
            }

            // Register in Supabase Auth
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password
            });

            // Handle Supabase signup error
            if (error) {
                return response.status(error.status || 400).json({
                    success: false,
                    message: error.message
                });
            }

            // Success response
            return response.status(200).json({
                success: true,
                message: "Registered as teacher successfully"
            });

        } catch (error) {
            // Internal server error
            return response.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
};
