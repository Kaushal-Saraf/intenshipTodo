function verifyString(s:string) {
    for (let i = 0; i < s.length; i++) {
        if (s[i] !== ',' &&  isNaN(parseInt(s[i]))) {
            return false;
        }
    }
    return true;
}
export default verifyString;