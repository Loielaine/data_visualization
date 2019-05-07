var data = [];
var USER_SEX = "2",
    USER_RACESIMP = "1",
    USER_AGEGRP = "2";

var category_colors = {
    // TODO implement this based on what we did in class
    "married": "rgb(91, 123, 233)",
    "children": "rgb(224, 210, 46)",
    "healthcare": "rgb(44, 206, 246)",
    "college": "rgb(251, 127, 35)",
    "employed": "rgb(214, 60, 163)",
    "selfemp": "rgb(195, 128, 20)",
    "publictrans": "rgb(226, 64, 98)",
    "income_moremed":"rgb(91, 185, 35)",
    "inpoverty": "rgb(85, 85, 85)",
    "isveteran": "rgb(177, 144, 208)",
    "bornoutus": "rgb(188, 200, 50)",
    "diffmovecog": "rgb(238, 123, 156)",
    "diffhearvis": "rgb(242, 153, 179)",
    "widowed": "rgb(1, 217, 159)"
}

$(document).ready(function () {
    loadData();
    wireButtonClickEvents();
});

// Loads the CSV file 
function loadData() {
    // load the demographics.csv file    
    // assign it to the data variable, and call the visualize function by first filtering the data
    // call the visualization function by first findingDataItem
     d3.csv("data/demographics.csv",(d)=>{
            data=d;
            data.forEach((item)=>{
                 item.v = parseInt(item.v);
            });
            visualizeSquareChart(findDataItem());
        });
}

// Finds the dataitem that corresponds to USER_SEX + USER_RACESIMP + USER_AGEGRP variable values
function findDataItem() {
    // you will find the SINGLE item in "data" array that corresponds to 
    //the USER_SEX (sex), USER_RACESIMP (racesimp), and USER_AGEGRP(agegrp) variable values
    //HINT: uncomment and COMPLETE the below lines of code
    var item = data.filter(function (d){
     // WHAT GOES HERE?
     if((d.sex == USER_SEX)&&(d.racesimp==USER_RACESIMP)&&(d.agegrp==USER_AGEGRP))
     {return d;}
    });
    if (item.length == 1) {
        return item[0];
    }
    return null;
}

//Pass a single dataitem to this function by first calling findDataItem. visualizes square chart
function visualizeSquareChart(item) {
    // visualize the square plot per attribute in the category_color variable
    var margin = {top:10,right:10,bottom:10,left:10};
    var width = 130;
    var height = 150;
    //HINT: you will iterate through the category_colors variable and draw a square chart for each item
    var fields = d3.keys(category_colors)
    fields.forEach((v,i)=>{
    // create svg
    var div = d3.select("#chart1")
                .append("div")
                .attr("class",".four.columns")
                .attr("id", "field"+v);
    d3.select("#field" + v).append("h3").html(v);
    var svg = d3.select("#field" + v).append("svg")
    .attr("width",width+margin.left+margin.right)
    .attr("height",height+margin.top+margin.bottom)

    // draw background rectangles
    rectWidth = 12.1
    rectHeight = 12.1
    rects = svg.selectAll("rect")
            .data(d3.range(100))
            .enter()
            .append("rect")
            .attr("x", (d, i) => rectWidth * (i % 10))
            .attr("y", (d, i) => rectWidth * Math.floor(i / 10))
            .attr("height", rectHeight)
            .attr("width", rectWidth)
            .attr("stroke", "white")
            .attr("fill", function(d,i){
                        if (i >(99 - item[v])){
                            return category_colors[v]
                        }
                        else
                        {return "rgb(224, 224, 224)"}
                    })
            .attr("transform", "translate(0,10)") 

    })

    // Update the count div whose id is "n" with item.total    

   d3.select("#n").html(item.total);   


}


//EXTRA CREDITS
function wireButtonClickEvents() {
    // We have three groups of button, each sets one variable value. 
    //The first one is done for you. Try to implement it for the other two groups

    //SEX
    d3.selectAll("#sex .button").on("click", function () {
        USER_SEX = d3.select(this).attr("data-val");
        d3.select("#sex .current").classed("current", false);
        d3.select(this).classed("current", true);
        $("#chart1").empty();
        // TODO: find the data item and invoke the visualization function
         visualizeSquareChart(findDataItem());
    });
    // RACE
    d3.selectAll("#agegrp .button").on("click", function () {
        USER_AGEGRP = d3.select(this).attr("data-val");
        d3.select("#agegrp .current").classed("current", false);
        d3.select(this).classed("current", true);
        $("#chart1").empty();
        visualizeSquareChart(findDataItem());
    });
    //AGEGROUP
    d3.selectAll("#racesimp .button").on("click", function () {
        USER_RACESIMP = d3.select(this).attr("data-val");
        d3.select("#racesimp .current").classed("current", false);
        d3.select(this).classed("current", true);
        $("#chart1").empty();
        visualizeSquareChart(findDataItem());
    });

}