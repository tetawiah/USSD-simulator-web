export default function RandomDigit () {
    let digit = "";
    for(let i=0;i<10;i++) {
        digit += Math.floor(Math.random() * 10);
    }
    return digit;
}