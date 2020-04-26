export default function toCurrency (value) {
    if (isNaN(value)){
        return "-";
    } else {
        const formatter = new Intl.NumberFormat(
            "de-DE",
            {
                style: "currency",
                currency: "EUR",
                minimumFractionDigits: 2
            }
        );
        return formatter.format(value);
    }
}
