//osmdown-base
//============
//Helper functions and formatters for all front end display
//

//Define global variables
var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

//D3 Defaults
var margin = {top: 20, right: 20, bottom: 30, left: 75},
  width = 900 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

// This is the standard date that comes out of EPIC-OSM
var parseDate = d3.time.format("%Y-%m-%d %X %Z").parse;

var x = d3.time.scale().range([0, width]);
    y = d3.scale.linear().range([height, 0]);
    xAxis = d3.svg.axis().scale(x).orient("bottom");
    yAxis = d3.svg.axis().scale(y).orient("left");

//Default dateLine: give it a {date: (x) value: (y)}
var dateLine = d3.svg.line()
  .x(function(d) { return x(parseDate(d.date)) })
  .y(function(d) { return y(d.value)})

var COLORS = d3.scale.category20()
