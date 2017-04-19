import { EzypayHostedPaymentExamplePage } from './app.po';

describe('ezypay-hosted-payment-example App', () => {
  let page: EzypayHostedPaymentExamplePage;

  beforeEach(() => {
    page = new EzypayHostedPaymentExamplePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
