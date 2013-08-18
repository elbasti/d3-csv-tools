//Requires d3.js 
//A couple functions that help when playing around with csv files
//The "Generate Filters" is obviously inefficient for production but is good for exploration

function get_headings(csv){
// returns the column names of a csv file
    return Object.keys(csv[0])
}

function generate_select(name, values){
// returns a select with unique row values as options
   var select = document.createElement('select'); 
   var options = d3.set(values).values();
       options.forEach(function(d) {
           var opt = select.appendChild(document.createElement("option"));
           opt.value = d;
           opt.text = d;
       });
   select.category = name;
   defaultOption = document.createElement("option");
   defaultOption.value = name;
   defaultOption.text = name;
   defaultOption.selected = true;
   select.insertBefore(defaultOption, select.firstChild);
   return select
}

function generate_filters(csv){
// returns a select for every column, with unique values as options
    var headings = get_headings(csv);
    var filters = []
    var data = rows_to_columns(csv);
    headings.forEach(function(d,i){
        filters.push(generate_select(headings[i],data[headings[i]]));
    });

    return filters;
}

function rows_to_columns(csv){
    var headings = get_headings(csv);
    var columns = {}
    // Create an empty array per heading
    headings.forEach(function(d){
        columns[d] = [];
    });
    // Populate each heading's array
    csv.forEach( function(row){
        headings.forEach(function(heading){
           columns[heading].push(row[heading]);
        });
     });
    return columns
}

function category_filter(data, category, value){
//Returns a dataset in which all elements have 'category':value

   if (value==category){
       return data;
   };

   var nested = d3.nest()
       .key(function(d) {return d[category]; })
       .map(data, d3.map);

   var filtered = nested.get(value);
   return filtered
}
