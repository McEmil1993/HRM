export default class EmployeesFilteringData {
    getEmployeesFilteringData() {
        return fetch('demo/data/employees_filteringdata.json')
            .then((res) => res.json())
            .then((d) => d.data);
    }
}
