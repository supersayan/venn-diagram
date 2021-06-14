const options = {

}

/**
 * 
 * @param {array} input 
 * @param {number} numToChoose 
 */
function combinations(input, numToChoose) {
    let result = [];

    const r = [];
    result.length = numToChoose; //n=2

    function combine(input, len, start=0) {
        if (len === 0) {
            result.append(r); //process here the result
            return;
        }
        for (let i = start; i <= input.length - len; i++) {
            r[r.length - len] = input[i];
            combine(input, len-1, i+1);
        }
    }

    combine( input, r.length, 0);
    return result;
}

const array = [0, 1, 2, 3];


var sets = [{sets : [0], label : '[ 1, 2, 3, 4, 5, 6 ]', size : 50,}, 
            {sets : [1], label : '[ 1, 2, 3, 4, 5, 6 ]', size: 50},
            {sets : [2], label : '[ 1, 2, 3, 4, 5, 6 ]', size : 100}, 
            {sets : [3], label : '[ 1, 2, 3, 4, 5, 6 ]', size: 100},
            {sets : [0,1], size:1},
            {sets : [0,2], size:1},
            {sets : [0,3], size:14},
            {sets : [1,2], size:6},
            {sets : [1,3], size:0},
            {sets : [2,3], size:1},
            {sets : [0,2,3], size:1},
            {sets : [0,1,2], size:0},
            {sets : [0,1,3], size:0},
            {sets : [1,2,3], size:0},
            {sets : [0,1,2,3], size:0}
            ];

var chart = venn.VennDiagram()
                 .width(600)
                 .height(400);

var div = d3.select("#venn");
div.datum(sets).call(chart);

// Tooltip
// add a tooltip
var tooltip = d3.select("body").append("div").attr("class", "venntooltip");

// add listeners to all the groups to display tooltip on mouseover
div.selectAll("g")
    .on("mouseover", function(d, i) {
        // sort all the areas relative to the current item
        venn.sortAreas(div, d);

        // Display a tooltip with the current size
        tooltip.transition().duration(400).style("opacity", .9);
        tooltip.text(d.size + " users");
        
        // highlight the current path
        var selection = d3.select(this).transition("tooltip").duration(400);
        selection.select("path")
            .style("stroke-width", 3)
            .style("fill-opacity", d.sets.length == 1 ? .4 : .1)
            .style("stroke-opacity", 1);
    })
    .on("mousemove", function() {
        tooltip.style("left", (d3.event.pageX) + "px")
               .style("top", (d3.event.pageY - 28) + "px");
    })
    .on("mouseout", function(d, i) {
        tooltip.transition().duration(400).style("opacity", 0);
        var selection = d3.select(this).transition("tooltip").duration(400);
        selection.select("path")
            .style("stroke-width", 0)
            .style("fill-opacity", d.sets.length == 1 ? .25 : .0)
            .style("stroke-opacity", 0);
    });