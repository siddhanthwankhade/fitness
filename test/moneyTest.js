import {formatCurrency} from '../scripts/util/money.js';

console.log('ocnverts cent into dollar');
if(formatCurrency(2095)=== '20.95'){
    console.log('passed');

} else{
    console.log('failed');
}

console.log('works with zero');
if(formatCurrency(0) ==0.00){
    console.log('passed');
} else{
    console.log('fail');
}