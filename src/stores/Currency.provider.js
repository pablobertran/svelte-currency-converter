import {settings} from "../config/env";

export class CurrencyProvider {

    _currencies;
    _apiURL;
    _baseCurrency;

    constructor() {
        this._apiURL = settings.api.url;
        this._baseCurrency = settings.baseCurrency;
    }

    setBaseCurrency(baseCurrency) {
        if(!this.isCurrencyValid(baseCurrency)) throw {message: 'Invalid currency', error: baseCurrency};
        this._baseCurrency = baseCurrency;
    }

    async getCurrencies() {
        const rawResponse = await fetch(`${this._apiURL}currencies?apiKey=${settings.api.key}`);
        const response = await rawResponse.json();
        this._currencies = Object.keys(response.results).map( (key) => {
            return {
                value: key,
                label: `${key} - ${response.results[key].currencyName}`
            };
        });
        return this._currencies;
    }

    async getCurrencyConversion(from = this._baseCurrency, to = '', amount = 0) {
        const rawResponse = await fetch(`${this._apiURL}convert?apiKey=${settings.api.key}&q=${from}_${to}`);
        const response = await rawResponse.json();
        return response.results[`${from}_${to}`].val;
    }

    isCurrencyValid(currency) {
        return !!this._currencies.find( c => c.value);
    }
}
