function ImportAccountDetails(opts){
	
	var emailDialog = Titanium.UI.createEmailDialog(),
		accountsVO = opts.accountsVO;
	if (!emailDialog.isSupported()) {
		Ti.UI.createAlertDialog({
			title:'Error',
			message:'Email not available'
		}).show();
	}
	emailDialog.setSubject('Account details');
	
	var accountsList = accountsVO.getAccounts(),
		message = "";
	for (var i = 0, iL = accountsList.length; i < iL; ++i) {
		var curAccount = accountsList[i],
			accountName = curAccount.accountName, 
			userName = curAccount.userName,
			password = curAccount.password;
		message += "<b>"+accountName + "</b> : " +userName + " : " +password +"<br/>";
	}
	if (Ti.Platform.name == 'iPhone OS') {
	    emailDialog.setMessageBody(message);
	    emailDialog.setHtml(true);
	    emailDialog.setBarColor('#336699');
	} else {
	    emailDialog.setMessageBody(message);
	}
	
	
	emailDialog.addEventListener('complete',function(e)
	{
	    if (e.result == emailDialog.SENT)
	    {
	        if (Ti.Platform.osname != 'android') {
	            alert("message was sent");
	        }
	    }
	    else
	    {
	        alert("message was not sent.");
	    }
	});
	this.emailDialog = emailDialog;
}