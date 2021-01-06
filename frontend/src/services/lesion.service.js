import http from "../http-common";

class LesionDataService {

    findAll() {
        return http.get(`/GA/all`);
    }
    
    findByGA(gaID) {
        return http.get(`/lesions/gaID/${gaID}`);
    }

    findByLabel(label){
        return http.get(`/lesions/label/${label}`);
    }

    create(data, gaID){
        return http.post(`/lesions/${gaID}`, data);
    }

    findOne(id) {
        return http.get(`/lesions/id/${id}`);
    }
    
}
    
export default new GADataService();