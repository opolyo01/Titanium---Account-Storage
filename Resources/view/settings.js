Ti.include('ImportAccountDetails.js');
Ti.include('TableForm.js');

var win = Ti.UI.currentWindow,
	accountsVO = win.accounts,
	password = Ti.UI.createLabel({
		text: 'Password',
		color: '#000000',
		textAlign:'left',
		left:10,
		top: 10,
		height:40,
		width: 100,
		font:{fontWeight:'bold',fontSize:16}
	}),
	passwordTextField = Titanium.UI.createTextField({
		value: Ti.App.Properties.getString('password',''),
		left:120,
		top: 10,
		width:190,
		height: 40,
		font:{fontWeight:'plain',fontSize:14},
		autocorrect:false,
		passwordMask:true,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		keyboardType: Titanium.UI.KEYBOARD_DEFAULT,
		autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE
	}),
	passwordConfirmLabel = Ti.UI.createLabel({
		text: 'Confirm Password',
		color: '#000000',
		textAlign:'left',
		left:10,
		top: 60,
		height:40,
		width: 100,
		font:{fontWeight:'bold',fontSize:16}
	}),
	passwordConfirmTextField = Titanium.UI.createTextField({
		value: Ti.App.Properties.getString('password',''),
		left:120,
		top: 60,
		width:190,
		height: 40,
		color: "#000",
		font:{fontWeight:'plain',fontSize:14},
		autocorrect:false,
		passwordMask:true,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		keyboardType: Titanium.UI.KEYBOARD_ASCII,
		autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE
	});
	oUpdateButton = Titanium.UI.createButton({
		title:'Update Master Password',
		height:40,
		width:220,
		top:120,
		color: "#13386c"
	}),
	checkPasswordLabel = Titanium.UI.createLabel({
		text: "Require master password? (recommended)",
		top: 195,
		width: 300,
		color: "#000",
		font:{fontWeight:'bold',fontSize:14},
		height: 20,
		left: 20
	}),
	checkPasswordSwitch = Titanium.UI.createSwitch({
		value:Ti.App.Properties.getBool('requireLogin',false),
		left: 80,
		top:235
	}),
	oEmailButton = Titanium.UI.createButton({
		title:'Email Account Details',
		height:40,
		width:200,
		top:290,
		color: "#13386c"
	});
	
	checkPasswordSwitch.addEventListener('change',function(e)
	{
		Ti.App.Properties.setBool("requireLogin", checkPasswordSwitch.value);
	});

oUpdateButton.addEventListener('click', function(){
	var passValue = passwordTextField.value,
		confirmValue = passwordConfirmTextField.value;
	if(passValue.length < 6){
		alert("Password has to be at least 6 characters.");
	}
	else if(passValue != confirmValue){
		alert("Password value and confirm value don't match");
	}
	else{
		alert("Master password has been reset");
		Ti.App.Properties.setString("password", passwordTextField.value);
	}
	
});

oEmailButton.addEventListener('click', function(){
	var opts = {accountsVO: accountsVO},
		importAccountDetails = new ImportAccountDetails(opts);
	importAccountDetails.emailDialog.open();
});

win.add(password);
win.add(passwordTextField);
win.add(passwordConfirmLabel);
win.add(passwordConfirmTextField);
win.add(oUpdateButton);
win.add(checkPasswordLabel);
win.add(checkPasswordSwitch);
win.add(oEmailButton);
