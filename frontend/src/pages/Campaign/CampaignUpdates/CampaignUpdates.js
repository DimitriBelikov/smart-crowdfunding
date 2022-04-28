import React from "react";

//CSS
import "./CampaignUpdates.css";

const CampaignUpdates = ({ updates }) => {
	return (
		<>
			<div className="container mt-5 mb-5 my-1">
				<div className="row">
					<ul className="timeline">
						{[...updates].reverse().map((update, index) => (
							<li key={index} className="mb-3">
								<h6 style={{ "font-weight": "500" }}>
									{update.updateDate.split("T")[0]}
								</h6>
								<h4 style={{ "font-weight": "bold" }}>
									{update.updateTitle}
								</h4>
								<h6 style={{ color: "#787676" }}>
									{update.updateDescription.map(
										(description) => (
											<li>{description}</li>
										)
									)}
								</h6>
							</li>
						))}
						<br />
					</ul>
				</div>
			</div>
		</>
	);
};

export default CampaignUpdates;
