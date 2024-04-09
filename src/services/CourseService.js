import http from "../http-common.js"
class CourseService{
    getAllCourse(programId){
        if(String(programId) !== "undefined" && String(programId) !== "null") {
            return http.get(`/course?program=${programId}`);
        } else {
            return http.get(`/course`);
        }

    }
    getCourseByKey(inputkey, programId){
        console.log("programIdkey" + programId);
        return http.get(`/course?key=${inputkey}&program=${programId ? programId : ""}`);
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


}

export default new CourseService();
