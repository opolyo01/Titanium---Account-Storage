Ti.include('ComboBox.js');
var PasswordStore = {};
PasswordStore.UpdateView = function(opts){
	this.view = Titanium.UI.createView({
	   backgroundColor:'#fff'
	});
	var oComboCategoryTextField = new ComboBox({
		value:opts.categoryValue || "",
		top:130,
		left:120,
		width:150,
		height: 30
	});
	var accountLabel = Titanium.UI.createLabel({
		text:'Account Name',
		height:30,
		top:10,
		left: 10,
		width:100,
		color:'000',
		font:{fontSize:12, fontWeight:'bold'},
		textAlign:'center'
	});
	this.accountTextField = Titanium.UI.createTextField({
		value: opts.accountValue || "",
		height:30,
		top:10,
		left:120,
		width:150,
		font:{fontSize:12},
		autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	var userLabel = Titanium.UI.createLabel({
		text:'User Name',
		height:30,
		top:50,
		left: 10,
		width:100,
		color:'#000',
		font:{fontSize:12, fontWeight:'bold'},
		textAlign:'center'
	});
	this.userTextField = Titanium.UI.createTextField({
		value:opts.userValue || "",
		top:50,
		left:120,
		width:150,
		height: 30,
		font:{fontSize:12},
		autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	var passwordLabel = Titanium.UI.createLabel({
		text:'Password',
		height:30,
		top:90,
		left: 10,
		width:100,
		color:'#000',
		font:{fontSize:12, fontWeight:'bold'},
		textAlign:'center'
	});
	this.passwordField = Titanium.UI.createTextField({
		value:opts.passwordValue || "",
		top:90,
		left:120,
		width:150,
		height: 30,
		font:{fontSize:12},
		autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	var categoryLabel = Titanium.UI.createLabel({
		text:'Category',
		height:30,
		top:130,
		left: 10,
		width:100,
		color:'#000',
		font:{fontSize:12, fontWeight:'bold'},
		textAlign:'center'
	});
	this.categoryTextField = oComboCategoryTextField.comboTextField;
//	this.categoryTextField = Titanium.UI.createTextField({
//		value:opts.categoryValue || "",
//		top:130,
//		left:120,
//		width:150,
//		height: 30,
//		font:{fontSize:12},
//		autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
//		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
//	});
	this.updateButton = Titanium.UI.createButton({
		width: 100,
		height: 30,
		top: 280,
		left: 20,
		title:opts.positiveButton || "Save"
	});
	this.cancelButton = Titanium.UI.createButton({
		width: 100,
		height: 30,
		top: 280,
		left:140,
		title:"Cancel"
	});
	var notesLabel = Titanium.UI.createLabel({
		text:'Notes',
		height:30,
		top:200,
		left: 10,
		width:100,
		color:'#000',
		font:{fontSize:12, fontWeight:'bold'},
		textAlign:'center'
	});
	this.notes = Titanium.UI.createTextArea({
		value:opts.notesValue || "",
		height:100,
		width:190,
		top: 170,
		left: 120,
		font:{fontSize:12},
		color:'#000',
		textAlign:'left',
		borderWidth:2,
		borderColor:'#bbb',
		borderRadius:5
	});
	var that = this;
	this.notes.addEventListener('focus', function() {
		that.view.top = -120;
	    that.view.animate({bottom: 166, duration:500});
	});
	 
	this.notes.addEventListener('blur', function() {
		that.view.top = 0;
	    that.view.animate({bottom: 0, duration:500});
	});
	this.view.add(accountLabel);
	this.view.add(this.accountTextField);
	this.view.add(userLabel);
	this.view.add(this.userTextField);
	this.view.add(passwordLabel);
	this.view.add(this.passwordField);
	this.view.add(categoryLabel);
	this.view.add(this.categoryTextField);
	this.view.add(oComboCategoryTextField.picker_view);
	this.view.add(notesLabel);
	this.view.add(this.notes);
	this.view.add(this.updateButton);
	this.view.add(this.cancelButton);
};
