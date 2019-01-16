import React from "react";
import { Link } from "react-router";

class TabsItem extends React.Component {
	// REMOVE TAB
	removeTab(e) {
		e.preventDefault();
		e.stopPropagation();

		this.props.removeTab(this.props.tab.route);
	}

	// RENDER
	render() {
		var tabClass = "tab-item";
		if (this.props.tab.active) tabClass += " active";

		return (
			<Link className={tabClass} to={this.props.tab.route}>
				{this.props.idx === 1 ? null : (
					<span
						className="icon icon-cancel icon-close-tab"
						onClick={this.removeTab.bind(this)}
					/>
				)}
				{this.props.tab.title}
			</Link>
		);
	}
}

export default TabsItem;
