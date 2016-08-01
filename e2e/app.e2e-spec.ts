import { MatchUiPage } from './app.po';

describe('match-ui App', function() {
  let page: MatchUiPage;

  beforeEach(() => {
    page = new MatchUiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
