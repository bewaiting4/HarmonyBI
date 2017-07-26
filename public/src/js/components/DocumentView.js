import React from 'react'
import ChartContainer from './ChartContainer'

class DocumentView extends React.Component {
	render() {



		return <div className="right_col" role="main">
			<div className=''>
				<div className='clearfix'></div>

				<div className="row">
					<ChartContainer id="chart1" type="bar"></ChartContainer>
					<ChartContainer id="chart2" type="line"></ChartContainer>
					<ChartContainer id="chart3" type="bar"></ChartContainer>

					<ChartContainer id="echar4" type="line" data={this.props.data}></ChartContainer>
					<ChartContainer id="chart5" type="bar"></ChartContainer>
					<ChartContainer id="chart6" type="line"></ChartContainer>

					<ChartContainer id="chart7" type="bar"></ChartContainer>
					<ChartContainer id="chart8" type="line"></ChartContainer>
				</div>
			</div>
			
		</div>
	}
}
module.exports = DocumentView;