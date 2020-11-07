<link href="CurrencyConverter.scss" />
<script>
    import Combobox from "../Combobox/Combobox.svelte";
    import {getCurrencyConversion} from "../../stores/store";

    export let currencies;
    let currencyFrom;
    let valueFrom = 0;
    let currencyTo;
    let valueTo = undefined;

    const convert = async () => {
        const conversionRate = await getCurrencyConversion(currencyFrom.value, currencyTo.value, valueFrom);
        valueTo = conversionRate * valueFrom;
    };

    const isFormValid = () => {
        return !currencyFrom || !valueFrom || !currencyTo;
    };
</script>

<div class="currency-converter__wrapper">
  <div class="currency-converter__wrapper__section">
    <input type="number" step="0.1" bind:value={valueFrom} />
    <Combobox placeholder="Base Currency" options={currencies} id="currencyFrom" bind:selected={currencyFrom} />
  </div>
  <div class="currency-converter__wrapper__section">
    <Combobox placeholder="Final Currency" options={currencies} id="currencyTo" bind:selected={currencyTo} />
    <input type="number" step="0.1" bind:value={valueTo} disabled />
  </div>

  <div class="currency-converter__wrapper__convertion-button">
    <button on:click={ () => convert()}></button>
  </div>
</div>
