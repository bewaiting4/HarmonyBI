function createV4SelectableForceDirectedGraph(svg, graph) {
    // if both d3v3 and d3v4 are loaded, we'll assume
    // that d3v4 is called d3v4, otherwise we'll assume
    // that d3v4 is the default (d3)
    if (typeof d3v4 == 'undefined')
        d3v4 = d3;

    // https://github.com/wbkd/d3-extended
    d3v4.selection.prototype.moveToFront = function() {  
      return this.each(function(){
        this.parentNode.appendChild(this);
      });
    };
    d3v4.selection.prototype.moveToBack = function() {  
        return this.each(function() { 
            var firstChild = this.parentNode.firstChild; 
            if (firstChild) { 
                this.parentNode.insertBefore(this, firstChild); 
            } 
        });
    };

    var width = +svg.attr("width"),
        height = +svg.attr("height");

    var parentWidth = svg.select('svg').node().parentNode.clientWidth;
    var parentHeight = svg.select('svg').node().parentNode.clientHeight;

    window.NNWidth = parentWidth;

    var svg = svg.select('svg')
    .attr('width', parentWidth)
    .attr('height', parentHeight)

    // remove any previous graphs
    svg.selectAll('.g-main').remove();

    var gMain = svg.append('g')
    .classed('g-main', true);

    var rect = gMain.append('rect')
    .attr('width', parentWidth)
    .attr('height', parentHeight)
    .style('fill', 'white')

    var gDraw = gMain.append('g');

    var min_zoom = 0.1;
    var max_zoom = 7;
    var zoom = d3v4.zoom().
        scaleExtent([min_zoom,max_zoom])
        .on('zoom', zoomed)

    gMain.call(zoom);

    var nominal_base_node_size = 8;
    var nominal_text_size = 10;
    var max_text_size = 24;
    var nominal_stroke = 1.5;
    var max_stroke = 4.5;
    var max_base_node_size = 36;
    var min_zoom = 0.1;
    var max_zoom = 7;
    var text_center = false;
    var size = d3v4.scalePow().exponent(1)
        .domain([1,100])
        .range([8,24]);
    function zoomed() {
        
        var currScale = d3v4.event.transform.k;
        var stroke = nominal_stroke;
        if (nominal_stroke*currScale>max_stroke) stroke = max_stroke/currScale;
        link.style("stroke-width",stroke);
        //circle.style("stroke-width",stroke);
           
        var base_radius = nominal_base_node_size;
        if (!text_center) {
            label.attr("dx", function(d) { 
                return (size(d.size)*base_radius/nominal_base_node_size||base_radius); 
            });
        }
        
        var text_size = nominal_text_size;
        if (nominal_text_size*currScale>max_text_size) text_size = max_text_size/currScale;
        label.style("font-size",text_size + "px");
        gDraw.attr('transform', d3v4.event.transform);
    }



    var color = d3v4.scaleOrdinal(d3v4.schemeCategory20);

    if (! ("links" in graph)) {
        console.log("Graph is missing links");
        return;
    }

    var nodes = {};
    var i;
    for (i = 0; i < graph.nodes.length; i++) {
        nodes[graph.nodes[i].id] = graph.nodes[i];
        graph.nodes[i].weight = 1.01;
    }

    // the brush needs to go before the nodes so that it doesn't
    // get called when the mouse is over a node
    var gBrushHolder = gDraw.append('g');
    var gBrush = null;

    var arrMove = [];

    var link = gDraw.append("g")
        .attr("class", "link")
        .style("stroke", "#999")
        .selectAll("line")
        .data(graph.links)
        .enter().append("line")
        .attr("stroke-width", function(d) { return Math.sqrt(d.value); });

    var label = gDraw.append("g")
        .attr("class", "labels")
        .selectAll("text")
        .data(graph.nodes)
        .enter().append("text")
        .attr("class", "label")
        .style("z-index", function(d) {
            if (d['z-index']) {
                arrMove[d['z-index']] = arrMove[d['z-index']] || []
                arrMove[d['z-index']].push(this);
            }
        })
        .text(function(d) { return d.id; });

    var node = gDraw.append("g")
        .attr("class", "node")
        .selectAll("circle")
        .data(graph.nodes)
        .enter().append("circle")
        .attr("r", function(d) {
            if ('r' in d) {
                return d.r
            } else {
                return 5
            }
        })
        .attr("fill", function(d) { 
            if ('color' in d)
                return d.color;
            else
                return color(d.group); 
        })
        .call(d3v4.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

    arrMove.forEach(function(arr) {
        (arr || []).forEach(function(node) {
            d3v4.select(node).moveToFront()
        })
    })      
    // add titles for mouseover blurbs
    node.append("title")
        .text(function(d) {
            if ('name' in d)
                return d.name;
            else
                return d.id; 
        });

    var manyBody = d3v4.forceManyBody()
            .strength(-30);

    var simulation = d3v4.forceSimulation()
        .force("link", d3v4.forceLink()
                .id(function(d) { return d.id; })
                .distance(function(d) { 
                    return window.NNWidth/12;
                    //var dist = 20 / d.value;
                    //console.log('dist:', dist);

                    return dist; 
                })
              )
        .force("charge", manyBody)
        //.force("charge", null)
        .force("center", d3v4.forceCenter(parentWidth / 2, parentHeight / 2));
        // .force("x", d3v4.forceX(parentWidth/2))
        // .force("y", d3v4.forceY(parentHeight/2));

    simulation
        .nodes(graph.nodes)
        .on("tick", ticked);

    simulation.force("link")
        .links(graph.links);

    function ticked() {
        label.attr("x", function(d) { return d.x-5; })
            .attr("y", function (d) { return d.y-5; })
            .style("font-size", "12px").style("fill", function(d) {return d.color});
        // update node and line positions at every step of 
        // the force simulation
        link.attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        node.attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });
    }

    var brushMode = false;
    var brushing = false;

    var brush = d3v4.brush()
        .on("start", brushstarted)
        .on("brush", brushed)
        .on("end", brushended);

    function brushstarted() {
        // keep track of whether we're actively brushing so that we
        // don't remove the brush on keyup in the middle of a selection
        brushing = true;

        node.each(function(d) { 
            d.previouslySelected = shiftKey && d.selected; 
        });
    }

    rect.on('click', function() {
        node.each(function(d) {
            d.selected = false;
            d.previouslySelected = false;
        });
        node.classed("selected", false);
    });

    function brushed() {
        if (!d3v4.event.sourceEvent) return;
        if (!d3v4.event.selection) return;

        var extent = d3v4.event.selection;

        node.classed("selected", function(d) {
            return d.selected = d.previouslySelected ^
            (extent[0][0] <= d.x && d.x < extent[1][0]
             && extent[0][1] <= d.y && d.y < extent[1][1]);
        });
    }

    function brushended() {
        if (!d3v4.event.sourceEvent) return;
        if (!d3v4.event.selection) return;
        if (!gBrush) return;

        gBrush.call(brush.move, null);

        if (!brushMode) {
            // the shift key has been release before we ended our brushing
            gBrush.remove();
            gBrush = null;
        }

        brushing = false;
    }

    d3v4.select('body').on('keydown', keydown);
    d3v4.select('body').on('keyup', keyup);

    var shiftKey;

    function keydown() {
        shiftKey = d3v4.event.shiftKey;

        if (shiftKey) {
            // if we already have a brush, don't do anything
            if (gBrush)
                return;

            brushMode = true;

            if (!gBrush) {
                gBrush = gBrushHolder.append('g');
                gBrush.call(brush);
            }
        }
    }

    function keyup() {
        shiftKey = false;
        brushMode = false;

        if (!gBrush)
            return;

        if (!brushing) {
            // only remove the brush if we're not actively brushing
            // otherwise it'll be removed when the brushing ends
            gBrush.remove();
            gBrush = null;
        }
    }

    function dragstarted(d) {
      if (!d3v4.event.active) simulation.alphaTarget(0.9).restart();

        if (!d.selected && !shiftKey) {
            // if this node isn't selected, then we have to unselect every other node
            node.classed("selected", function(p) { return p.selected =  p.previouslySelected = false; });
        }

        d3v4.select(this).classed("selected", function(p) { d.previouslySelected = d.selected; return d.selected = true; });

        node.filter(function(d) { return d.selected; })
        .each(function(d) { //d.fixed |= 2; 
            d.fx = d.x;
            d.fy = d.y;
        })
    }

    function dragged(d) {
        node.filter(function(d) { return d.selected; })
        .each(function(d) { 
            d.fx += d3v4.event.dx;
            d.fy += d3v4.event.dy;
        })
    }

    function dragended(d) {
        d.fixed = true;
        //simulation.resume();

        return ;

        // if (!d3v4.event.active) simulation.alphaTarget(0);
        // d.fx = null;
        // d.fy = null;
        // node.filter(function(d) { return d.selected; })
        // .each(function(d) { //d.fixed &= ~6; 
        //     d.fx = null;
        //     d.fy = null;
        // })
    }

    // var texts = ['Use the scroll wheel to zoom',
    //              'Hold the shift key to select nodes']

    // svg.selectAll('text')
    //     .data(texts)
    //     .enter()
    //     .append('text')
    //     // .attr('x', 900)
    //     // .attr('y', function(d,i) { return 470 + i * 18; })
    //     .text(function(d) { return d; });

    return graph;
};