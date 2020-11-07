<script>
    import {currencies} from "./stores/store";
    import CurrencyConverter from "./components/CurrencyConverter/CurrencyConverter.svelte";

    export let name;

</script>

<main>
    <CurrencyConverter currencies={$currencies}/>
</main>
