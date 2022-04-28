import React from "react";

//CSS
import "./SettingsList.css";

const SettingsList = ({ itemsList, currentActive, clickFunction }) => {
	return (
		<ul className="nav flex-column nav-pills nav-fill">
			{itemsList.map((item, index) => (
				<li
					key={index}
					className={`nav-link mb-3 font-weight-bold ${
						currentActive === item
							? "vertical-menu-item-selected"
							: "vertical-menu-item"
					}`}
					aria-current="page"
					onClick={() => clickFunction(item)}
				>
					{item}
				</li>
			))}
		</ul>
	);
};

export default SettingsList;
