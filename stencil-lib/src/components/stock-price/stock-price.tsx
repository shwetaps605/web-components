import {h, Component, Prop, State, Element, Watch, Listen } from "@stencil/core";
import { AV_API_KEY } from "../../global/global";


@Component({
  tag:'ui-stock-price',
  styleUrl: './stock-price.css',
  shadow: true
})
export class StockPrice {

  @Prop({mutable: true, reflect: true}) stockSymbol : string;

  initialStockSymbol: string;

  stockInput: HTMLInputElement;

  @Element() el:HTMLElement;

  @State()
  fetchedPrice: number;

  @State()
  userInput: string;

  @State() isStockInputValid = false;

  @State() error: string;

  @State() isLoading: boolean;

  @Watch('stockSymbol')
  stockSymbolChanged(newValue: string, oldValue: string) {
    if(newValue !== oldValue) {
      this.userInput = newValue;

      this.fetchStockPrice(newValue)
    }

  }

  @Listen('uiSymbolSelected', { target: 'body'})
  onStockSymbolSelected(event: CustomEvent){
    if(event.detail && event.detail != this.stockSymbol){
      console.log('WOOOOHOOOOO', event.detail)
      this.stockSymbol = event.detail

    }
  }


  componentWillLoad(){
    console.log('componentWillLoad--->',this.stockSymbol)

  }

  componentDidLoad() {
    if(this.stockSymbol) {
      this.userInput = this.stockSymbol;
      this.isStockInputValid = true;
      this.initialStockSymbol = this.stockSymbol;
      this.fetchStockPrice(this.stockSymbol);
    }
  }

  componentWillUpdate(){
    console.log('componentWillUpdate')
  }

  componentDidUpdate(){
    console.log('componentDidUpdate')
    if(this.initialStockSymbol !== this.stockSymbol){
      //this.fetchStockPrice(this.stockSymbol)
    }
  }

  disconnectedCallback(){
    console.log('componentDidUnload')
  }


   async onUserInputSubmit (event: Event) {
    event.preventDefault();
    //const stockSymbol = (this.el.shadowRoot.querySelector('#stock-symbol') as HTMLInputElement).value
    const stockSymbol = this.stockInput.value;
    await this.fetchStockPrice(stockSymbol);
  }

  fetchStockPrice(stockSymbolInput:String) {
    this.isLoading = true;
    fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbolInput}&apikey=${AV_API_KEY}`)
    .then(data => {
      return data.json()
    })
    .then(parsed => {
      console.log('json data-->',parsed)
      if(!parsed['Global Quote']['05. price']) {
        throw new Error('Invalid symbol');
      }
      this.fetchedPrice = +parsed['Global Quote']['05. price']
      this.error = null;
    })
    .catch(err => {

      this.error = err.message;
      this.fetchedPrice = null;
    })
    //console.log('RESPONSE',res)
    this.isLoading = false;
  }

  hostData() {
    return {class: this.error ? 'error' :''}
  }

  onInputChange(event: Event) {
    this.userInput = (event.target as HTMLInputElement).value;
    if(this.userInput.trim() !== ''){
      this.isStockInputValid = true;
    } else {
      this.isStockInputValid = false;
    }
  }

  render() {
    let dataContent = <p>please enter a symbol</p>;
    if(this.error) {
      dataContent = <p>erro:{this.error}</p>
    }
    if(this.fetchedPrice) {
      dataContent = <p>Price: ${this.fetchedPrice}</p>;
    }
    if(this.isLoading) {
      dataContent = <ui-spinner/>
    }
    return[
      <form onSubmit={this.onUserInputSubmit.bind(this)}>
        <input id='stock-symbol' ref={el => this.stockInput = el} value={this.userInput}
        onInput={this.onInputChange.bind(this)}/>
        <button disabled={!this.isStockInputValid} type="submit">Fetch</button>
      </form>
      ,
      <div>
        {dataContent}
      </div>
    ]
  }

}
