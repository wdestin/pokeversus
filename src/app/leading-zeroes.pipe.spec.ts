import { LeadingZeroesPipe } from './leading-zeroes.pipe';

describe('LeadingZeroesPipe', () => {
  it('create an instance', () => {
    const pipe = new LeadingZeroesPipe();
    expect(pipe).toBeTruthy();
  });
});
