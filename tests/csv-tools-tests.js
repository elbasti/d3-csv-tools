
d3.csv("test_fixture.csv", function(csv){

    test('generate_select', function(){
        var select_options = ["opt1", "opt2", "opt2", "opt3"];
        var unique_options = ["opt1", "opt2", "opt3"];
        var select_name = "name";
        var myselect = generate_select(select_name, select_options);
        equal(myselect.tagName, "SELECT", "returns a select")
        equal(myselect.children.length, unique_options.length,
            "options same length as unique");
        for (var i=0; i<myselect.children.length; i++){
            equal(myselect.children[i].value, unique_options[i],
                "option "+i+ " is "+unique_options[i]);
            equal(myselect.children[i].text, unique_options[i],
                "option " +1+ " has text "+unique_options[1]);
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
