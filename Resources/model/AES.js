AES = {
	getRandomNum : function(lbound, ubound) {
		return (Math.floor(Math.random() * (ubound - lbound)) + lbound);
	},
	getRandomChar : function(number, otherChars, upper) {
		var numberChars = "0123456789",
			lowerChars = "abcdefghijklmnopqrstuvwxyz",
			upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
			otherChars = "`~!@#$%^&*()-_=+[{]}\\|;:'\",<.>/? ",
			charSet = lowerChars;
		if (number){
			charSet += numberChars;
		}
		if (otherChars){
			charSet += otherChars;
		}	
		if (upper){
			charSet += upperChars;
		}
			
		return charSet.charAt(this.getRandomNum(0, charSet.length));
	},
	getPassword :function(length, num, other, upper) {
		var rc = "";
		
		for (var idx = 0; idx < length; ++idx) {
			rc = rc + this.getRandomChar(num, other, upper);
		}
		return rc;
	}
};