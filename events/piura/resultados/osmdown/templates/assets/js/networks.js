//Network Defaults
var width = 960,
    height = 500;

var color = d3.scale.category10();

var force = d3.layout.force()
  .gravity(.15)
  .distance(100)
  .charge(-50)
  .size([width, height]);

//Traverse function finds neighbors and categorizes nodes by group
function traverse(node, group) {
  if (node.neighbors!=undefined){
    if ("group" in node) {
      node.group = Math.min(node.group, group);
    } else {
      node.group = group;
      node.neighbors.forEach(function(d) { traverse(d, group); });
    }
  }
}

function updateLegend(id, data){
  $("#"+id+"-nodeCount").text(data.nodes.length)
  $("#"+id+"-edgeCount").text(data.links.length)
  $("#"+id+"-compCount").text(_.unique(data.nodes, 'group').length-1)
}

function buildNetworkList(network_id, path, files){
  //This will be a table!
  var first = true
  files.forEach(function(file, idx){
    $.getJSON(path+file, function(json,err){
      nodes = json.nodes.length

      if (nodes > 0){
        $("#available-networks-"+network_id +" > tbody:last").append("<tr class='network-list-item network-list-item-"+network_id+"' onClick='drawNetwork(\""+network_id+"\",\""+path+"\",\""+file+"\"); $(this).css(\"background-color\",\"grey\")'>"+
        "<td>"+json.title+"</td>"+
        "<td>"+nodes+"</td>"+
        "<td>"+json.links.length+"</td></tr>")
      }
    })
  })
  $(window).load(function(){
    $("#available-networks-"+network_id).dataTable(
      {paging:false,
       info:false,
       bFilter: false,
       scrollY: 300
      })
  })

}

function drawNetwork(svg_id, path, file){
  //Empty the svg
  d3.selectAll("#"+svg_id+" > *").remove();
  $(".network-list-item-"+svg_id).css('background-color','')

  $.getJSON(path+file, function(json, err){

    json.options = json.options ? json.options : {}

    //Select the network svg
    var svg = d3.select("#"+svg_id)
      .attr("width", width)
      .attr("height", height);

    svg.append("text")
      .attr("x", (width / 2))
      .attr("y", 25)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .text(json.title);

    //Start the layout
    force
      .nodes(json.nodes)
      .links(json.links)
      .start();

    //Get neighbors
    json.links.forEach(function(link) {
      var source = link.source, target = link.target;
      (source.neighbors || (source.neighbors = [])).push(target);
      (target.neighbors || (target.neighbors = [])).push(source);
    });
    json.nodes.forEach(traverse);

    updateLegend(svg_id, json)

    var toggle = 0;
    function highlightNeighbors(){
      if (toggle == 0) {
        d = d3.select(this).node().__data__
        node.style("opacity", function (o) {
            return o.group==d.group ? 1 : 0.1;
        });
        link.style("opacity", function (o) {
            return d.index==o.source.index | d.index==o.target.index ? 1 : 0.1;
        });
        toggle = 1;
      } else {
          //Put them back to opacity=1
          node.style("opacity", 1);
          link.style("opacity", 1);
          toggle = 0;
      }
    }

    if (json.options.directed==true){
      var link = svg.selectAll(".link")
        .data(json.links)
        .enter().append("line")
          .attr("class", "link")
          .style("stroke-width", function(d) { return Math.sqrt(d.weight)+1 })
          .style("marker-end",  "url(#suit)") // Modified line
    }else{
      var link = svg.selectAll(".link")
        .data(json.links)
        .enter().append("line")
          .attr("class", "link")
          .style("stroke-width", function(d) { return Math.sqrt(d.weight)+1 })
    }

    //Set up tooltip
    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([0, 0])
        .html(function (d) {
        return  d.id + "";
    })
    svg.call(tip);
//
    var node = svg.selectAll(".node")
      .data(json.nodes)
      .enter().append("circle")
        .attr("class", "node")
        .attr("r", function(d){ return parseInt(Math.sqrt(d.weight)+1)})
        .style("fill", function(d) { if(d.status=="Experienced"){return color(10)}else{ return color(0)}})
        .call(force.drag)
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide)
        .on('dblclick', highlightNeighbors);

    //Directed Links
    if (json.options.directed==true){
      svg.append("defs").selectAll("marker")
          .data(["suit"])
        .enter().append("marker")
          .attr("id", function(d) { return d; })
          .attr("viewBox", "0 -5 10 10")
          .attr("refX", 25)
          .attr("refY", 0)
          .attr("markerWidth", 6)
          .attr("markerHeight", 6)
          .attr("orient", "auto")
        .append("path")
          .attr("d", "M0,-5L10,0L0,5 L10,0 L0, -5")
          .style("stroke", "#4679BD")
          .style("opacity", "0.6");
    }

    force.on("tick", function() {
      link.attr("x1", function(d) { return d.source.x; })
          .attr("y1", function(d) { return d.source.y; })
          .attr("x2", function(d) { return d.target.x; })
          .attr("y2", function(d) { return d.target.y; });

      node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
    });
  });
}
