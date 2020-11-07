<link href="CurrencyConverter.scss"/>
<script>
    import {getCurrencyConversion} from "../../stores/store";
    import CountryCombobox from "../Combobox/CountryCombobox.svelte";
    import {settings} from "../../config/env";

    export let currencies;
    let currencyFrom;
    let valueFrom = 0;
    let currencyTo;
    let valueTo = undefined;
    let errors = [];

    const submit = () => {
        errors = getFormValidationErrors();
        if (errors.length > 0) return;

        convert();
    };

    const convert = async () => {
        const conversionRate = await getCurrencyConversion(currencyFrom.value, currencyTo.value, valueFrom);
        valueTo = parseFloat(conversionRate * valueFrom).toFixed(settings.decimals);
    };

    const getFormValidationErrors = () => {
        const errors = [];
        if (!currencyFrom) errors.push({msg: 'No base currency selected!'});
        if (!currencyTo) errors.push({msg: 'No final currency selected!'});
        if (!valueFrom) errors.push({msg: 'No amount defined!'});
        return errors;
    };

    const clearResult = (event) => {
        valueTo = '';
    };
</script>

<style>
    .currency-converter__wrapper {
        display: block;
        padding: 16px;
    }

    .currency-converter__wrapper__section {
        display: flex;
        padding-bottom: 8px;
        width: 100%;
    }

    .currency-converter__wrapper__section input {
        flex: 1;
        width: 70%;
        border: none;
        border-bottom: 1px solid #EFEFEF;
        text-align: right;
        color: #666;
    }

    .currency-converter__wrapper__section input:disabled {
        font-weight: bold;
        color: black;
    }

    .currency-converter__wrapper__convertion-button {
        display: flex;
    }

    .currency-converter__wrapper__convertion-button button {
        flex: 1;
        background: #0E37E6;
        color: #FFF;
        border-radius: 10px;
        border: none;
        padding: 16px;
    }

    .currency-converter__wrapper__errors {
        display: block;
        border:1px solid red;
        padding: 16px;
    }

    .currency-converter__wrapper__errors ul li {
        color: red;
    }

    @media screen and (min-width: 600px) {
        .currency-converter__wrapper {
            width: 400px;
            margin: 0 auto;
        }
    }
</style>

<div class="currency-converter__wrapper">
  <form on:submit|preventDefault={submit}>
    <div class="currency-converter__wrapper__section">
      <CountryCombobox id="currencyFrom" options={currencies} bind:selected={currencyFrom} on:valueChanged={clearResult} />
      <input type="number" step="0.1" bind:value={valueFrom}/>
    </div>
    <div class="currency-converter__wrapper__section">
      <CountryCombobox id="currencyTo" options={currencies} bind:selected={currencyTo} on:valueChanged={clearResult} />
      <input type="number" step="0.1" bind:value={valueTo} disabled/>
    </div>

    <div class="currency-converter__wrapper__convertion-button">
      <button type="submit">Convert</button>
    </div>
  </form>

  {#if errors.length}
    <div class="currency-converter__wrapper__errors">
      <span>Something went wrong:</span>
      <ul>
        {#each errors as error}
          <li>{error.msg}</li>
        {/each}
      </ul>
    </div>
  {/if}
</div>
