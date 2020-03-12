export default function toCurrency (value) {
    if (typeof value !== "number") {
        return value;
    }
    var formatter = new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 2
    });
    return formatter.format(value);
}
