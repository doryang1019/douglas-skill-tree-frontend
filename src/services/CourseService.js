import http from "../http-common.js"
class CourseService{
    getAllCourse(programId, userId){
        if(String(programId) !== "undefined" && String(programId) !== "null") {
            return http.get(`/course?program=${programId}&userId=${userId}`);
        } else {
            return http.get(`/course?userId=${userId}`);
        }

    }
    getCourseByKey(inputkey, programId, userId){
        console.log("programIdkey" + programId);
        return http.get(`/course?key=${inputkey}&program=${programId ? programId : ""}&userId=${userId}`);
    }
    getCourseUserStatus(courseID, userID){
        return http.get(`/course/${courseID}/${userID}`)
    }
    addCourse(data){
        return http.post("/course", data);
    }
    updateCourse(data,courseid){
        return http.put(`/course/${courseid}`,data)
    }
    deleteCourse(courseid){
        return http.delete(`/course/${courseid}`)
    }
    getUnformatCourse() {
        return http.get(`/course/all`);
    }
    getUpperCourse(courseId) {
        return http.get(`/course/nonUpper?courseId=${courseId}`);
    }
    getCoursesByProgram(programId, userId){
        return http.get(`/course/status/${programId}/${userId}`)
    }
    updateCourseStatus(courseId, userId, isTaken, isDone){
        return http.put(`/course?courseId=${courseId}&userId=${userId}&isTakenStatus=${isTaken}&isDoneStatus=${isDone}`)
    }
}

export default new CourseService();
