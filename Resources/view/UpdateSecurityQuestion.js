UpdateSecurityQuestion = function(opts){
	this.view = Titanium.UI.createView({
	   backgroundColor:'#fff'
	});
	var securityHeadingLabel = Titanium.UI.createLabel({
		text:opts.heading || 'Update Security Question/Answer',
		height:30,
		top:40,
		left: 10,
		width:"auto",
		color:'000',
		font:{fontSize:18, fontWeight:'bold'},
		textAlign:'center'
	});
	var securityLabel = Titanium.UI.createLabel({
		text:'Security Question',
		height:30,
		top:100,
		left: 10,
		width:100,
		color:'000',
		font:{fontSize:12, fontWeight:'bold'},
		textAlign:'center'
	});
	this.securityTextField = Titanium.UI.createTextField({
		value: opts.accountValue || "",
		height:30,
		top:100,
		left:120,
		width:150,
		font:{fontSize:12},
		autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	var securityAnswerLabel = Titanium.UI.createLabel({
		text:'Security Answer',
		height:30,
		top:150,
		left: 10,
		width:100,
		color:'#000',
		font:{fontSize:12, fontWeight:'bold'},
		textAlign:'center'
	});
	this.securityAnswerTextField = Titanium.UI.createTextField({
		value:opts.userValue || "",
		top:150,
		left:120,
		width:150,
		height: 30,
		font:{fontSize:12},
		autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	this.securityCancelButton = Titanium.UI.createButton({
		title:'Cancel',
		height:40,
		width:100,
		top:210,
		left: 60,
		color: "#13386c"
	});
	this.securityButton = Titanium.UI.createButton({
		title: opts.positiveButton || 'Update',
		height:40,
		width:100,
		top:210,
		left: 170,
		color: "#13386c"
	});
	this.view.add(securityHeadingLabel);
	this.view.add(securityLabel);
	this.view.add(this.securityTextField);
	this.view.add(securityAnswerLabel);
	this.view.add(this.securityAnswerTextField);
	this.view.add(this.securityButton);
	this.view.add(this.securityCancelButton);
};
