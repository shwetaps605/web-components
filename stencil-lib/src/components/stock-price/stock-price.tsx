import {h, Component, Prop, State, Element } from "@stencil/core";
import { AV_API_KEY } from "../../global/global";


@Component({
  tag:'ui-stock-price',
  styleUrl: './stock-price.css',
  shadow: true
})
export class StockPrice {

  stockInput: HTMLInputElement;

  @Element() el:HTMLElement;

  @State()
  fetchedPrice: number;

  @State()
  userInput: string;

  @State() isStockInputValid = false;


  async onFetchStockPrice (event: Event) {
    event.preventDefault();
    //const stockSymbol = (this.el.shadowRoot.querySelector('#stock-symbol') as HTMLInputElement).value
    const stockSymbol = this.stockInput.value;
    console.log('stock symbol',stockSymbol)
    const res = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${AV_API_KEY}`)
    .then(data => data.json())
    .then(parsed => this.fetchedPrice = +parsed['Global Quote']['05. price'])
    .catch(err => console.error(err))
    console.log(this.fetchedPrice)
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
    return[
      <form onSubmit={this.onFetchStockPrice.bind(this)}>
        <input id='stock-symbol' ref={el => this.stockInput = el} value={this.userInput}
        onInput={this.onInputChange.bind(this)}/>
        <button disabled={!this.isStockInputValid} type="submit">Fetch</button>
      </form>
      ,
      <div>
        <p>Price: ${this.fetchedPrice}</p>
      </div>
    ]
  }

}
