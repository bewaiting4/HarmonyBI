import _ from 'lodash';
import EChartsConfig from './EChartsConfig';
import Combo from './Combo';
import Map from './Map';
import Network from './Network';
import Pie from './Pie';
import TCom from './TCom';
import Table from './Table';
import Network2 from './Network2'

class EChartsWrapper {
	constructor(container) {
		this.container = container;
	}

	init_echarts() {
		if (typeof(echarts) === 'undefined') {
			return ;
		}

		this.theme = EChartsConfig.theme;
	}

	resetChart(id, type, chartInstance, data, config, data2) {
		if (type === "map") {
			Map.resetMap(id, data, config, data2);
		}
	}

	renderChart(id, type, chartInstance, data, config, data2) {
		this.init_echarts();

		config = config || {};

		if (type === "table") {
			Table.renderTable(id);
		} else if (type === "map") {
			Map.renderMap(id, data, config, data2);
		} else if (type === "network") {
			window.networks = window.networks || {};
			if (!chartInstance) {
				if (!window.networks[id]) {
					chartInstance = new Network2();
				} else {
					chartInstance = window.networks[id];
				}				
			}

			chartInstance.render(id, data, data2);
		} else {
			if (!chartInstance) {
				chartInstance = echarts.init(document.getElementById(id), this.theme);	
			}
			
			chartInstance.setOption(this.getChartOption(type, data, config.subType, config.filter, data2, chartInstance));
		}

		return chartInstance;
	}

	getChart(type) {
		return {
			"network": Network,
			"pie": Pie,
			"combo": Combo,
			"tcomm": TCom
		}[type];
	}

	getChartOption(type, data, subType, filter, data2, chartInstance) {
		return this.getChart(type).getChartOption(data, subType, filter, data2, chartInstance);
	}

	resizeChart(chartInstance) {
		if (chartInstance) {
			chartInstance.resize();	
		}		
	}
}

module.exports = EChartsWrapper;