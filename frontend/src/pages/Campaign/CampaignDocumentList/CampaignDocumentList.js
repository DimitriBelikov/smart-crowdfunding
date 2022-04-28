import React from "react";

const CampaignDocumentList = ({ documents }) => {
	return (
		<>
			<div className="container">
				<div className="row m-3">
					<div className="col">
						<h4 className="font-weight-bold">Campaign Documents</h4>
					</div>
					<hr width="100%" className="mt-2 mb-1" />
				</div>
				<div className="row ml-3 mr-3 mt-3">
					<div className="col">
						<h6 className="d-flex inline-block float-left font-weight-bold">
							{documents.length} File(s){" "}
						</h6>
						<h6 className="text-right d-flex inline-block float-right font-weight-bold">
							Last Updated: 16 Oct 2021
						</h6>
					</div>
					<hr width="100%" className="mt-2 mb-2" />
				</div>
				{documents.length === 0 ? (
					<div className="row m-3 ">
						<div className="col">
							<p className="text-secondary text-center m-0">
								No Documents Uploaded by Campaign Organiser
							</p>
						</div>
					</div>
				) : null}
				{documents.map((document, index) => (
					<div className="row ml-3 mr-3 mt-2" key={index}>
						<div className="col-1 pr-0">
							<a
								href={`http://localhost:4545/${document.filePath}`}
								target="_blank"
								rel="noreferrer"
								download
							>
								<img
									className="pdf-icon"
									src="http://localhost:3000/file-icon.png"
								/>
							</a>
						</div>
						<div className="col-9 pl-0">
							<h6>{document.filePath.split("/").pop()}</h6>
						</div>
						<div className="col-2">
							<h6>Size: {document.fileSize}</h6>
						</div>
						<hr width="100%" className="mt-2 mb-2" />
					</div>
				))}
			</div>
		</>
	);
};

export default CampaignDocumentList;
