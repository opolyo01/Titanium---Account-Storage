AES = {
	getRandomNum : function(lbound, ubound) {
		return (Math.floor(Math.random() * (ubound - lbound)) + lbound);
	},
	getRandomChar : function(number, otherChars, upper, lower) {
		var numberChars = "0123456789",
			lowerChars = "abcdefghijklmnopqrstuvwxyz",
			upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
			otherChars = "`~!@#$%^&*()-_=+[{]}\\|;:'\",<.>/? ",
			charSet = "";
		if (number){
			charSet += numberChars;
		}
		if (otherChars){
			charSet += otherChars;
		}	
		if (upper){
			charSet += upperChars;
		}
		if (lower){
			charSet += lowerChars;
		}	
		return charSet.charAt(this.getRandomNum(0, charSet.length));
	},
	getPassword :function(length, num, other, upper, lower) {
		var rc = "";
		
		for (var idx = 0; idx < length; ++idx) {
			rc = rc + this.getRandomChar(num, other, upper, lower);
		}
		return rc;
	}
};