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

            if(!teachingData || teachingData.length === 0) {
                return responseObj.responseJson(response, 404, "false", "No teaching data found for the given teacher ID");
            };

            // Successful retrieval
            return response.status(200).json({
                "success": "true",
                "data": teachingData
            });

        } catch (error) {
            return responseObj.responseJson(response, 500, "false", error.message);
        }
    }
}