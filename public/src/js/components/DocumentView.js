import React from 'react'
import ChartContainer from './ChartContainer'

class DocumentView extends React.Component {
	render() {



		return <div className="right_col" role="main">
			<div className=''>
				<div className='clearfix'></div>

				<div className="row">
					<ChartContainer id="mainnb"></ChartContainer>
					<ChartContainer></ChartContainer>
					<ChartContainer></ChartContainer>

					<ChartContainer id="echart_line" data={this.props.data}></ChartContainer>
					<ChartContainer></ChartContainer>
					<ChartContainer></ChartContainer>

					<ChartContainer></ChartContainer>
					<ChartContainer></ChartContainer>
				</div>
			</div>
			
		</div>
	}
}
module.exports = DocumentView;