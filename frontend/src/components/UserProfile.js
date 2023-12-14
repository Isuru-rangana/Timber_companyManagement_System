import React, {useState, useEffect} from "react";
import "./userprofile.css";

function UserProfile(userDetails) {
	const user = userDetails.user;
	const logout = () => {
		window.open(`${process.env.REACT_APP_API_URL_2}/auth/logout`, "_self");
	};
	return (

		<div class="home-section">
			<div className="top">
				<h1 className="head"></h1>
				<div className= "form_content">
					
					<div className="right">
						<h2 className="from_head">Profile</h2>
						<img
							src={user.picture}
							alt="profile"
							className="profile_img"
						/>

						<h4>{user.name}</h4>
						<h5>{user.email}</h5>

						
						<button className="btn" onClick={logout}>
							Log Out
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default UserProfile;