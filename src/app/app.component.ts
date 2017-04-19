import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Token, PaymentMethod, PaymentFormResponse } from './shared/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  env = 'stage';
  private iamHostedUrl = `https://iam-${this.env}.ezypay.com/v2/hostedpages`;
  private hostedPageUrl = `https://hosted-${this.env}.ezypay.com`;

  @ViewChild('paymentIframe') paymentIframe: ElementRef;

  paymentFormId: string;
  hostedPagesUrl: string;
  createdPaymentMethod: PaymentMethod;
  errorMessage: string;

  constructor(private http: Http) {

  }

  loadForm() {
    this.getPaymentFormToken()
      .subscribe(token => {
        this.hostedPagesUrl = this.generatePaymentFormUrl(token.token, 'AU');

        console.log(this.hostedPagesUrl);
      });
  }

  sendIframeMessage(type: string) {
    let iframeContent = this.paymentIframe.nativeElement.contentWindow;
    iframeContent.postMessage({ actionType: type }, this.hostedPageUrl);
  }

  submitHostedPage() {
    this.sendIframeMessage('create');
  }

  cancel() {
    this.sendIframeMessage('cancel');
  }

  @HostListener('window:message', ['$event'])
  onMessageReceived(ev: MessageEvent) {
    if (ev.origin != this.hostedPageUrl) return;
    let response: PaymentFormResponse = JSON.parse(ev.data);

    console.log(response);
    if (response.error) {
      this.errorMessage = response.error.message;
    }
    else {
      this.createdPaymentMethod = response.data;
    }

  }


  private getPaymentFormToken() {
    return this.http
      .post(`${this.iamHostedUrl}/${this.paymentFormId}/token`, {})
      .flatMap(response => { return Observable.of(response.json()); });
  }

  private generatePaymentFormUrl(accessToken: string, countryCode: string): string {

    return `${this.hostedPageUrl}/paymentmethod/embed?token=${accessToken}&countryCode=${countryCode}&tncType=Merchant`;
  }


}
