
d3.csv("test_fixture.csv", function(csv){

    test('generate_select', function(){
        var select_options = ["opt1", "opt2", "opt2", "opt3"];
        var unique_options = ["opt1", "opt2", "opt3"];
        var select_name = "name";
        var myselect = generate_select(select_name, select_options);
        equal(myselect.tagName, "SELECT", "returns a select")
        equal(myselect.children.length, unique_options.length+1,
            "options length of unique+1");
        equal(myselect.category, select_name, "has attribute category");
        equal(myselect.children[0].value, select_name, "first option has blank value");
        equal(myselect.children[0].text,select_name, "first option has cat. name");
        for (var i=1; i<myselect.children.length; i++){
            equal(myselect.children[i].value, unique_options[i-1],
                "option "+i+ " is "+unique_options[i-1]);
            equal(myselect.children[i].text, unique_options[i-1],
                "option " +1+ " has text "+unique_options[i-1]);
        };
    })

    test('generate_filters', function(){
        equal(generate_filters(csv).length, 3, "returns one select per column")
    });

    test('get_headings', function(){
        deepEqual(get_headings(csv),['Column1','Column2','Column3'], "doesn't return headings")
    });

    test('rows_to_columns', function(){
        deepEqual(rows_to_columns(csv), {'Column1':['R1C1', 'R2C1', 'R3C1'], 'Column2':['R1C2', 'R2C2', 'R3C2'], 'Column3':['R1C3', 'R2C3', 'R3C3']} )
    });
});

d3.csv("test_filter_fixture.csv", function(csv){

    test('category_filter', function(){
        deepEqual(category_filter(csv,'Make','Datsun'),[
            {'Make':'Datsun', 'Model':'280Z','Year':'1979'},
            {'Make':'Datsun', 'Model':'240Z','Year':'1977'}]);
    });
    test('category_filter', function(){
        deepEqual(category_filter(csv),csv, "Doesn't filter if no categories");
    });
    test('category_filter', function(){
        deepEqual(category_filter(csv,'Make','Make'),csv,
            "Doesn't filter if option is category name");
    });
});

d3.csv("test_population_fixture.csv", function(csv){
    test('Correct aggregate population', function(){
        equal(aggregate_population(csv, "Total", 0).Total,250);
    });
    test('Correct category totals', function(){
        equal(aggregate_population(csv, "Total", ['Short','Medium','Tall']).Short,22.5    );})

});
