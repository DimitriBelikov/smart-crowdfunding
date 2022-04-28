import React from "react";

const CampaignDescription = ({ campaignDescription }) => {
	return (
		<>
			<div className="container">
				<div className="row pr-4 pl-4">
					<div className="col text-justify mt-3 p-0">
						<p style={{ "font-size": "16px" }}>
							{campaignDescription}
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default CampaignDescription;
