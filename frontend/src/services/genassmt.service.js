import http from "../http-common";

class GADataService {

    findAll() {
        return http.get(`/GA/all`);
    }
    
    findByExam(examID) {
        return http.get(`/GA/exam/${examID}`);
    }

    findGAbyExamID(examID){
        return http.get(`/GA/GAexam/${examID}`);
    }

    create(data, examID){
        return http.post(`/GA/${examID}`, data);
    }

    findAllPublished(){
        return http.get(`/GA/published`);
    }

    findAllExamByGeneralState(generalstate){
        return http.get(`/GA/generalstate/${generalstate}`);
    }

    findAllExamByQuality(quality){
        return http.get(`/GA/quality/${quality}`);
    }

    findAllExamBybonestate(bonestate){
        return http.get(`/GA/bonestate/${bonestate}`);
    }

    findAllExamBycartstate(cartstate){
        return http.get(`/GA/cartstate/${cartstate}`);
    }

    findAllExamBymenstate(menstate){
        return http.get(`/GA/menstate/${menstate}`);
    }

    findAllExamByligstate(ligstate){
        return http.get(`/GA/ligstate/${ligstate}`);
    }

    findOne(id) {
        return http.get(`/GA/id/${id}`);
    }
    
    update(id, data) {
        return http.put(`/exams/${id}`, data);
    }
    
}
    
export default new GADataService();
    