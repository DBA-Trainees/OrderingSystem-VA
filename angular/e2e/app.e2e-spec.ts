import { OrderingSystemVATemplatePage } from './app.po';

describe('OrderingSystemVA App', function() {
  let page: OrderingSystemVATemplatePage;

  beforeEach(() => {
    page = new OrderingSystemVATemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
