$.getJSON('json/top_new_node_tags.json', function(data){
  //Cool -- we've loaded the data!  Now we can use it for something... like d3!

  var toGraph = []
  var toBar   = {}

  _.values(data)[0].slice(0,8).forEach(function(tagSet){
    var thisEntry = {title : tagSet[0], data : [] }
    var sum = 0;
    Object.keys(tagSet[1].dates).forEach(function(date){
      sum += tagSet[1].dates[date]
      thisEntry.data.push({date: date, value: sum})
    })
    toBar[tagSet[0]] = _.sortBy(_.collect(tagSet[1].values, function(val, key){ return {label: key, value: val} }),function(x){return -x.value}).slice(0,10);
    toGraph.push(thisEntry)
  })

  function loadNodeStats(args){
    d3.select("#node_values_bar_chart").selectAll("g").remove()

    var margin = {top: 0, right: 0, bottom: 100, left: 50},
        width = 300  - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;
        data = toBar[args.key]

    var y = d3.scale.linear().range([height, 0]);

    var nodeValuesChart = d3.select("#node_values_bar_chart")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var barWidth = width / data.length;

    var bar = nodeValuesChart.selectAll("g")
      .data(data)
      .enter().append("g")
      .attr("transform", function(d, i) { return "translate(" + i * barWidth + ",0)"; });

    y.domain([0, d3.max(data, function(d) { return d.value; })]);

    bar.append("rect")
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); })
      .attr("width", barWidth - 1)
      .style("fill", args.color);

    nodeValuesChart.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")

    bar.append("text")
        .attr("dy", -(barWidth/2)+3)
        .attr("dx", height+2)
        .attr("transform", function(d) {
                return "rotate(90)"
                })
        .text(function(d) { return d.label; });

    nodeValuesChart.append("text")
      .attr("x", (width / 2))
      .attr("y", 25)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .text("Top Values for: "+args.key);
  }

  var nodeTagChart = d3.select("#node_tags_date_chart")
     .attr("width", width + margin.left + margin.right)
     .attr("height", height + margin.top + margin.bottom)
     .append("g")
     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  x.domain(d3.extent(toGraph[0].data, function(d) { return parseDate(d.date); }));
  y.domain(d3.extent(toGraph[0].data, function(d) { return d.value; }));

  //Add the x Axis
  nodeTagChart.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  //Add the y Axis
  nodeTagChart.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")

  toGraph.forEach(function(line, index){
    nodeTagChart.append("path")
      .datum(line.data)
      .attr("data-legend",line.title)
      .attr("id", line.title)
      .attr("class", "fatline")
      .style("stroke",COLORS(index))
      .attr("d", dateLine)
      .on('mouseenter', function(){
        d3.select(this).style("stroke-width", "5px")
        })
      .on('mouseout', function(){
        d3.select(this).transition().duration(300)
          .style("stroke-width", "3px")
        })
      .on('click', function(){
        loadNodeStats({key: line.title, color: COLORS(index)})
      });
  })

  legend = nodeTagChart.append("g")
    .attr("class","legend")
    .attr("transform","translate(50,30)")
    .style("font-size","12px")
    .call(d3.legend)

  // console.log(data)
})

$.getJSON('json/top_new_way_tags.json', function(data){
  //Cool -- we've loaded the data!  Now we can use it for something... like d3!

  var toGraph = []
  var toBar   = {}

  _.values(data)[0].slice(0,8).forEach(function(tagSet){
    var thisEntry = {title : tagSet[0], data : [] }
    var sum = 0;
    Object.keys(tagSet[1].dates).forEach(function(date){
      sum += tagSet[1].dates[date]
      thisEntry.data.push({date: date, value: sum})
    })
    toBar[tagSet[0]] = _.sortBy(_.collect(tagSet[1].values, function(val, key){ return {label: key, value: val} }),function(x){return -x.value}).slice(0,10);
    toGraph.push(thisEntry)
  })

  function loadWayStats(args){
    d3.select("#way_values_bar_chart").selectAll("g").remove()

    var margin = {top: 0, right: 0, bottom: 100, left: 50},
        width = 300  - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;
        data = toBar[args.key]

    var y = d3.scale.linear().range([height, 0]);

    var wayValuesChart = d3.select("#way_values_bar_chart")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var barWidth = width / data.length;

    var bar = wayValuesChart.selectAll("g")
      .data(data)
      .enter().append("g")
      .attr("transform", function(d, i) { return "translate(" + i * barWidth + ",0)"; });

    y.domain([0, d3.max(data, function(d) { return d.value; })]);

    bar.append("rect")
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); })
      .attr("width", barWidth - 1)
      .style("fill", args.color);

    wayValuesChart.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")

    bar.append("text")
        .attr("dy", -(barWidth/2)+3)
        .attr("dx", height+2)
        .attr("transform", function(d) {
                return "rotate(90)"
                })
        .text(function(d) { return d.label; });

    wayValuesChart.append("text")
      .attr("x", (width / 2))
      .attr("y", 25)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .text("Values for Tag: "+args.key);
  }

  var wayTagChart = d3.select("#way_tags_date_chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  x.domain(d3.extent(toGraph[0].data, function(d) { return parseDate(d.date); }));
  y.domain(d3.extent(toGraph[0].data, function(d) { return d.value; }));

  //Add the x Axis
  wayTagChart.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  //Add the y Axis
  wayTagChart.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")

  toGraph.forEach(function(line, index){
    wayTagChart.append("path")
      .datum(line.data)
      .attr("data-legend",line.title)
      .attr("id", line.title)
      .attr("class", "fatline")
      .style("stroke",COLORS(index))
      .attr("d", dateLine)
      .on('mouseenter', function(){
        d3.select(this).style("stroke-width", "5px")
        })
      .on('mouseout', function(){
        d3.select(this).transition().duration(300)
          .style("stroke-width", "3px")
        })
      .on('click', function(){
        loadWayStats({key: line.title, color: COLORS(index)})
      });
  })
  legend = wayTagChart.append("g")
    .attr("class","legend")
    .attr("transform","translate(50,30)")
    .style("font-size","12px")
    .call(d3.legend)
})
