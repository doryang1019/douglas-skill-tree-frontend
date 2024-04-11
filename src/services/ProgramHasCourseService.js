import http from "../http-common.js"
class ProgramHasCourseService {

    saveOne(data) {
        return http.put("/programHasCourse", data);
    }

}

export default new ProgramHasCourseService;
