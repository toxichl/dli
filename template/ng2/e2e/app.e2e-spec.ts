import { HehedaPage } from './app.po';

describe('heheda App', () => {
  let page: HehedaPage;

  beforeEach(() => {
    page = new HehedaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
