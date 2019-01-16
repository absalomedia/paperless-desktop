import React from "react";
import { Link } from "react-router";
import $ from "jquery";

class Header extends React.Component {
	// CONSTRUCTOR
	constructor(props) {
		super(props);
		this.state = {
			active: "documents",
			route: "/documents"
		};
	}

	// COMPONENT DID MOUNT
	componentDidMount() {
		$(window).on("header.activeItem", this.handleActiveHeaderChanged.bind(this));
		$(window).on("hashchange", this.routeChanged.bind(this));
	}

	// COMPONENT WILL UNMOUNT
	componentWillUnmount() {
		$(window).off("header.activeItem");
		$(window).off("hashchange");
	}

	// ROUTE CHANGED
	routeChanged() {
		var route = location.hash.replace("#", "").split("?")[0];
		this.setState({
			route: route
		});
	}

	// HANDLE ACTIVE HEADER CHANGED
	handleActiveHeaderChanged(e, data) {
		this.setState({
			active: data.item
		});
	}

	// HANDLE SEARCH INPUT CHANGED
	handleSearchInputChanged(event) {
		var v = event.target.value;

		if (v.length === 0) {
			$(window).trigger("loadAllDocuments");
		} else {
			if (v.length > 2 && event.keyCode === 13) {
				$(window).trigger("searchDocuments", {
					query: v
				});
			}
		}
	}

	// RENDER
	render() {
		var documentsClass = "btn btn-default";
		if (this.state.active === "documents") documentsClass += " active";

		var logsClass = "btn btn-default";
		if (this.state.active === "logs") logsClass += " active";

		var tagsClass = "btn btn-default";
		if (this.state.active === "tags") tagsClass += " active";

		var correspondentsClass = "btn btn-default";
		if (this.state.active === "correspondents") correspondentsClass += " active";

		var settingsClass = "btn btn-default";
		if (this.state.active === "settings") settingsClass += " active";

		var remindersClass = "btn btn-default";
		if (this.state.active === "reminders") remindersClass += " active";

		var searchBar = null;
		if (this.state.route === "/documents") {
			searchBar = (
				<div className="search-bar pull-right">
					<input
						type="search"
						onKeyUp={this.handleSearchInputChanged.bind(this)}
						className="form-control"
						placeholder="Search"
					/>
				</div>
			);
		}

		return (
			<header className="toolbar toolbar-header">
				<h1 className="title">Paperless</h1>

				<div className="toolbar-actions">
					<div className="btn-group">
						<Link className={documentsClass} title="Documents" to={"/documents"}>
							<span className="icon icon-newspaper" />
						</Link>
						<Link
							className={correspondentsClass}
							title="Correspondents"
							to={"/correspondents"}
						>
							<span className="icon icon-users" />
						</Link>
						<Link className={tagsClass} title="Tags" to={"/tags"}>
							<span className="icon icon-tag" />
						</Link>
						<Link className={remindersClass} title="Reminders" to={"/reminders"}>
							<span className="icon icon-bell" />
						</Link>
					</div>

					<div className="btn-group">
						<Link className={settingsClass} title="Settings" to={"/settings"}>
							<span className="icon icon-cog" />
						</Link>
						<Link className={logsClass} title="Logs" to={"/logs"}>
							<span className="icon icon-menu" />
						</Link>
					</div>

					{searchBar}
				</div>
			</header>
		);
	}
}

export default Header;
