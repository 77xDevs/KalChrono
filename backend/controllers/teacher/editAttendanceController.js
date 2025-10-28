import supabase from "../../supabase-client.js";
import { responseObj } from "../../utils/responseJson.js";

export const editAttendanceController = {
    editAttendance: async (request, response) => {
        try{
            const{studentId} = request.query;
            const{courseId}=request.query;

            const{classStatus}=request.body;
            const{noOfHours}=request.body;

            const{ data:enrollmentData, error: enrollmentError } = await supabase.from("enrollments")
                .select("enrollment_id")
                .eq("student_id",studentId)
                .eq("course_id",courseId);

            const enrollment_id = enrollmentData?.[0]?.enrollment_id;


            //to edit attendence (No of hours)
            const { data: attendanceData, error: attendanceError } = await supabase.from("attendance")
                .update({ class_status: classStatus, no_of_hours: noOfHours})
                .eq("enrollment_id", enrollment_id);


            if (attendanceError) {
                return responseObj.responseJson(response, 401, "false", attendanceError.status);
            };

            return response.status(200).json({
                "success": "true",
                "data": attendanceData
            }); 
        } catch (error) {
            return responseObj.responseJson(response, 500, "false", error.message);
        }
    }
}