 Ti.include('model/jsencryption.js');
var PasswordStore = {};
(function() {
	function Accounts(){
		this.db = Titanium.Database.open('password-store');
		this.db.execute('CREATE TABLE IF NOT EXISTS ACCOUNTS  (ID INTEGER PRIMARY KEY AUTOINCREMENT, ACCONT_NAME TEXT, CATEGORY TEXT, USER_NAME TEXT, PASSWORD TEXT, NOTES TEXT)');
	}
	
	Accounts.prototype.getAccounts = function(id){
		var rows = this.db.execute('SELECT * FROM ACCOUNTS order by UPPER(ACCONT_NAME)'),
			accounts = [];
		while (rows.isValidRow())
		{
			var accountName = rows.fieldByName('ACCONT_NAME'),
				categoryName = rows.fieldByName("CATEGORY"),
				id = rows.fieldByName('ID'),
				userName = rows.fieldByName('USER_NAME'),
				password = rows.fieldByName('PASSWORD'),
				notes = rows.fieldByName('NOTES');
			try{
				password = GibberishAES.dec(password, Titanium.Platform.id);
			}
			catch(err){
				password = "";
			}
			accounts.push({
				id: id,
				categoryName: categoryName,
				accountName: accountName,
				userName: userName,
				password: password,
				notes: notes
			});
			rows.next();
		}
		return accounts;
	};
	
	Accounts.prototype.insertAccount = function(opts){
		var password = opts.password?opts.password:"",
			encryptedPassword = "";
		try{
			encryptedPassword = password === "" ? "" : GibberishAES.enc(password, Titanium.Platform.id);
		}
		catch(err){
			encryptedPassword = "";
		}
		var encryptedPassword = password === "" ? "" : GibberishAES.enc(password, Titanium.Platform.id);
		
		this.db.execute('INSERT INTO ACCOUNTS (ACCONT_NAME, CATEGORY, USER_NAME, PASSWORD, NOTES) VALUES(?,?,?,?,?)', 
			opts.accountName?opts.accountName:"", opts.categoryName?opts.categoryName:"Others", 
			opts.userName?opts.userName:"", encryptedPassword, opts.notes?opts.notes:"");
	};
	
	Accounts.prototype.deleteAccount = function(id){
		this.db.execute('DELETE FROM ACCOUNTS WHERE ID = ?', id);
	};
	
	Accounts.prototype.deleteAll = function(){
		this.db.execute('DELETE FROM ACCOUNTS');
	};
	
	Accounts.prototype.dropTable = function(){
		this.db.execute('DROP TABLE ACCOUNTS');
	};
	
	Accounts.prototype.updateAccount = function(opts){
		var password = opts.password?opts.password:"",
			encryptedPassword = "";
		try{
			encryptedPassword = password === "" ? "" : GibberishAES.enc(password, Titanium.Platform.id);
		}
		catch(err){
			encryptedPassword = "";
		}
		this.db.execute('UPDATE ACCOUNTS SET ACCONT_NAME=?, CATEGORY=?, USER_NAME=?, PASSWORD=?, NOTES=? WHERE ID=?', 
			opts.accountName?opts.accountName:"", opts.categoryName?opts.categoryName:"Others", 
			opts.userName?opts.userName:"", encryptedPassword, opts.notes?opts.notes:"", opts.id?opts.id:"");
	};
	PasswordStore.Accounts = Accounts;
})();