import {formatCurrency} from '../scripts/util/money.js';

describe('test suite: format currency',()=>{
  it('convert cents into dollars',()=>{
    expect(formatCurrency(2095)).toEqual('20.95');
  });

  it('works with zero',()=>{
    expect(formatCurrency(0)).toEqual('0.00');
  });
});



