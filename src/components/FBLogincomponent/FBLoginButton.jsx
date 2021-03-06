import React from "react";
import PropTypes from "prop-types";
import "../../css/index.css";
import { withRouter } from "react-router-dom";

class FBLogin extends React.Component {
	constructor(props) {
		super(props);
		this.initializeFacebookLogin = this.initializeFacebookLogin.bind(this);
	}
	componentWillMount() {
		//fb initialize
		window.fbAsyncInit = function() {
			window.FB.init({
				appId: process.env.REACT_APP_FBID,
				status: true,
				cookie: true, // enable cookies to allow the server to access
				// the session
				xfbml: true, // parse social plugins on this page
				version: "v3.3" // The Graph API version to use for the call
			});

			// Now that we"ve initialized the JavaScript SDK, we call
			// FB.getLoginStatus().  This function gets the state of the
			// person visiting this page and can return one of three states to
			// the callback you provide.	They can be:
			//
			// 1. Logged into your app ("connected")
			// 2. Logged into Facebook, but not your app ("not_authorized")
			// 3. Not logged into Facebook and can"t tell if they are logged into
			//		your app or not.
			//
			// These three cases are handled in the callback function.

			// Broadcast an event when FB object is ready
			var fbInitEvent = new Event("FBObjectReady");
			document.dispatchEvent(fbInitEvent);
		};
		(function(d, s, id) {
			var js,
				fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) {
				return;
			}
			js = d.createElement(s);
			js.id = id;
			js.src = "https://connect.facebook.net/zh_TW/sdk.js";
			fjs.parentNode.insertBefore(js, fjs);
		})(document, "script", "facebook-jssdk");
	}
	componentDidMount() {
		document.addEventListener("FBObjectReady", this.initializeFacebookLogin);
	}
	componentWillUnmount() {
		document.removeEventListener("FBObjectReady", this.initializeFacebookLogin);
	}

	initializeFacebookLogin() {
		console.log("init done");
		//window.FB.getLoginStatus(function(res){console.log(res);});
		window.FB.Event.subscribe("auth.login", response => {
			// do something with response
			this.props.responseFacebook({
				result: response,
				browserHistory: this.props.history
			});
		});
		window.FB.Event.subscribe("auth.logout", function() {
			// do something with response
		});
	}
	render() {
		/*
		const FBLogin = () => {
			window.FB.login((res) => {
				this.props.responseFacebook({ result: res, browserHistory: this.props.history });
			},
			{
				scope: "email,public_profile",
				return_scopes: true,
				enable_profile_selector: true,
			});
		};
		*/

		return (
			<div align="center" style={{ marginTop: "5%" }}>
				<div
					className="fb-login-button"
					data-width="100%"
					data-size="large"
					data-button-type="continue_with"
					data-auto-logout-link="false"
					data-use-continue-as="false"
				></div>
			</div>
		);
	}
}
FBLogin.propTypes = {
	history: PropTypes.object,
	responseFacebook: PropTypes.func
};

export default withRouter(FBLogin);
