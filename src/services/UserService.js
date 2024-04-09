import http from "../http-common.js"
class UserService{
    login(data){
        return http.post("/user/login", data);
    }
    addUser(userName, password, isAdmin, program) {
        return http.post("/user/add", {userName, password,isAdmin, programId: program});
    }

}

export default new UserService();
