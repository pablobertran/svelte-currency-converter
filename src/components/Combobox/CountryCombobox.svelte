<script>
    import {settings} from "../../config/env";
    import {createEventDispatcher} from 'svelte';

    const dispatch = createEventDispatcher();

    export let id;
    export let options = [];
    export let selected = {value: settings.baseCurrency};
    const changed = () => {
        dispatch('valueChanged', {selected});
    }

    let comboOpened = false;

    const getFlagURL = (currency) => {
        return `assets/flags/${currency.toLowerCase()}.png`;
    };

    const pickCountry = (country) => {
        selected = country;
        comboOpened = false;
        changed();
        closeCombo();
    }

    const closeCombo = () => {
        const elem = document.getElementById(id);
        elem.style.zIndex = "-9999";
        elem.style.opacity = "0";
    }

    const openCombo = () => {
        comboOpened = true;
        const elem = document.getElementById(id);
        elem.style.zIndex = "9999";
        elem.style.opacity = "1";
    };
</script>

<style>
    span img {
        width: 40px;
    }

    .flag {
        display: block;
        width: 40px;
        height: 25px;
        border-radius: 5px;
        margin-right: 16px;
        float: left;
        background-size: cover;
    }

    .combobox-list {
        opacity: 0;
        position: fixed;
        z-index: -999;
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.4);
        transition: opacity 0.5s;
    }

    @keyframes fadein {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    ul {
        margin: 0;
        padding: 0;
        display: block;
        width: 200px;
        height: 80%;
        overflow-y: scroll;
        margin: 20px auto 0 auto;
    }

    ul li {
        margin: 0;
        list-style: none;
        display: block;
        padding: 8px;
        background-color: #FFF;
    }

    ul li:nth-child(odd) {
        background-color: #EFEFEF;
    }

    .country-item {
        display: flex;
        height: 30px;
    }

    .country-item span:first-child {
        margin-right: 16px;
    }


    .current-currency {
        padding-right: 16px;
    }

    @media screen and (max-width: 600px) {
        ul {
            width: 90%;
            height: 95%;
        }
    }
</style>


<span class="current-currency" on:click={ () => openCombo()}>
  <span class="country-item">
    <span class="flag" style={`background-image: url(${getFlagURL(selected.value)})`}></span>
    <span>{selected.value}</span>
  </span>
  </span>

<div class="combobox-list" id={id}>
  <ul>
    {#each options as option}
      <li on:click={ () => pickCountry(option)}>
        <span class="country-item">
          <span><img src={getFlagURL(option.value)} alt={option.value}></span>
          <span>{option.label}</span>
        </span>
      </li>
    {/each}
  </ul>
</div>
