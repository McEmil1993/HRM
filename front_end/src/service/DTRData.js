export default class DTRData {
    getDTRData() {
        return fetch('demo/data/dtr.json')
            .then((res) => res.json())
            .then((d) => d.data);
    }
}