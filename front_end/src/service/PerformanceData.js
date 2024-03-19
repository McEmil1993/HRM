export default class PerformanceData {
    getPerformanceData() {
        return fetch('demo/data/performanceData.json')
            .then((res) => res.json())
            .then((d) => d.data);
    }
}
