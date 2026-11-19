<template>
    <section>
        <img
            v-if="pokemonId !== null"
            :src="pokemonImage"
            alt="Silueta de un Pokémon"
            :class="showPokemon ? 'fade-in h-[200px]' : 'brightness-0 h-[200px]'"
        />
    </section>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

interface Props {
    pokemonId: number | null;
    showPokemon?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    showPokemon: false,
});

const pokemonImage = computed(
    () => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.pokemonId}.png`
);
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