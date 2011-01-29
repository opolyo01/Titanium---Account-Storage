Ti.include('model/jsencryption.js');
Ti.include('view/UpdateSecurityQuestion.js');
Ti.include('view/TabView.js');
Ti.UI.setBackgroundColor('#ccc');

(function() {
	function Application(){
		var password = Ti.App.Properties.getString('password',''),
			securityQuestion = Ti.App.Properties.getString('securityQuestion',''),
			securityAnswer = Ti.App.Properties.getString('securityAnswer',''),
			isRequiredLogin = Ti.App.Properties.getBool('requireLogin',false),
			tabView,
			loginView;
		try{
			password = password === ""? "" : GibberishAES.dec(password, Titanium.Platform.id),
			securityQuestion = securityQuestion === ""? "" : GibberishAES.dec(securityQuestion, Titanium.Platform.id),
			securityAnswer = securityAnswer === ""? "" : GibberishAES.dec(securityAnswer, Titanium.Platform.id);
		}
		catch(err){
		}
		if(!isRequiredLogin){
			openTabView();
		}
		else{
			loginView = Ti.UI.createWindow();
			var passwordLabel = Ti.UI.createLabel({
				text: 'Enter Master Password',
				color: '#000000',
				textAlign:'left',
				top: 100,
				left:50,
				width: "auto",
				height:40,
				font:{fontWeight:'bold',fontSize:18}
			}),
			passwordTextField = Titanium.UI.createTextField({
				color: '#666666',
				textAlign:'left',
				left:50,
				width:200,
				top: 150,
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
				top:200,
				left: 20,
				color: "#13386c"
			}),
			oFogotPasswordButton = Titanium.UI.createButton({
				title:'Forgot Password',
				height:40,
				left: 125,
				width:150,
				top:200,
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
					securityQuestion: securityQuestion,
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
			loginView.addEventListener("click", function(){
			    passwordTextField.blur();
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