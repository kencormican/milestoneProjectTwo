describe("Ireland Covid Tracker", function() {

    describe("Within the parseIrelandData function", function() {
        it("the first item in the irelandDataToArray should return Date if parseTableHeaders has iterated through the API response data correctly", function() {
            expect(irelandDataToArray[0][0]).toContain("Date");
        });

	});
});
