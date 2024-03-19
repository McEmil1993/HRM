export default class Time_In_Out {
    getTime_In_Out() {
        return fetch('demo/data/time-in-out.json')
            .then((res) => res.json())
            .then((d) => d.data);
    }
}