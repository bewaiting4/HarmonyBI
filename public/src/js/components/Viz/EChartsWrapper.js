import _ from 'lodash';
import themeCfg from './EChartsThemeConfig';
import Combo from './Combo';
import Map from './Map';
import Network from './Network';
import Pie from './Pie';
import TCom from './TCom';
import Table from './Table';

class EChartsWrapper {
	constructor(container) {
		this.container = container;
	}

	init_echarts() {
		if (typeof(echarts) === 'undefined') {
			return ;
		}

		this.theme = themeCfg;
	}

	renderChart(id, type, chartInstance, data, subType) {
		this.init_echarts();

		if (type === "table") {
			Table.renderTable(id);
		} else if (type === "map") {
			Map.renderMap(id, data);
		} else {
			if (!chartInstance) {
				chartInstance = echarts.init(document.getElementById(id), this.theme);	
			}
			
			chartInstance.setOption(this.getChartOption(type, data, subType));;
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

	getChartOption(type, data, subType) {
		return this.getChart(type).getChartOption(data, subType);
	}

	resizeChart(chartInstance) {
		if (chartInstance) {
			chartInstance.resize();	
		}		
	}
}

module.exports = EChartsWrapper;