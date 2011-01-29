Ti.include('../model/jsencryption.js');
Ti.include('TableForm.js');
Ti.include('UpdateSecurityQuestion.js');

var win = Ti.UI.currentWindow,
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
		value: "",
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
		value: "",
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
	}),
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
	oUpdateSecurityQuestion = Titanium.UI.createButton({
		title:'Update Security Question',
		height:40,
		width:220,
		top:280,
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
		//var platformId = Titanium.Platform.id;
		var encryptedPassword = GibberishAES.enc(passwordTextField.value, Titanium.Platform.id);
		Ti.App.Properties.setString("password", encryptedPassword);
	}
	
});

oUpdateSecurityQuestion.addEventListener('click', function(){
	var securityQuestion = Ti.App.Properties.getString('securityQuestion',''),
		securityAnswer = Ti.App.Properties.getString('securityAnswer','');
	try{
		securityQuestion = securityQuestion === ""? "" : GibberishAES.dec(securityQuestion, Titanium.Platform.id),
		securityAnswer = securityAnswer === ""? "" : GibberishAES.dec(securityAnswer, Titanium.Platform.id);
	}
	catch(err){
		securityQuestion = "";
		securityAnswer = "";
	}
	var oSecurityQuestion = new UpdateSecurityQuestion({
		securityQuestion: securityQuestion,
		securityAnswer: securityAnswer
	});
	win.add(oSecurityQuestion.view);
	oSecurityQuestion.securityButton.addEventListener('click', function(){
		var sSecurityQuestion = oSecurityQuestion.securityTextField.value,
			sSecurityAnswer = oSecurityQuestion.securityAnswerTextField.value;
		if(sSecurityQuestion.length < 5 || sSecurityAnswer.length < 5){
			alert("Security question and answer has to be at least 5 characters.");
		}
		else{
			alert("Security question and answer has been set.");
			var encryptedQuestion = GibberishAES.enc(sSecurityQuestion, Titanium.Platform.id),
				encryptedAnswer = GibberishAES.enc(sSecurityAnswer, Titanium.Platform.id);
			Ti.App.Properties.setString("securityQuestion", encryptedQuestion);
			Ti.App.Properties.setString("securityAnswer", encryptedAnswer);
			oSecurityQuestion.view.hide();
		}
	});
	
	oSecurityQuestion.securityCancelButton.addEventListener('click', function(){
		oSecurityQuestion.view.hide();
	});
});

win.addEventListener("click", function(){
    passwordTextField.blur();
	passwordConfirmTextField.blur();
});

win.add(password);
win.add(passwordTextField);
win.add(passwordConfirmLabel);
win.add(passwordConfirmTextField);
win.add(oUpdateButton);
win.add(checkPasswordLabel);
win.add(checkPasswordSwitch);
win.add(oUpdateSecurityQuestion);