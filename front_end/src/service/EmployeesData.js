export default class EmployeesData {
    getEmployeesData() {
        return fetch('demo/data/employees.json')
            .then((res) => res.json())
            .then((d) => d.data);
    }
}