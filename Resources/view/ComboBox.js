function ComboBox(opts){
	var tr = Titanium.UI.create2DMatrix(),
		cancel =  Titanium.UI.createButton({
			title:'Cancel',
			style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
		}),
		done =  Titanium.UI.createButton({
			title:'Done',
			style:Titanium.UI.iPhone.SystemButtonStyle.DONE
		}),
		spacer =  Titanium.UI.createButton({
			systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
		}),
		toolbar =  Titanium.UI.createToolbar({
			top:0,
			items:[cancel,spacer,done]
		}),
		picker_data = [
			Titanium.UI.createPickerRow({title:'Credit Card'}),
			Titanium.UI.createPickerRow({title:'Bank'}),
			Titanium.UI.createPickerRow({title:'Web'}),
			Titanium.UI.createPickerRow({title:'Social Networking'}),
			Titanium.UI.createPickerRow({title:'Shopping'}),
			Titanium.UI.createPickerRow({title:'Work'}),
			Titanium.UI.createPickerRow({title:'Healthcare'}),
			Titanium.UI.createPickerRow({title:'Computer'}),
			Titanium.UI.createPickerRow({title:'Phone'}),
			Titanium.UI.createPickerRow({title:'Email'}),
			Titanium.UI.createPickerRow({title:'Others'})
		],
		slide_in =  Titanium.UI.createAnimation({bottom:0}),
		slide_out =  Titanium.UI.createAnimation({bottom:-251}),
		picker = Titanium.UI.createPicker({
			top:43
		}),
		that = this;
	
	tr = tr.rotate(90);
	picker.selectionIndicator=true;
	picker.add(picker_data);
	
	this.drop_button =  Titanium.UI.createButton({
		style:Titanium.UI.iPhone.SystemButton.DISCLOSURE,
		transform:tr
	});
	
	this.comboTextField = Titanium.UI.createTextField({
		value:opts.value || "",
		top:opts.top || 0,
		left:opts.left || 0,
		width:opts.width || 0,
		height: opts.height || 0,
		font:{fontSize:12},
		autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		rightButton:this.drop_button,
		rightButtonMode:Titanium.UI.INPUT_BUTTONMODE_ALWAYS
	});
	this.picker_view = Titanium.UI.createView({
		height:251,
		bottom:-251,
		zIndex: 100
	});
	this.picker_view.add(toolbar);
	this.picker_view.add(picker);
		
	this.comboTextField.addEventListener('focus', function() {
		that.picker_view.animate(slide_out);
	});
	
	this.drop_button.addEventListener('click',function() {
		that.picker_view.animate(slide_in);
		picker.setSelectedRow(0,getRow(),false);
		that.comboTextField.blur();
	});
	
	cancel.addEventListener('click',function() {
		that.picker_view.animate(slide_out);
	});
	
	done.addEventListener('click',function() {
		that.comboTextField.value =  picker.getSelectedRow(0).title;
		that.picker_view.animate(slide_out);
	});
	
	function getRow(){
		switch(opts.value)
		{
			case "Credit Card":
			  return 0;
			case 'Bank':
			  return 1;
			case 'Web':
			  return 2;
			case 'Social Networking':
			  return 3;
			case 'Shopping':
			  return 4;
			case 'Work':
			  return 5;
			case 'Healthcare':
			  return 6;
			case 'Computer':
			  return 7;
			case 'Phone':
			  return 8;
			case 'Email':
			  return 9;
			case 'Others':
			  return 10;
			default:
			  return 0;
		}
		
	}
}