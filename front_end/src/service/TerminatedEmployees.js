export default class TerminatedEmployees{
    getTerminate() {
        return fetch('demo/data/terminated-employees.json')
            .then((res) => res.json())
            .then((d) => d.data);
    }
}