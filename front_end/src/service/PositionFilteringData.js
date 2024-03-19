export default class PositionFilteringData {
    getPositionFilteringData() {
        return fetch('demo/data/position_filteringdata.json')
            .then((res) => res.json())
            .then((d) => d.data);
    }
}
