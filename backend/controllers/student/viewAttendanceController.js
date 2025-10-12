import supabase from "../../supabase-client.js";
import { responseObj } from "../../utils/responseJson.js";

class final_data {
    constructor(rollNo, subject_name, teacher_name, no_of_classes_attended, total_hours_of_course) {
        this.rollNo = rollNo;
        this.subject_name = subject_name;
        this.teacher_name = teacher_name;
        this.no_of_classes_attended = no_of_classes_attended;
        this.total_hours_of_course = total_hours_of_course;
    }
}

async function getTeacherName(teacher_id) {
    const {data: teacher_data, error: teacher_name_error} = await supabase.from("teachers")
                                                                        .select("teacher_name")
                                                                        .eq("teacher_id", teacher_id);

    if(teacher_name_error) {
        responseObj.responseJson(response, 401, "false", teacher_name_error.status);
    }

    return teacher_data[0].teacher_name;
    
}

export const viewAttendanceContoller = {
    viewAttendance: async (request, response) => {
        try {
            const {rollNo}= request.query;
            
            const { data: attendance_data, error: attendance_error } = await supabase
                                                                            .from("attendance_summary")
                                                                            .select("*")
                                                                            .eq("student_id", rollNo);
            
            if (attendance_error) {
                return responseObj.responseJson(response, 401, "false", attendance_error.message);
            }
            
            let attendanceMap = new Map();
            let enrollment_ids = [];
            for (let i = 0; i < attendance_data.length; i++) {
                enrollment_ids.push(attendance_data[i].enrollment_id);
                attendanceMap.set(attendance_data[i].enrollment_id, attendance_data[i].total);
            }
            
            const { data: enrollment_data, error: enrollment_error } = await supabase
                .from("enrollments")
                .select("*")
                .in("enrollment_id", enrollment_ids);
            
            if (enrollment_error) {
                return responseObj.responseJson(response, 401, "false", enrollment_error.message);
            }
            
            let course_ids = [];
            for (let i = 0; i < enrollment_data.length; i++) {
                course_ids.push(enrollment_data[i].course_id);
            }
            
            const { data: course_data, error: course_error } = await supabase
                .from("course")
                .select("*")
                .in("course_id", course_ids);

                console.log(course_data);
            
            if (course_error) {
                return responseObj.responseJson(response, 401, "false", course_error.message);
            }
            
            let courseMap = new Map();
            let subject_ids = [];
            for (let i = 0; i < course_data.length; i++) {
                subject_ids.push(course_data[i].subject_id);
                courseMap.set(course_data[i].course_id, {
                    subject_id: course_data[i].subject_id,
                    teacher_name: course_data[i].teacher_name,
                    current_hours: course_data[i].current_hours
                });
            }
            
            const { data: subject_data, error: subject_error } = await supabase
                .from("subject")
                .select("*")
                .in("subject_id", subject_ids);
            
            if (subject_error) {
                return responseObj.responseJson(response, 401, "false", subject_error.message);
            }
            
            let subjectMap = new Map();
            for (let i = 0; i < subject_data.length; i++) {
                subjectMap.set(subject_data[i].subject_id, subject_data[i].subject_name);
            }
            
            let data = [];
            for (let i = 0; i < course_data.length; i++) {
                let course = course_data[i];
                let teacher_id = course.teacher_id;
                let teacher_name = await getTeacherName(teacher_id);
                const subjectName = subjectMap.get(course.subject_id);
                const classesAttended = attendanceMap.get(enrollment_data[i].enrollment_id);
                
                data.push(new final_data(
                    rollNo,
                    subjectName,
                    teacher_name,
                    classesAttended,
                    course.current_hours
                ));
                
            }
            
            console.log(data);
            return responseObj.responseJson(response, 200, "true", data);
        } catch (error) {
            return responseObj.responseJson(response, 500, "false", error.message);
        }
    }
}