var PasswordStore = {};
(function() {
	function TableForm(opts){
		var data = [],
			row,
			passwordLabel = Ti.UI.createLabel({
				text: 'Master Password',
				color: '#000000',
				textAlign:'left',
				left:10,
				width: 120,
				height:40,
				font:{fontWeight:'bold',fontSize:16}
			}),
			passwordTextField = Titanium.UI.createTextField({
				color: '#666666',
				textAlign:'left',
				left:135,
				width:150,
				font:{fontWeight:'plain',fontSize:14},
				autocorrect:false,
				passwordMask:true,
				borderStyle:Titanium.UI.INPUT_BORDERSTYLE_NONE,
				keyboardType: Titanium.UI.KEYBOARD_ASCII,
				autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE
			});
		
		row = Ti.UI.createTableViewRow({height:'auto',backgroundColor:'#ffffff',selectedBackgroundColor:'#dddddd'}); 
		row.add(passwordLabel);
		row.add(passwordTextField);
		data[0] = row;
		
		this.tableview = Titanium.UI.createTableView({
			data:data,
			allowsSelection:false,
			style:Titanium.UI.iPhone.TableViewStyle.GROUPED
		});
		
		this.passwordTextField = passwordTextField;
	}
	PasswordStore.TableForm = TableForm;
})();