import moment from "moment";

//TODO: set format in moment
export default function formatDate (value) {
    if (value) {
        if (typeof value === "object"){
            return moment(value.date).format("DD.MM.YYYY");
        }else{
            return moment(String(value)).format("DD.MM.YYYY");
        }
    }
}
