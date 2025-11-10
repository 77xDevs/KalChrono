import supabase from "../../supabase-client.js";
import { responseObj } from "../../utils/responseJson.js";

export const markAttendanceController = {
    markAttendance: async (request, response) => {
        try {
            // Variables
            const { students, courseId, currentHours } = request.body;

            // Checking if there are any students marked to present or not
            if (!students || students.length === 0) {
                return responseObj.responseJson(response, 400, false, "No students provided");
            }

            // Storing dtuedent_id's into an array
            const studentId = students.map(s => s.student_id);

            // getting the enrollment details of each student for this particular course
            const { data: enrollmentData, error: enrollmentError } = await supabase
                .from("enrollments")
                .select("student_id, enrollment_id")
                .in("student_id", studentId)
                .eq("course_id", courseId)
                .eq("status", "active")

            if (enrollmentError) {
                return responseObj.responseJson(response, 401, "false", enrollmentError.status);
            }

            // Storing enrollment_id's into an array
            const enrollmentId = enrollmentData.map(e => e.enrollment_id);

            // getting the attendance records of each students for this particular subject
            const { data: attendanceData, error: attendanceError } = await supabase
                .from("attendance")
                .select("attendance_id, enrollment_id, student_id, no_of_hours")
                .in("enrollment_id", enrollmentId)
            
            if (attendanceError) {
                return responseObj.responseJson(response, 401, "false", attendanceError.status);
            }

            // Collecting the (want to) updating records
            const updateAttendance = enrollmentData.map(
                (enroll) => {
                    const record = attendanceData.find(
                        (row) => row.enrollment_id === enroll.enrollment_id
                    );
                    const updates = {
                        enrollment_id: enroll.enrollment_id,
                        student_id: enroll.student_id,
                        no_of_hours: currentHours,
                        date: new Date().toISOString().split('T')[0]
                    }
                    return updates
                });
            
            // Updating the attendance
            const { data, error } = await supabase
            .from("attendance")
            .insert(updateAttendance)

            if(error){
                console.log(error);
                return responseObj.responseJson(response, 401, "false", error.status);
            }

            return response.status(200).json({
                "success": "true",
                "message": "Attendance marked successfully!"
            });
        } catch (error) {
            return responseObj.responseJson(response, 500, "false", error.message);
        }
    }
}