import EChartsConfig from './EChartsConfig'
import Enum from '../Enums'

window.network = window.network || {};
var Theme = EChartsConfig.theme;

class Network2 {
	resize() {
		this.render(this.id, this.data);
	}

	render(id, data, data2) {
		var svg = d3.select('#' + id);

		this.id = id;
		this.data = data;

		var hashData2 = {},
			hashColor = {};

		_.forEach(data2, function(o, idx) {
			hashData2[o.number] = o;
			hashColor[o.number] = Theme.color[idx];
		});


		function parseData(data) {
			var mapping = {}

			function setupData(from, to, duration) {
				mapping[from] = mapping[from] || {};
				mapping[from][to] = mapping[from][to] || {duration: 0, count: 0};
				if (!isNaN(duration)) {
					mapping[from][to].duration += duration;
				}
				mapping[from][to].count++;
			}

			for (var i = 0; i < data.length; i++) {
				var datum = data[i],
					from = datum['f_number'],
					to = datum['t_number'],
					duration = parseInt(datum['call_duration']);

				if (!from || !to) {
					continue ;
				}

				if (mapping[from] || !mapping[to]) {
					setupData(from, to, duration);
				} else {
					setupData(to, from, duration);
				}
			}

			var nodes = {},
				links = [];

			function getNodeInitialOption(name) {
				return {name: name, value: 0, draggable: true}
			}

			for (var from in mapping) {
				for (var to in mapping[from]) {
					nodes[from] = nodes[from] || getNodeInitialOption(from);
					nodes[to] = nodes[to] || getNodeInitialOption(to);

					nodes[from].value += mapping[from][to].duration;
					nodes[to].value += mapping[from][to].duration;

					links.push({source: from, target: to, value: mapping[from][to].count, fixed: true});
				}
			}

			return {
				nodes: _.map(nodes, function(node, key) {return {id: key, weight: node.value, color: hashData2[key] && hashData2[key].type === Enum.CATEGORY_KEY.SUSPECT ? hashColor[key] : 'grey'}}),
				links: links
			}
		}

		var traces = parseData(data);

	    createV4SelectableForceDirectedGraph(svg, traces);

	    setTimeout(function() {
		    var canvas = document.createElement('canvas');
		    canvas.width = svg.attr("width");
		    canvas.height = svg.attr("height");

		    var serializer = new XMLSerializer();
		    var svgStr = serializer.serializeToString(svg.select("svg").node());

		    canvg(canvas, svgStr);

		    window.network[id] = {
		    	image: canvas.toDataURL(),
		    	width: canvas.width,
		    	height: canvas.height
		    };
	    }, 1000);
	}
}

module.exports = Network2;