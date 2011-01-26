Ti.include('ImportAccountDetails.js');
Ti.include('../model/PasswordGenerator.js');

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
passwordValue = Titanium.UI.createLabel({
	left:120,
	top: 10,
	width:190,
	height: 40,
	font:{fontWeight:'plain',fontSize:14}
}),
lengthLabel = Titanium.UI.createLabel({
	text: "Length",
	left:10,
	top: 50,
	width:150,
	height: 25,
	font:{fontWeight:'bold',fontSize:14}
}),
lengthTextField = Titanium.UI.createTextField({
	value: 6,
	color:'#000',
	height:25,
	top:50,
	left:160,
	width:50,
	enableReturnKey: true,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	keyboardType: Titanium.UI.KEYBOARD_NUMBER_PAD

}),
lowerCaseLabel = Titanium.UI.createLabel({
	text: "Lower Case",
	left:10,
	top: 80,
	width:150,
	height: 25,
	font:{fontWeight:'bold',fontSize:14}
}),
lowerCaseSwitch = Titanium.UI.createSwitch({
	value:true,
	left: 160,
	top:80
}),
upperCaseLabel = Titanium.UI.createLabel({
	text: "Upper Case",
	left:10,
	top: 110,
	width:150,
	height: 25,
	font:{fontWeight:'bold',fontSize:14}
}),
upperCaseSwitch = Titanium.UI.createSwitch({
	value:true,
	left: 160,
	top:110
}),
numbersLabel = Titanium.UI.createLabel({
	text: "Numbers",
	left:10,
	top: 140,
	width:150,
	height: 25,
	font:{fontWeight:'bold',fontSize:14}
}),
numbersSwitch = Titanium.UI.createSwitch({
	value:true,
	left: 160,
	top:140
}),
specialCharactersLabel = Titanium.UI.createLabel({
	text: "Special Characters",
	left:10,
	top: 170,
	width:150,
	height: 25,
	font:{fontWeight:'bold',fontSize:14}
}),
specialCharactersSwitch = Titanium.UI.createSwitch({
	value:true,
	left: 160,
	top:170
}),
oGeneratePasswordButton = Titanium.UI.createButton({
	title:'Generate Password',
	height:40,
	width:145,
	top:220,
	left: 10,
	color: "#13386c"
}),
oCopyToClipboardButton = Titanium.UI.createButton({
	title:'Send to Clipboard',
	height:40,
	width:140,
	top:220,
	left: 165,
	color: "#13386c"
}),
oEmailButton = Titanium.UI.createButton({
	title:'Email Account Details',
	height:40,
	width:200,
	top:270,
	color: "#13386c"
});
	
oGeneratePasswordButton.addEventListener('click', function(){
	var iLength = parseInt(lengthTextField.value, 10),
		bLower = lowerCaseSwitch.value,
		bNumber = numbersSwitch.value,
		bOthers = specialCharactersSwitch.value,
		bUpper = upperCaseSwitch.value;
	passwordValue.text = AES.getPassword(iLength, bNumber, bOthers, bUpper, bLower);
});

oCopyToClipboardButton.addEventListener('click', function(){
	Ti.UI.Clipboard.setText(passwordValue.text);
});

oEmailButton.addEventListener('click', function(){
	var opts = {accountsVO: accountsVO},
		importAccountDetails = new ImportAccountDetails(opts);
	importAccountDetails.emailDialog.open();
});

win.addEventListener("click", function()
{
    lengthTextField.blur();
});
win.add(password);
win.add(passwordValue);
win.add(oCopyToClipboardButton);
win.add(oGeneratePasswordButton);
win.add(lengthLabel);
win.add(lengthTextField);
win.add(lowerCaseLabel);
win.add(lowerCaseSwitch);
win.add(upperCaseLabel);
win.add(upperCaseSwitch);
win.add(numbersLabel);
win.add(numbersSwitch);
win.add(specialCharactersLabel);
win.add(specialCharactersSwitch);
win.add(oEmailButton);