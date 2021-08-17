import index from "../index"

describe("query string", () => {
    it("should check the error array is empty", () => {
        const errors: Array<string> = []
        index.testFileName('fjord', errors)
        expect(errors.length).toEqual(0)

    })
    it("should check the error array has an error ", () => {
        const errors: Array<string> = []
        index.testFileName('', errors)
        expect(errors.length).toEqual(1)
    })
})