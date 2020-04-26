import toFileSize from "../../../resources/js/filters/toFileSize";


describe("file size filter", () => {
    it ("can convert a byte integer into kilobytes", () =>{
        expect(toFileSize(1024)).toEqual("1,0 kB");
    });

    it ("can convert a byte integer into megabytes", () =>{
        expect(toFileSize(13841203)).toEqual("13,2 MB");
    });

    it ("displays text if not a number was given", () =>{
        expect(toFileSize("this is not a number")).toEqual("undefined size");
    });
});
