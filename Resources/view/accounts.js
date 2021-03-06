Ti.include('UpdateView.js');
var win = Titanium.UI.currentWindow,
	tableView,
	updateView,
	data = [],
	imgMap = {
		'Credit Card': 'credit-card.png',
		'Social Networking': 'group.png',
		'Shopping': 'shopping.png',
		'Work': 'work.png',
		'Healthcare': 'health.png',
		'Computer': 'computer.png',
		'Phone': 'phone.png',
		'Bank': 'bank.png',
		'Web': 'web.png',
		'Email': 'email.png',
		'Others': 'others.png'
	},
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
			curCategoryName = curAccount.categoryName,
			newAccountNameFirstChar = accountName[0] ? accountName[0].toUpperCase() : "",
			config = {
				text: accountName, 
				height:50,
				left: 70,
				color:'#000',
				font:{fontWeight:'bold',fontSize:18, fontFamily:'Arial'}
			};
		var accountLabel = Titanium.UI.createLabel(config);
		var photo = Ti.UI.createView({
			backgroundImage:'../images/categories/'+imgMap[curCategoryName],
			top:5,
			left:10,
			width:30,
			height:20,
			clickName:'photo'
		});
		row.hasChild = true;
		if(currentAccountNameFirstChar !== newAccountNameFirstChar){
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
		row.categoryValue = curCategoryName;
		row.id = curAccount.id;
		row.userName = curAccount.userName;
		row.password = curAccount.password;
		row.notes = curAccount.notes;
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
		notesValue: rowData.notes,
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
backButton = Titanium.UI.createButton({
	title:'Back'
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
backButton.addEventListener('click', function()
{
	displayNavButtons();
	updateView.view.hide();
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
		notesValue: "",
		positiveButton: "Save"
	});
});

function showUpadateWindow(opts){
	win.setLeftNavButton(backButton);
	win.setRightNavButton(null);
	updateView = new PasswordStore.UpdateView(opts);
	updateView.updateButton.addEventListener('click', function(){
		var accountValue = updateView.accountTextField.value,
				categoryValue = updateView.categoryTextField.value,
				userValue = updateView.userTextField.value,
				passwordValue = updateView.passwordField.value,
				notesValue = updateView.notes.value;
		if(accountValue){
			if(opts.positiveButton === "Save"){
				accountsVO.insertAccount({
					accountName: accountValue,
					categoryName: categoryValue,
					userName: userValue,
					password: passwordValue,
					notes: notesValue
				});
				reload();
			}
			else{
				accountsVO.updateAccount({
					accountName: accountValue,
					categoryName: categoryValue,
					userName: userValue,
					password: passwordValue,
					notes: notesValue,
					id: opts.id
				});
				reload();
			}
			displayNavButtons();
			updateView.view.hide();
		}
		else{
			alert("Account name cannot be empty.");
		}
	});
	updateView.cancelButton.addEventListener('click', function(){
		displayNavButtons();
		updateView.view.hide();
	});
	win.add(updateView.view);
}

displayNavButtons();
function displayNavButtons(){
	win.setLeftNavButton(addButton);
	win.setRightNavButton(edit);
}
