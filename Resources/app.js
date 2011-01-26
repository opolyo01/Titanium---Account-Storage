Ti.include('model/jsencryption.js');
Ti.include('view/UpdateSecurityQuestion.js');
Ti.include('view/TabView.js');
Ti.UI.setBackgroundColor('#eee');

(function() {
	function Application(){
		var password = Ti.App.Properties.getString('password',''),
			securityQuestion = Ti.App.Properties.getString('securityQuestion',''),
			securityAnswer = Ti.App.Properties.getString('securityAnswer',''),
			isRequiredLogin = Ti.App.Properties.getBool('requireLogin',false),
			tabView,
			loginView;
		
		password = password === ""? "" : GibberishAES.dec(password, Titanium.Platform.id),
		securityQuestion = securityQuestion === ""? "" : GibberishAES.dec(securityQuestion, Titanium.Platform.id),
		securityAnswer = securityAnswer === ""? "" : GibberishAES.dec(securityAnswer, Titanium.Platform.id);
		
		if(!isRequiredLogin){
			openTabView();
		}
		else{
			loginView = Ti.UI.createWindow();
			var passwordLabel = Ti.UI.createLabel({
				text: 'Master Password',
				color: '#000000',
				textAlign:'left',
				top: 100,
				left:10,
				width: 120,
				height:40,
				font:{fontWeight:'bold',fontSize:16}
			}),
			passwordTextField = Titanium.UI.createTextField({
				color: '#666666',
				textAlign:'left',
				left:110,
				width:170,
				top: 100,
				height: 30,
				font:{fontWeight:'plain',fontSize:14},
				autocorrect:false,
				passwordMask:true,
				borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
				keyboardType: Titanium.UI.KEYBOARD_ASCII,
				autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE
			}),
			oLoginButton = Titanium.UI.createButton({
				title:'Login',
				height:40,
				width:100,
				top:150,
				color: "#13386c"
			}),
			oFogotPasswordButton = Titanium.UI.createButton({
				title:'Forgot Password',
				height:40,
				width:200,
				top:230,
				color: "#13386c"
			});
			oLoginButton.addEventListener('click', function(){
				var passwordEntered = passwordTextField.value;
					
				if(passwordEntered === password){
					openTabView();
				}
				else{
					alert("Invalid credentials were entered.  Try again.");
				}
				
			});
			oFogotPasswordButton.addEventListener('click', function(e){
				var oSecurityQuestion = new UpdateSecurityQuestion({
					heading: "Answer Security Question",
					positiveButton: "Submit"
				});
				loginView.add(oSecurityQuestion.view);
				oSecurityQuestion.securityButton.addEventListener('click', function(){
					var sSecurityQuestion = oSecurityQuestion.securityTextField.value,
						sSecurityAnswer = oSecurityQuestion.securityAnswerTextField.value;
					if(sSecurityQuestion === securityQuestion && sSecurityAnswer === securityAnswer){
						oSecurityQuestion.view.hide();
						openTabView();
					}
					else{
						alert("Wrong security question or answer entered");
					}
				});
	
				oSecurityQuestion.securityCancelButton.addEventListener('click', function(){
					oSecurityQuestion.view.hide();
				});
			});
			loginView.add(passwordLabel);
			loginView.add(passwordTextField);
			loginView.add(oLoginButton);
			loginView.add(oFogotPasswordButton);
			loginView.open();
		}
		
		function openTabView(){
			tabView = new PasswordStore.TabView();
			tabView.tabGroup.open();
		}
	}
	PasswordStore.Application = Application;
})();

var oApp = new PasswordStore.Application();