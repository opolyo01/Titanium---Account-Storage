Ti.include('ImportAccountDetails.js');
Ti.include('TableForm.js');

var win = Ti.UI.currentWindow,
	accountsVO = win.accounts,
	opts = {
		login: false,
		headerText: "Update your username and password"
	},
	oTableView = new PasswordStore.TableForm(opts),
	oUpdateButton = Titanium.UI.createButton({
		title:'Update',
		height:40,
		width:200,
		top:160,
		color: "#13386c"
	}),
	checkPasswordLabel = Titanium.UI.createLabel({
		text: "Require Login?",
		top: 230,
		width: 150,
		color: "#000",
		height: 20,
		left: 20
	}),
	checkPasswordSwitch = Titanium.UI.createSwitch({
		value:Ti.App.Properties.getBool('requireLogin',false),
		left: 150,
		top:225
	}),
	oEmailButton = Titanium.UI.createButton({
		title:'Email Account Details',
		height:40,
		width:200,
		top:270,
		color: "#13386c"
	});
	
	checkPasswordSwitch.addEventListener('change',function(e)
	{
		Ti.App.Properties.setBool("requireLogin", checkPasswordSwitch.value);
	});

oUpdateButton.addEventListener('click', function(){
	Ti.App.Properties.setString("userName", oTableView.userNameTextField.value);
	Ti.App.Properties.setString("password", oTableView.passwordTextField.value);
});

oEmailButton.addEventListener('click', function(){
	var opts = {accountsVO: accountsVO},
		importAccountDetails = new ImportAccountDetails(opts);
	importAccountDetails.emailDialog.open();
});

win.add(oTableView.tableview);
win.add(oUpdateButton);
win.add(checkPasswordLabel);
win.add(checkPasswordSwitch);
win.add(oEmailButton);
