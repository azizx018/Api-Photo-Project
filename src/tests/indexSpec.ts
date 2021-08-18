import index from "../index"

describe("query string", () => {
    it("should check the error array is empty", () => {
        const errors: Array<string> = []
        index.testFileName('fjord', errors)
        expect(errors.length).toEqual(0)

    });
    it("should check the error array has an error ", () => {
        const errors: Array<string> = []
        index.testFileName('', errors)
        expect(errors.length).toEqual(1)
    });

})

it("should check the error array for height and width is empty", () => {
    const errors: Array<string> = []
    index.testQueryStringNumber('200', 'message-here', errors)
    expect(errors.length).toEqual(0)
})
it("should check the error array for height and width has an error", () => {
    const errors: Array<string> = []
    index.testQueryStringNumber('', 'message-here', errors)
    expect(errors.length).toEqual(1)
})
it("checks if the file already is loaded in the full folder", () => {
    const photoDir = __dirname + '/photos/'
    const fullDir = photoDir + 'full/'
    const errors: Array<string> = []
    const fileName = " "
    index.checkIfTheFileAlreadyExists(fullDir, fileName, errors)
    expect(errors.length).toEqual(1)


})