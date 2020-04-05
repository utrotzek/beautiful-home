export default function toFileSize(value){
    const units = [ "kB", "MB", "GB", "TB"];

    let newValue = value;
    let counter = 0;

    if (newValue >= 1000){
        while (newValue >= 1000){
            newValue = newValue / 1024;
            counter++;
        }
    }

    var formatter = new Intl.NumberFormat("de-DE", {
        maximumFractionDigits: 1
    });
    return formatter.format(newValue) + " " + units[counter];
}
