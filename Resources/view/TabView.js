Ti.include('model/Accounts.js');
PasswordStore.TabView = function(){
	var accounts = new PasswordStore.Accounts();
	//accounts.dropTable();
	this.tabGroup = Ti.UI.createTabGroup();

	var oHome = Ti.UI.createWindow({  
	    title:'Accounts',
	    backgroundColor:'#fff',
		url: "view/accounts.js",
		accounts: accounts
	}),
	oTools = Ti.UI.createWindow({  
	    title:'Tools',
	    backgroundColor:'#ccc',
		url: "view/tools.js",
		accounts: accounts
	}),
	oSettings = Ti.UI.createWindow({  
	    title:'Settings',
	    backgroundColor:'#ccc',
		url: 'view/settings.js',
		accounts: accounts
	});

	var oHomeTab = Ti.UI.createTab({  
	    icon:'images/home.png',
	    title:'Accounts',
	    window:oHome
	}),
	oToolsTab = Ti.UI.createTab({  
	    icon:'images/tools.png',
	    title:'Tools',
	    window:oTools
	}),
	oSettingsTab = Ti.UI.createTab({  
	    icon:'images/settings.png',
	    title:'Settings',
	    window:oSettings
	});

	this.tabGroup.addTab(oHomeTab);
	this.tabGroup.addTab(oToolsTab);
	this.tabGroup.addTab(oSettingsTab);
	
	
	var firstLogin = Ti.App.Properties.getBool('firstLogin',true);
	if(firstLogin){
		this.tabGroup.setActiveTab(oSettingsTab);
		Ti.App.Properties.setBool("firstLogin", false);
	}
};
