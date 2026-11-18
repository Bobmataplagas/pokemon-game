import { computed, onMounted, ref } from 'vue'
import { GameStatus, type Pokemon, type PokemonListResponse } from "../interfaces"
import { pokemonApi } from '../api/pokemonApi';

export const usePokemonGame = () => {
    
    const gameStatus = ref<GameStatus>(GameStatus.Playing);
    const pokemons = ref<Pokemon[]>([])
    const pokemonOptions = ref<Pokemon[]>([]);
    const pokemonToGuess = ref<Pokemon | null>(null);
    const isLoading = computed(() => pokemons.value.length === 0);

    const getPokemons = async () => {
        const response = await pokemonApi.get<PokemonListResponse>('/?limit=1025');
        const pokemonsArray = response.data.results.map(pokemon => {
            const urlParts = pokemon.url.split('/');
            const id = urlParts.at(-2) ?? 0;
            return {
                name: pokemon.name,
                id: +id,
            }
        });
        return pokemonsArray.sort(() => Math.random() - 0.5);
    };

    const getNextOptions = (howMany: number = 4 ) => {
        gameStatus.value = GameStatus.Playing;
        pokemonOptions.value = pokemons.value.slice(0, howMany);
        pokemons.value = pokemons.value.slice(howMany);
        const randomIndex = Math.floor(Math.random() * pokemonOptions.value.length);
        pokemonToGuess.value = pokemonOptions.value[randomIndex] ?? null;
    };


    // Lo montamos directamente para ver el resultado al momento en que cargue la aplicación
    onMounted(async ()=>{
        await new Promise((r) => setTimeout(r, 1000));
        pokemons.value=await getPokemons();
        getNextOptions();
        console.log({ pokemons });
        console.log(pokemonOptions.value);
    });
    
    return {
        gameStatus,
        isLoading,
        pokemonOptions,
        pokemonToGuess,
        // Methods
        getNextOptions,
    };
}