import supabase from "../../supabase-client.js";
import { responseObj } from "../../utils/responseJson.js";

export const getStudentDetailsController = {
    getStudentDetails: async (request, response) => {
        try {
            // Variables
            const { dept_id, semester } = request.body;

            // Retrieving student enrolled details
            const { data: studentData, error: studentError } = await supabase.from("students")
                .select("student_id, first_name, last_name")
                .eq("dept_id", dept_id)
                .eq("semester",semester);

            // Error while retrieving
            if (studentError) {
                return responseObj.responseJson(response, 401, "false", studentError.status);
            };

            return response.status(200).json({
                "success": "true",
                "data": studentData
            });

        } catch (error) {
            return responseObj.responseJson(response, 500, "false", error.message);
        }
    }
}