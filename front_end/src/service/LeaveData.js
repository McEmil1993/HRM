export default class LeaveData {
    getLeaveData() {
        return fetch('demo/data/leavedata.json')
            .then((res) => res.json())
            .then((d) => d.data);
    }
}
