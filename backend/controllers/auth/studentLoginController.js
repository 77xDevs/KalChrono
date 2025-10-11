import supabase from "../../supabase-client.js";
import { STUDENT_NOT_FOUND, WRONG_CREDENTIALS } from "../../errorMessages.js";
import { responseObj } from "../../utils/responseJson.js";

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

    if (data.length === 0 || !data) {
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

            // Validation of the rollNo
            if (!rollNumberValidation(rollNo)) {
                return responseObj.responseJson(response, 401, "false", WRONG_CREDENTIALS);
            };

            // rollNo validation is successfull. So, now check whether the student is registered or not
            let isStudent = await doesStudentExist(rollNo);
            if (!isStudent) {
                return responseObj.responseJson(response, 401, "false", STUDENT_NOT_FOUND);
            };

            // Getting email from students table
            const { data: studentData, error: studentError } = await supabase.from("students").select("email").eq("student_id", rollNo);

            // Login logic
            const { data, error } = await supabase.auth.signInWithPassword({
                email: studentData[0].email,
                password
            });

            // Supabase API error
            if (error) {
                return responseObj.responseJson(response, 401, "false", error.message);
            };

            // Successful login
            return responseObj.responseJson(response, 200, "true", "Login successful");

        } catch (error) {

            // Internal Server Error
            return responseObj.responseJson(response, 500, "false", error.message);
        }
    }
};
