export default class ViolationData{
    getViolationData(){
        return fetch('demo/data/violation.json')
            .then((res) => res.json())
            .then((d) => d.data);
    }
}