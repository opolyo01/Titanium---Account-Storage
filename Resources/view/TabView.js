Ti.include('model/Accounts.js');
PasswordStore.TabView = function(){
	var accounts = new PasswordStore.Accounts();
	this.tabGroup = Ti.UI.createTabGroup();

	var oHome = Ti.UI.createWindow({  
	    title:'Accounts',
	    backgroundColor:'#fff',
		url: "view/accounts.js",
		accounts: accounts
	}),
	oSettings = Ti.UI.createWindow({  
	    title:'Settings',
	    backgroundColor:'#fff',
		url: 'view/settings.js',
		accounts: accounts
	});

	var oHomeTab = Ti.UI.createTab({  
	    icon:'KS_nav_views.png',
	    title:'Accounts',
	    window:oHome
	}),
	oSettingsTab = Ti.UI.createTab({  
	    icon:'KS_nav_ui.png',
	    title:'Settings',
	    window:oSettings
	});

	this.tabGroup.addTab(oHomeTab);
	this.tabGroup.addTab(oSettingsTab);
};
