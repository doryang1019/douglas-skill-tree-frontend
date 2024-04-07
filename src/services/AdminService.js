import http from "../http-common.js"
class AdminService{
    getAllCourse(){
        return http.get(`/course`);
    }
    getCourseByKey(inputkey){
        return http.get(`/course?key=${inputkey}`);
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


}

export default new AdminService();