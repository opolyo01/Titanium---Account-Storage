UpdateSecurityQuestion = function(opts){
	this.view = Titanium.UI.createView({
	   backgroundColor:'#ccc'
	});
	var securityHeadingLabel = Titanium.UI.createLabel({
		text:opts.heading || L("security_question_answer","default_not_set"),
		height:30,
		top:40,
		left: 30,
		width:"auto",
		color:'000',
		font:{fontSize:18, fontWeight:'bold'},
		textAlign:'center'
	});
	var securityLabel = Titanium.UI.createLabel({
		text:L("security_question","default_not_set"),
		height:30,
		top:100,
		left: 10,
		width:90,
		color:'000',
		font:{fontSize:12, fontWeight:'bold'},
		textAlign:'center'
	});
	this.securityTextField = Titanium.UI.createTextField({
		value: opts.securityQuestion || "",
		height:30,
		top:100,
		left:100,
		width:200,
		font:{fontSize:12},
		autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	var securityAnswerLabel = Titanium.UI.createLabel({
		text:L("security_answer","default_not_set"),
		height:30,
		top:150,
		left: 10,
		width:90,
		color:'#000',
		font:{fontSize:12, fontWeight:'bold'},
		textAlign:'center'
	});
	this.securityAnswerTextField = Titanium.UI.createTextField({
		value:opts.securityAnswer || "",
		top:150,
		left:100,
		width:200,
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
