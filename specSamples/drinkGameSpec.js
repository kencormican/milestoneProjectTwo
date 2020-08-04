describe("Drinking Game", function() {

    describe("whatCanIDrink function", function() {
        it("should return Error message if age less than 0 entered", function() {
            expect(whatCanIDrink(-25)).toBe("Sorry. I can’t tell what drink because that age is incorrect!");
        });
        it("should return Drink Toddy if age greater than 0 but less than 14 entered", function() {
            expect(whatCanIDrink(12)).toBe("Drink Toddy");
        });

        it("should return Drink Coke if age greater than 14 but less than 18 entered", function() {
            expect(whatCanIDrink(16)).toBe("Drink Coke");
        });
        it("should return Drink Beer if age greater than 18 but less than 21 entered", function() {
            expect(whatCanIDrink(19)).toBe("Drink Beer");
        });
        it("should return Drink Whiskey if age greater than 21 but less than 130 entered", function() {
            expect(whatCanIDrink(88)).toBe("Drink Whiskey");
        });
        it("should return Error message if number not entered", function() {
            expect(whatCanIDrink("BillyBob")).toBe("Sorry. I can’t tell what drink because that age is incorrect!");
        });

	});
});
