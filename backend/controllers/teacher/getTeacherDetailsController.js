import supabase from "../../supabase-client.js";
import { responseObj } from "../../utils/responseJson.js";

export const getTeacherDetailsController = {
    getTeacherDetails: async (request, response) => {
        try {
            // Variables
            const { teacherId } = request.query;

            // Retrieving Teacher enrolled details
            const { data: teaching_data, error: teaching_error } = await supabase.from("course")
                .select("*")
                .eq("teacher_id", teacherId);

            // Error while retrieving
            if (teaching_error) {
                console.log(teaching_error);
                return responseObj.responseJson(response, 401, "false", teaching_error.status);
            };

            return response.status(200).json({
                "success": "true",
                "data": teaching_data
            });

        } catch (error) {
            return responseObj.responseJson(response, 500, "false", error.message);
        }
    }
}