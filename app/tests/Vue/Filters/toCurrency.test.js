import toCurrency from "../../../resources/js/filters/toCurrency";


describe("to currency filter", () => {
    it ("displays number in correct currency format", () =>{
        expect(toCurrency(120)).toEqual("120,00 €");
    });

    it ("displays hyphen if value is not a number", () =>{
        expect(toCurrency("Not a number")).toEqual("-");
    });
});
