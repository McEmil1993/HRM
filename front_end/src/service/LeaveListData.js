export default class LeaveListData{
    getLeaveListData(){
        return fetch('demo/data/leave_listData.json')
            .then((res) => res.json())
            .then((d) => d.data);
    }
}