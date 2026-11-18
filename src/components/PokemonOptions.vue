<template>
    <section class="mt-5">
        <div class="flex flex-wrap justify-center">
            <button
                v-for="pokemon in pokemons"
                :key="pokemon.id"
                type="button"
                :disabled="disabled"
                class="capitalize text-black"
                @click="emit('select', pokemon)"
            >
                {{ pokemon.name }}
            </button>
        </div>
    </section>
</template>

<script lang="ts" setup>
import type { Pokemon } from '@/modules/pokemon/interfaces';

defineProps<{
    pokemons: Pokemon[];
    disabled: boolean;
}>();

const emit = defineEmits<{
    select: [pokemon: Pokemon];
}>();
</script>

<style scoped>
@reference "tailwindcss";

button {
    @apply bg-white shadow-md rounded-lg p-3 m-1 cursor-pointer w-36 text-black text-center transition-all hover:bg-gray-100 sm:m-2 sm:w-40;
}

button:disabled {
    @apply cursor-default opacity-60;
}

</style>