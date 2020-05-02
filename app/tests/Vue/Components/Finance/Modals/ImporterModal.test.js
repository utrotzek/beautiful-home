import {shallowMount} from "@vue/test-utils";
import importerModal from "../../../../../resources/js/components/Finance/Modals/ImporterModal";
import PeriodFixtures from "../Fixtures/PeriodFixtures";
import ImportDataFixtures from "../Fixtures/ImportDataFixtures";

import Vue from "vue";
import moxios from "moxios";

describe("accounting and planning connection modal", () => {
    let wrapper = null;

    beforeEach(async () => {
        moxios.install(window.axios);
        wrapper = shallowMount(importerModal,{
            propsData: {
                show: true,
                period: PeriodFixtures[0]
            }
        });
    });

    afterEach( () => {
        moxios.uninstall(window.axios);
    });

    it ("renders properly", async () => {
        expect(wrapper.element).toMatchSnapshot();
    });

    it ("can select a file", async () => {
        //mainly adopted from here https://zaengle.com/blog/mocking-file-upload-in-vue-with-jest
        const event = {
            target: {
                files: [
                    {
                        name: "My fixture file",
                        size: 50000,
                    }
                ]
            }
        };

        // Mock FileReader.readAsDataURL() to be a function that returns null
        const fileReaderSpy = jest.spyOn(FileReader.prototype, "readAsDataURL").mockImplementation(() => null);

        // Manually trigger the component’s onChange() method
        wrapper.vm.onFileSelect(event);

        // Assert that the FileReader object was called with the uploaded image
        expect(fileReaderSpy).toHaveBeenCalledWith(event.target.files[0]);
    });

    it ("file can be uploaded and next step will be loaded", async (done) => {
        await setFileFixtures();
        wrapper.find(".upload").trigger("click");
        await Vue.nextTick();

        expect(wrapper.emitted().loading).toBeTruthy();

        moxios.wait(() => {
            let request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: ImportDataFixtures
            }).then(function () {
                expect(wrapper.emitted().loadingCompleted).toBeTruthy();
                expect(wrapper.vm.step).toEqual(2);
                done();
            });
        });
    });

    it ("previous step can be loaded", async () => {
        await setStepOneFixtures();
        wrapper.find(".back").trigger("click");
        expect(wrapper.vm.step).toEqual(1);
    });

    it ("can trigger import", async (done) =>{
        await setStepOneFixtures();

        wrapper.find(".start-import").trigger("click");
        await Vue.nextTick();

        moxios.wait(() => {
            let request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
            }).then(function () {
                expect(wrapper.emitted().loadingCompleted).toBeTruthy();
                expect(wrapper.emitted().dataImported).toBeTruthy();

                expectClosedData();
                done();
            });
        });
    });

    it ("can be closed", async () => {
        wrapper.setData(
            {
                step: 3,
                accountingImport: ImportDataFixtures,
                file: {
                    data: "This is a file",
                    name: "testFile.csv",
                    extension: ".csv",
                    size: 2048
                }
            }
        );
        wrapper.find(".close").trigger("click");
        await Vue.nextTick();

        expectClosedData();
    });

    async function setStepOneFixtures() {
        await setFileFixtures();
        wrapper.vm.step = 2;
        wrapper.vm.accountingImport = ImportDataFixtures;
        await Vue.nextTick();
    }

    async function setFileFixtures() {
        wrapper.setData(
            {
                file: {data: "This is a file"}
            }
        );
    }

    function expectClosedData() {
        expect(wrapper.vm.step).toEqual(1);
        expect(wrapper.vm.accountingImport).toEqual(null);
        expect(wrapper.vm.file).toEqual({
            data: "",
            name: "",
            extension: "",
            size: 0
        });
        expect(wrapper.emitted().close).toBeTruthy();
    }
});
