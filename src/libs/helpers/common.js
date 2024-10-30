function containWhitespace(str) {
    return /\s/.test(str);
}
function containOnlyLetterAndNum(str) {


    var re = /(^([a-z0-9]+)([a-z0-9_]+$))/;

    if (re.test(str)) {
        return true;
    }
    return false
}
function containSpecialWord(username) {
    if ((username.indexOf("worldweb") >= 0) || (username.indexOf("wawa") >= 0) || (username.indexOf("sun") >= 0) || (username.indexOf("5678") >= 0) || (username.indexOf("mtstest") >= 0) || (username.indexOf("wawacasino") >= 0) || (username.indexOf("administrator") >= 0) || (username.indexOf("admin") >= 0) || (username.indexOf("webmaster") >= 0) || (username.indexOf("master") >= 0)) {
        return true
    }
    return false
}

function isAccNum(str) {
    var strVal = "0123456789";
    for (let i = 0; i < str.length; i++) {
        const ch = str.charAt(i);

        for (let j = 0; j < strVal.length; j++) {
            if (ch == strVal.charAt(j))
                break;
            if (j == strVal.length)
                return false;
        }
    }
    return true;
}

function Space_chk(chk_val) {
    var val_len;
    var spc = 0;
    val_len = chk_val.length;

    if (val_len == 0) {
        return true;
    } else {
        for (let i = 0; i < val_len; i++) {
            if (chk_val.charAt(i) == " ") {
                return true;
            }
        }
    }

    return false;
}

function isChk(str) {

    var chkStr = str;

    var re = /(^([a-z0-9]+)([a-z0-9_]+$))/;

    if (re.test(chkStr)) {
        return false;
    } else {
        return true;
    }
}


//한글 및 영문만 포함 되었는지 체크
function kor_eng_chk(instr){
	   
	for (let kk=0; kk<instr.length; kk++)
    {
		const mmstr = instr.substr(kk,1).charCodeAt(0);
		if (mmstr < 65 || mmstr > 90 && mmstr < 97 || mmstr > 122 && mmstr < 44032 || mmstr > 63086){
          return false;
       }
    }
	return true;
	
}

// 숫자만체크
function isNums(strNums){  
    var id_ck = strNums;  
    if ( isNaN(id_ck) == false ) {  
                return true;
            } else {
                return false;
            }
}


module.exports = {
    containWhitespace,
    containOnlyLetterAndNum,
    containSpecialWord,
    isAccNum,
    Space_chk,
    isChk,
    kor_eng_chk,
    isNums

}