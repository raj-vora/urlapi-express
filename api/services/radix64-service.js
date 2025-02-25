const ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const CHAR_MAP = {};

ALPHABET.split('').forEach((v, i) => {
    CHAR_MAP[v] = i;
})

function int2radix64(number) {
    let chars = []
    let q = number;
    while(q>0){
        let r = q % 64;
        chars.push(ALPHABET.charAt(r));
        q = parseInt(q / 64);
    }
    return chars.reverse().join('');
}

function radix64toint(string) {
    let chars = string.split('').reverse();
    let number = 0;
    let i=0;
    chars.forEach(char => {
        number += CHAR_MAP[char] * Math.pow(64, i)        
        i++;
    });
    return number;
}

module.exports = {
    int2radix64,
    radix64toint
}