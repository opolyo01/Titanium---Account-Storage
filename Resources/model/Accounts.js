(function() {
	function Accounts(){
		this.db = Titanium.Database.open('password-store');
		this.db.execute('CREATE TABLE IF NOT EXISTS ACCOUNTS  (ID INTEGER PRIMARY KEY AUTOINCREMENT, ACCONT_NAME TEXT, CATEGORY TEXT, USER_NAME TEXT, PASSWORD TEXT)');
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
				password = rows.fieldByName('PASSWORD');
			accounts.push({
				id: id,
				categoryName: categoryName,
				accountName: accountName,
				userName: userName,
				password: password
			});
			rows.next();
		}
		return accounts;
	};
	
	Accounts.prototype.insertAccount = function(opts){
		this.db.execute('INSERT INTO ACCOUNTS (ACCONT_NAME, CATEGORY, USER_NAME, PASSWORD) VALUES(?,?,?,?)', 
			opts.accountName?opts.accountName:"", opts.categoryName?opts.categoryName:"Others", 
			opts.userName?opts.userName:"", opts.password?opts.password:"");
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
		this.db.execute('UPDATE ACCOUNTS SET ACCONT_NAME=?, CATEGORY=?, USER_NAME=?, PASSWORD=? WHERE ID=?', 
			opts.accountName?opts.accountName:"", opts.categoryName?opts.categoryName:"Others", 
			opts.userName?opts.userName:"", opts.password?opts.password:"", opts.id?opts.id:"");
	};
	PasswordStore.Accounts = Accounts;
})();