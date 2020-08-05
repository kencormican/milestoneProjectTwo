describe("CovidTracker", function() {   


    beforeAll(function() {
        test = new fetchCSVData(processCSVData);     
    //console.log("test is inside: ", test);   
    });

    //spyOn(fetchCSVData, processCSVData)
    
  

    describe("Within the processCSVData function", function() {
        //console.log(arrayTest);
        it("the first item in the parsedCountyDataArray should return County if processCSVData has iterated through the CSV Get data correctly", function() {
            expect(test[0][0]).toContain("County");
        });

	});
});
