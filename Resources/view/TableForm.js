var PasswordStore = {};
(function() {
	function TableForm(opts){
		var data = [],
			row,
			headingLabel = Titanium.UI.createLabel({
				text:opts.headerText || "Enter your username and password",
				color: '#000000',
				textAlign:'left',
				left:10,
				height:40,
				font:{fontWeight:'bold',fontSize:14, fontFamily:'Arial'}
			}),
			userName = Ti.UI.createLabel({
				text: 'User Name',
				color: '#000000',
				textAlign:'left',
				left:10,
				height:40,
				font:{fontWeight:'bold',fontSize:16}
			}),
			userNameTextField = Titanium.UI.createTextField({
				value: opts.login ? "" : Ti.App.Properties.getString('userName',''),
				color: '#666666',
				textAlign:'left',
				left:110,
				width:190,
				font:{fontWeight:'plain',fontSize:14},
				autocorrect:false,
				borderStyle:Titanium.UI.INPUT_BORDERSTYLE_NONE,
				keyboardType: Titanium.UI.KEYBOARD_DEFAULT,
				autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE
			}),
			passwordLabel = Ti.UI.createLabel({
				text: 'Password',
				color: '#000000',
				textAlign:'left',
				left:10,
				height:40,
				font:{fontWeight:'bold',fontSize:16}
			}),
			passwordTextField = Titanium.UI.createTextField({
				value: opts.login ? "" : Ti.App.Properties.getString('password',''),
				color: '#666666',
				textAlign:'left',
				left:110,
				width:190,
				font:{fontWeight:'plain',fontSize:14},
				autocorrect:false,
				passwordMask:true,
				borderStyle:Titanium.UI.INPUT_BORDERSTYLE_NONE,
				keyboardType: Titanium.UI.KEYBOARD_ASCII,
				autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE
			});
		
		row = Ti.UI.createTableViewRow({height:'auto',backgroundColor:'#eee',selectedBackgroundColor:'#eee'}); 
		row.add(headingLabel);
		data[0] = row;
		
		row = Ti.UI.createTableViewRow({height:'auto',backgroundColor:'#ffffff',selectedBackgroundColor:'#dddddd'}); 
		row.add(userName);
		row.add(userNameTextField);
		data[1] = row;

		row = Ti.UI.createTableViewRow({height:'auto',backgroundColor:'#ffffff',selectedBackgroundColor:'#dddddd'}); 
		row.add(passwordLabel);
		row.add(passwordTextField);
		data[2] = row;
		
		this.tableview = Titanium.UI.createTableView({
			data:data,
			allowsSelection:false,
			style:Titanium.UI.iPhone.TableViewStyle.GROUPED
		});
		
		this.userNameTextField = userNameTextField;
		this.passwordTextField = passwordTextField;
	}
	PasswordStore.TableForm = TableForm;
})();