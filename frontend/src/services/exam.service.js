import http from "../http-common";

class ExamDataService {

    findAllUser() {
        return http.get(`/exams/user/`);
    }
    
    findByState(state) {
        return http.get(`/exams/state/${state}`);
    }

    findByUser(userId) {
        return http.get(`/exams/user/${userId}`)
    }

    findByUserAndState(userId, state){
        return http.get(`/exams/userAndState/${userId}/${state}`)
    }

    findAll() {
        return http.get("/exams");
    }
    
    findOne(id) {
        return http.get(`/exams/${id}`);
    }
    
    
    update(id, data) {
        return http.put(`/exams/${id}`, data);
    }
    
}
    
export default new ExamDataService();
    