import React from "react";
import _ from "lodash";
import UserProfile from "./UserProfile";
import NavSetting from "./NavSetting";

class TopNav extends React.Component {
	constructor() {
		super();

		this.handleExpandMenu = this.handleExpandMenu.bind(this);
		this.handleOpenFilter = this.handleOpenFilter.bind(this);
		this.state = {on: "" };
	}

	handleExpandMenu(name) {
		this.setState(function(prevState, props) {
			return {
				// 如果选中该选项且下拉菜单确实打开
				on: prevState.on === name ? ""  : name
			};
		});
	}

	handleOpenFilter(resData) {
		this.props.onOpenFilter(resData);
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
								ref="openDlg"
								name="Open"
								icon="cog"
								menuItem="打开"
								handleExpandMenu={this.handleExpandMenu}
								onOpenFilter={this.handleOpenFilter}
								selected={selected}
							/>

							{/* Close Dashboard*/}
							<NavSetting
								ref="saveDlg"
								name="Save"
								icon="save"
								menuItem="保存"
								handleExpandMenu={this.handleExpandMenu}
								onOpenFilter={this.handleOpenFilter}
								selected={selected}
							/>
						</ul>
					</nav>

					{/* title of main content */}
					<h3 className="menu_title" style={{ marginLeft: "20px" }}>分析页面</h3>
				</div>
			</div>
		);
	}
}
module.exports = TopNav;