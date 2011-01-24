Ti.include('view/TableForm.js');
Ti.include('view/TabView.js');
Ti.UI.setBackgroundColor('#eee');

(function() {
	function Application(){
		var userName = Ti.App.Properties.getString('userName',''),
			password = Ti.App.Properties.getString('password',''),
			isRequiredLogin = Ti.App.Properties.getBool('requireLogin',false),
			tabView,
			loginView,
			opts = {
				login: true,
				headerText: "Enter your username and password"
			};
		Ti.API.info(userName + " " +password);
		if(!isRequiredLogin){
			tabView = new PasswordStore.TabView();
			tabView.tabGroup.open();
		}
		else{
			loginView = Ti.UI.createWindow();
			var tableForm = new PasswordStore.TableForm(opts);
			loginView.add(tableForm.tableview);
			var oLoginButton = Titanium.UI.createButton({
				title:'Login',
				height:40,
				width:200,
				top:160,
				color: "#13386c"
			});
			oLoginButton.addEventListener('click', function(){
				var userEntered = tableForm.userNameTextField.value,
					passwordEntered = tableForm.passwordTextField.value;
				if(userEntered === userName && passwordEntered === password){
					tabView = new PasswordStore.TabView();
					tabView.tabGroup.open();
				}
				else{
					alert("Invalid credentials were entered.  Try again.");
				}
				
			});
			loginView.add(oLoginButton);
			loginView.open();
		}
	}
	PasswordStore.Application = Application;
})();

var oApp = new PasswordStore.Application();