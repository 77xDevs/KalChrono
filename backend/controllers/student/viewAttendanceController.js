import supabase from "../../supabase-client.js";
import { responseObj } from "../../utils/responseJson.js";

export const viewAttendanceContoller = {
    viewAttendance: async (request, response) => {
        try {
            //Variables
            const {rollNo}= request.query;
            
            //Retrieving Data from view
            const {data: attendance_data, error: attendance_error} = await supabase.from("attendance_summary")
                                                                                .select("*")
                                                                                .eq("student_id", rollNo);

            //Error while retrieving
            if(attendance_error) {
                return responseObj.responseJson(response, 401, "false", attendance_error.status);
            }
            
            //Successful request
            return response.status(200).json({
                "success": "true",
                "data": attendance_data
            });
        
        } catch(error) {

            //Internal Server Error
            return responseObj.responseJson(response, 500, "false", error.message);
        } 
    }
}