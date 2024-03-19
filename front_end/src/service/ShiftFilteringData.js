export default class ShiftFilteringData {
    getShiftFilteringData() {
        return fetch('demo/data/shifts.json')
            .then((res) => res.json())
            .then((d) => d.data);
    }
}
