import moment from "moment";
import _ from "lodash";

//TODO: set format in moment
export default function formatDate (value, format = "dd.mm.YYYY") {
    if (value) {
        if (typeof value === "object"){
            if (_.has(value, "date")){
                return moment(value.date).format("DD.MM.YYYY");
            }else{
                return moment(value).format("DD.MM.YYYY");
            }
        }else{
            if (!format){
                return "no valid date format given!";
            }else{
                return moment(String(value), format).format("DD.MM.YYYY");
            }
        }
    }
}
