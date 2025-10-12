import supabase from "../../supabase-client.js";
import { responseObj } from "../../utils/responseJson.js";

export const viewAttendanceContoller = {
    viewAttendance: async (request, response) => {
        try {
            const {rollNo}= request.query;
            
            const {data: attendance_data, error: attendance_error} = await supabase.from("attendance_summary")
                                                                            .select("*")
                                                                            .eq("student_id", rollNo);

            if(attendance_error) {
                return responseObj.responseJson(response, 401, "false", attendance_error.status);
            }
            
            return response.status(200).json({
                "success": "true",
                "data": attendance_data
            });
        } catch(error) {
            return responseObj.responseJson(response, 500, "false", error.message);
        } 
    }
}