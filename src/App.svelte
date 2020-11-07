<script>
    import {currencies} from "./stores/store";
    import CurrencyConverter from "./components/CurrencyConverter/CurrencyConverter.svelte";

    export let name;

</script>

<style>
    @media screen and (min-width: 600px){
        main {
            padding-top: 100px;
        }
    }
</style>

<main>
    <CurrencyConverter currencies={$currencies}/>
</main>
