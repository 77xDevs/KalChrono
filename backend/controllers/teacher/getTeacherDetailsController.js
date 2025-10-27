import supabase from "../../supabase-client.js";
import { responseObj } from "../../utils/responseJson.js";

export const getTeacherDetailsController = {
    getTeacherDetails: async (request, response) => {
        try {
            // Variables
            const { teacherId } = request.query;

            // Retrieving Teacher enrolled details
            const { data: teachingData, error: teachingError } = await supabase.from("course")
                .select("*")
                .eq("teacher_id", teacherId);

            // Error while retrieving
            if (teachingError) {
                console.log(teachingError);
                return responseObj.responseJson(response, 401, "false", teachingError.status);
            };

            return response.status(200).json({
                "success": "true",
                "data": teachingData
            });

        } catch (error) {
            return responseObj.responseJson(response, 500, "false", error.message);
        }
    }
}