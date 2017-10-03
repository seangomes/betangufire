import { BetangufirePage } from './app.po';

describe('betangufire App', () => {
  let page: BetangufirePage;

  beforeEach(() => {
    page = new BetangufirePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
