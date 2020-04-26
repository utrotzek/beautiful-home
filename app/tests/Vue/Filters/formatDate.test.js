import formatDate from "../../../resources/js/filters/formatDate";

describe("format date filter", () => {
    it ("can format a given date object", () =>{
        //month is zero bases  (januar = 0, februar = 1 and so on :/)
        const d  = new Date(3000, 0, 1);
        expect(formatDate(d)).toEqual("01.01.3000");
    });

    it ("can format a given string dates", () =>{
        expect(formatDate("01.01.3000")).toEqual("01.01.3000");
    });

    it ("can format a given string with a custom format", () =>{
        expect(formatDate("01 - 3000 - 01", "DD - YYYY - MM")).toEqual("01.01.3000");
    });

    it ("displays an error if no date format was given", () =>{
        expect(formatDate("01.01.3000", "")).toEqual("no valid date format given!");
    });
});
