<template>
    <section>
        <img
            v-if="pokemonId !== null"
            :pokemonImage
            alt="Silueta de un Pokémon"
            class="brightness-0 h-[200px]"
        />
        <img
            v-else
            :pokemonImage
            alt="Silueta de un Pokémon"
            class="fade-in h-[200px]"
        />
    </section>
</template>

<script lang="ts" setup>
defineProps<{
    pokemonId: number | null;
}>();

import {computed} from 'vue';
interface Props{
    pokemonId: number;
    showPokemon?: boolean;
}

const props = withDefaults(defineProps<Props>(),{
    showPokemon: false,
});

const pokemonImage=computed(()=>`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`)

</script>

<style scope>
img{
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
}
</style>