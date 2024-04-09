import http from "../http-common.js"
class ProgramService {

    getAllPrograms() {
        return http.get("/program");
    }

}

export default new ProgramService;
