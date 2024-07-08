import { h,Component,State, Event ,EventEmitter} from "@stencil/core";
import { AV_API_KEY } from "../../global/global";

const mockData = {
  bestMatches: [
      {
          symbol: "TSCO.LON",
          name: "Tesco PLC",
          type: "Equity",
      },
      {
          symbol: "TSCDF",
          name: "Tesco plc",
          type: "Equity",
      },
      {
          symbol: "TSCDY",
          name: "Tesco plc",
          type: "Equity",
      },
      {
          symbol: "TCO2.FRK",
          name: "TESCO PLC ADR/1 LS-05",
          type: "Equity",
      },
      {
          symbol: "TCO0.FRK",
          name: "TESCO PLC LS-0633333",
          type: "Equity",
      }
  ]
}

@Component({
  tag: 'ui-stock-finder',
  styleUrl: './stock-finder.css',
  shadow: true
})
export class StockFinder {
  stockSymbolUserInput: HTMLInputElement;
  @State()
  searchResults: { symbol:string, name:string} [];

  @State() isLoading: boolean;

  @Event({bubbles: true, composed: true})
  uiSymbolSelected: EventEmitter<string>;

  onSymbolSelect(symbol:string) {
    this.uiSymbolSelected.emit(symbol)
  }

  onFindStock(event: Event) {
    event.preventDefault();
    const stockSymbolValue = this.stockSymbolUserInput.value;
    this.findStocks(stockSymbolValue);

  }

  findStocks(inputSybmol:string) {
    this.isLoading = true;
    fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${inputSybmol}&apikey=${AV_API_KEY}`)
    .then(() => mockData)
    .then(parsed => {
      console.log("datata",parsed)
      if(!parsed['bestMatches']){
        throw new Error('No matches found');
      }
      this.searchResults = parsed["bestMatches"].map(stock => {
        return { name: stock.name, symbol: stock.symbol}
      })
    })
    .catch(err => console.error(err.message))
    setTimeout(()=>{
      this.isLoading = false;
    },2000)

  }

  render() {
    let dataContent;
    if(this.isLoading)
      dataContent = <ui-spinner/>
    else {
      dataContent=<div>
      {
        this.searchResults ?
        <ul>
          { this.searchResults.map(result => {
            return <li key={result.symbol} onClick={this.onSymbolSelect.bind(this,result.symbol)}><strong>{result.symbol}-</strong>{result.name}</li>
          })}
        </ul>
        : <p>please enter a stock</p>
      }
      </div>
    }


    return[<form onSubmit={this.onFindStock.bind(this)}>
      <input type="text"
      id="stock-symbol"
      ref={el => this.stockSymbolUserInput = el}
      />
      <button type="submit">Find stock</button>
    </form>,
    <div>
      { dataContent}
    </div>

    ]
  }

}
