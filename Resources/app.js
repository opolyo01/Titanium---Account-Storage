Ti.include('view/TabView.js');
Ti.UI.setBackgroundColor('#eee');

(function() {
	function Application(){
			var password = Ti.App.Properties.getString('password',''),
			isRequiredLogin = Ti.App.Properties.getBool('requireLogin',false),
			tabView,
			loginView;
		if(!isRequiredLogin){
			tabView = new PasswordStore.TabView();
			tabView.tabGroup.open();
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
			});
			oLoginButton.addEventListener('click', function(){
				var passwordEntered = passwordTextField.value;
					
				if(passwordEntered === password){
					tabView = new PasswordStore.TabView();
					tabView.tabGroup.open();
				}
				else{
					alert("Invalid credentials were entered.  Try again.");
				}
				
			});
			loginView.add(passwordLabel);
			loginView.add(passwordTextField);
			loginView.add(oLoginButton);
			loginView.open();
		}
	}
	PasswordStore.Application = Application;
})();

var oApp = new PasswordStore.Application();