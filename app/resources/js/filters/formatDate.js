import moment from "moment";

export default function toCurrency (value) {
    if (value) {
        return moment(String(value)).format("DD.MM.YYYY");
    }
}
