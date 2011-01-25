Ti.include('../model/AES.js');
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
passwordValue = Titanium.UI.createLabel({
	left:120,
	top: 10,
	width:190,
	height: 40,
	font:{fontWeight:'plain',fontSize:14}
}),
oGeneratePasswordButton = Titanium.UI.createButton({
	title:'Generate Password',
	height:40,
	width:145,
	top:60,
	left: 10,
	color: "#13386c"
}),
oCopyToClipboardButton = Titanium.UI.createButton({
	title:'Send to Clipboard',
	height:40,
	width:140,
	top:60,
	left: 165,
	color: "#13386c"
}),
picker = Ti.UI.createPicker({
	bottom: 20
});
	
var lengthColumn = Ti.UI.createPickerColumn({opacity:0});
for(var i=1;i<=10;++i){
	lengthColumn.addRow(Ti.UI.createPickerRow({title:i+""}));
}

var specialColumn1 = Ti.UI.createPickerColumn();
specialColumn1.addRow(Ti.UI.createPickerRow({title:'None'}));
specialColumn1.addRow(Ti.UI.createPickerRow({title:'#Num'}));

var specialColumn2 = Ti.UI.createPickerColumn();
specialColumn2.addRow(Ti.UI.createPickerRow({title:'None'}));
specialColumn2.addRow(Ti.UI.createPickerRow({title:'Extra'}));

var specialColumn3 = Ti.UI.createPickerColumn();
specialColumn3.addRow(Ti.UI.createPickerRow({title:'None'}));
specialColumn3.addRow(Ti.UI.createPickerRow({title:'UP'}));

picker.add([lengthColumn,specialColumn1, specialColumn2, specialColumn3]);
picker.selectionIndicator = true;
	
oGeneratePasswordButton.addEventListener('click', function(){
	var iLength = parseInt((picker.getSelectedRow(0).title), 10),
		bNumber = picker.getSelectedRow(1).title !== "None",
		bOthers = picker.getSelectedRow(2).title !== "None",
		bUpper = picker.getSelectedRow(3).title !== "None";
	passwordValue.text = AES.getPassword(iLength, bNumber, bOthers, bUpper);
});

oCopyToClipboardButton.addEventListener('click', function(){
	Ti.UI.Clipboard.setText(passwordValue.text);
});

picker.setSelectedRow(0,4,false);

win.add(password);
win.add(passwordValue);
win.add(oCopyToClipboardButton);
win.add(oGeneratePasswordButton);
win.add(picker);