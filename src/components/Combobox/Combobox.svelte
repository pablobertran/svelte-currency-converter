<script>
    import {settings} from "../../config/env";

    export let id = null;
    export let options = [];
    export let baseCurrency = settings.baseCurrency
    export let selected;
    export let placeholder = 'Pick an option';


</script>

<select
  bind:value={selected}
  name={id}
  id={id}>
  <option value={undefined}>{placeholder}</option>
  {#each options as option}
    <option value={option}>{option.label}</option>
    {/each}
</select>
