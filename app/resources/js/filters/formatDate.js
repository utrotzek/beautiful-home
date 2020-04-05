import moment from "moment";

export default function toCurrency (value) {
    if (value) {
        if (typeof value === "object"){
            return moment(value.date).format("DD.MM.YYYY");
        }else{
            return moment(String(value)).format("DD.MM.YYYY");
        }
    }
}
