import {CurrencyProvider} from './Currency.provider';
import { readable } from 'svelte/store';

const currenciesProvider = new CurrencyProvider();
export const currencies = readable([], async (set) => {
    const collection = await currenciesProvider.getCurrencies();
    set(collection);
});

export const getCurrencyConversion = async (from, to, value) => {
    return currenciesProvider.getCurrencyConversion(from, to, value);
}
