export default function toFileSize(value){
    if (isNaN(value)){
        return "undefined size";
    }else{
        const units = [ "byte", "kB", "MB", "GB", "TB"];
        let newValue = value;
        let counter = 0;

        if (newValue >= 1000){
            while (newValue >= 1000){
                newValue = newValue / 1024;
                counter++;
            }
        }

        var formatter = new Intl.NumberFormat("de-DE", {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1
        });
        return formatter.format(newValue) + " " + units[counter];
    }
}
