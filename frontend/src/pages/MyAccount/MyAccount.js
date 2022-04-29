import React from "react";
import { useState } from "react";
import MyCampaigns from "./MyCampaigns/MyCampaigns";
import MyDonations from "./MyDonations/MyDonations";
import Profile from "./Profile/Profile";
import SettingsList from "./SettingsList/SettingsList";
import Cookies from "js-cookie";
import jsonwebtoken from "jsonwebtoken";

//CSS
import "./MyAccount.css";

//Controllers
import { useFetch } from "../../controllers/useFetch";
import Navigationbar from "../../components/Navigationbar/Navigationbar";

//AntD Components
import { Spin } from "antd";

const MyAccount = () => {
	const cookie = Cookies.get("jwt");
	const userId = jsonwebtoken.decode(cookie).id;
	const { loading, data: userData } = useFetch(
		`http://localhost:4545/api/user/${userId}`
	);
	const settingsList = [
		"Profile",
		"My Campaigns",
		"My Donations"
	];
	const [selectedTab, setSelectedTab] = useState("Profile");

	const changeTab = (tabName) => {
		setSelectedTab(tabName);
	};

	if (loading) {
		return (
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "100vh",
				}}
			>
				<Spin size="large" />
			</div>
		);
	}

	return (
		<>
			{console.log(userData.createdCampaigns)}
			<Navigationbar />
			<div className="container-fluid mb-5">
				<div className="row mt-4">
					<div className="left-panel border-right col-md-2 pl-4 pr-4">
						<SettingsList
							itemsList={settingsList}
							currentActive={selectedTab}
							clickFunction={changeTab}
						/>
					</div>

					<div className="right-panel col-md-10">
						{selectedTab === "Profile" && (
							<Profile userData={userData} />
						)}
						{selectedTab === "My Campaigns" && (
							<MyCampaigns
								createdCampaigns={userData.createdCampaigns}
							/>
						)}
						{selectedTab === "My Donations" && (
							<MyDonations
								donatedCampaigns={userData.donatedCampaigns}
							/>
						)}
						{/* {selectedTab === "Notifications" && (
							<h3>You will receive the Notifications here</h3>
						)} */}
					</div>
				</div>
			</div>
		</>
	);
};

export default MyAccount;
