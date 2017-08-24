import React from "react";
import _ from "lodash";
import UserProfile from "./UserProfile";
import NavSetting from "./NavSetting";

class TopNav extends React.Component {
	constructor() {
		super();

		this.handleExpandMenu = this.handleExpandMenu.bind(this);
		this.state = {on: "" };
	}

	handleExpandMenu(name) {
		this.setState(function(prevState, props) {
			return {
				on: prevState.on === name ? "" : name
			};
		});
	}

	render() {
		const selected = this.state.on;

		return (
			<div className="top_nav">
				<div className="nav_menu">
					<nav>
						<ul className="nav navbar-nav navbar-right">
							{/* user profile */}
							<UserProfile
								name="Profile"
								handleExpandMenu={this.handleExpandMenu}
								selected={selected}
							/>

							{/* Open Dashboard*/}
							<NavSetting
								name="Open"
								icon="cog"
								menuItem="打开"
								handleExpandMenu={this.handleExpandMenu}
								selected={selected}
							/>

							{/* Close Dashboard*/}
							<NavSetting
								name="Save"
								icon="save"
								menuItem="保存"
								handleExpandMenu={this.handleExpandMenu}
								selected={selected}
							/>
						</ul>
					</nav>

					{/* title of main content */}
					<h3 style={{ marginLeft: "20px" }}>话单分析系统</h3>
				</div>
			</div>
		);
	}
}
module.exports = TopNav;