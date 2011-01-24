Ti.include('UpdateView.js');

var win = Titanium.UI.currentWindow,
	tableView,
	data = [],
	accountsVO = win.accounts;

var search = Titanium.UI.createSearchBar({
	barColor:'#385292',
	showCancel:false,
	hintText:'search'
});
search.addEventListener('change', function(e)
{
	e.value;
});
search.addEventListener('return', function(e)
{
	search.blur();
});
search.addEventListener('cancel', function(e)
{
	search.blur();
});
tableview = Titanium.UI.createTableView({
	data:data,
	backgroundColor:"#fff",
	search:search,
	filterAttribute:'filter',
	editable:true
});
reload();

function reload(){
	data = [];
	var row,
		index = [],
		accountsList = accountsVO.getAccounts(),
		currentAccountNameFirstChar = "",
		k = 0;
	for(var i=0,iL = accountsList.length;i<iL;++i){
		row = Ti.UI.createTableViewRow();
		var curAccount = accountsList[i],
			accountName = curAccount.accountName,
			newAccountNameFirstChar = accountName[0].toUpperCase(),
			config = {
				text: accountName, 
				height:50,
				left: 70,
				color:'#000',
				font:{fontWeight:'bold',fontSize:18, fontFamily:'Arial'}
			};
		var accountLabel = Titanium.UI.createLabel(config);
		var photo = Ti.UI.createView({
			backgroundImage:'../images/user.png',
			top:5,
			left:10,
			width:50,
			height:40,
			clickName:'photo'
		});
		row.hasChild = true;
		if(currentAccountNameFirstChar !== newAccountNameFirstChar){
			k++;
			index.push({title:newAccountNameFirstChar,index:i});
			currentAccountNameFirstChar = newAccountNameFirstChar;
			row.header = newAccountNameFirstChar;
		}
		else if(i === 0){
			index.push({title:currentAccountNameFirstChar,index:i});
			row.header = currentAccountNameFirstChar;
		}
		//row.filterAttribute = 'title';
		row.accountValue = accountName;
		row.categoryValue = curAccount.categoryName;
		row.id = curAccount.id;
		row.userName = curAccount.userName;
		row.password = curAccount.password;
		row.filter = accountLabel.text + ' ' + row.categoryValue;
		row.add(photo);
		row.add(accountLabel);
		data[i] = row;
	}
	tableview.index = index;
	tableview.setData(data);
}

tableview.addEventListener('click', function(e)
{
	var rowData = e.rowData;
	showUpadateWindow({
		accountValue: rowData.accountValue,
		categoryValue: rowData.categoryValue,
		userValue: rowData.userName,
		passwordValue: rowData.password,
		positiveButton: "Update",
		id: rowData.id
	});
});

tableview.addEventListener('delete',function(e)
{
	accountsVO.deleteAccount(e.rowData.id);
	reload();
});

Titanium.UI.currentWindow.add(tableview);

var edit = Titanium.UI.createButton({
	title:'Edit'
}),
addButton = Titanium.UI.createButton({
	title:'Add'
}),
cancel = Titanium.UI.createButton({
	title:'Cancel',
	style:Titanium.UI.iPhone.SystemButtonStyle.DONE
});
edit.addEventListener('click', function()
{
	win.setRightNavButton(cancel);
	tableview.editing = true;
});

cancel.addEventListener('click', function()
{
	win.setRightNavButton(edit);
	tableview.editing = false;
});

addButton.addEventListener('click', function(e)
{
	showUpadateWindow({
		accountValue: "",
		categoryValue: "Others",
		userValue: "",
		passwordValue: "",
		positiveButton: "Save"
	});
});

function showUpadateWindow(opts){
	var updateView = new PasswordStore.UpdateView(opts);
	updateView.updateButton.addEventListener('click', function(){
		var accountValue = updateView.accountTextField.value,
				categoryValue = updateView.categoryTextField.value,
				userValue = updateView.userTextField.value,
				passwordValue = updateView.passwordField.value;
		if(opts.positiveButton === "Save"){
			accountsVO.insertAccount({
				accountName: accountValue,
				categoryName: categoryValue,
				userName: userValue,
				password: passwordValue
			});
			reload();
		}
		else{
			accountsVO.updateAccount({
				accountName: accountValue,
				categoryName: categoryValue,
				userName: userValue,
				password: passwordValue,
				id: opts.id
			});
			reload();
		}
		updateView.view.hide();
	});
	updateView.cancelButton.addEventListener('click', function(){
		updateView.view.hide();
	});
	win.add(updateView.view);
}

win.setLeftNavButton(addButton);
win.setRightNavButton(edit);