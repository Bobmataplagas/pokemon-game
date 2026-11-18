<template>
    <section v-if="isLoading" class="flex flex-col justify-center items-center w-screen h-screen">
        <h1 class="text-3xl">Espere por favor</h1>
        <h3 class="animate-pulse">Cargando Pokémon</h3>
    </section>

    <section v-else class="flex flex-col justify-center items-center w-screen h-screen">
        <div
            v-if="gameStatus === GameStatus.Won"
            class="confetti-container"
            aria-hidden="true"
        >
            <span
                v-for="piece in 40"
                :key="piece"
                class="confetti-piece"
                :style="{
                    left: `${((piece * 47) % 97) + 1}%`,
                    animationDelay: `${(piece % 10) * 0.06}s`,
                    animationDuration: `${2.4 + (piece % 4) * 0.2}s`,
                    backgroundColor: confettiColors[piece % confettiColors.length],
                    '--drift': `${((piece % 7) - 3) * 28}px`,
                    '--scatter-top': `${(piece * 31) % 81}%`,
                }"
            />
        </div>
        <h1 class="mt-5">¿Quién es este Pokémon?</h1>
        <h3 class="capitalize">{{ gameStatus }}</h3>
        <div class="h-20">
            <button v-if="gameStatus !== GameStatus.Playing" @click="resetGame">
                Jugar de nuevo
            </button>
        </div>
        <!-- Pokémon Picture -->
        <PokemonPicture :pokemon-id="pokemonToGuess?.id ?? null" />
        <!-- Pokémon Options-->
        <PokemonOptions
            :pokemons="pokemonOptions"
            :block-selection="gameStatus!=GameStatus.Playing"
            :correct-answer="pokemonToGuess?.id ?? null"
            :disabled="gameStatus === GameStatus.Won"
            @select="checkAnswer"
        />
        <div
            v-if="gameStatus === GameStatus.Won"
            class="correct-answer"
            role="status"
            aria-live="polite"
        >
            ¡Correcto!
        </div>
        <div
            v-if="isIncorrectAnswer"
            :key="incorrectAnswerAttempts"
            class="incorrect-answer"
            role="alert"
            aria-live="assertive"
        >
            ¡Incorrecto! Inténtalo de nuevo.
        </div>
    </section>


</template>

<script lang="ts" setup>
import { ref } from 'vue';
import PokemonOptions from '@/components/PokemonOptions.vue';
import PokemonPicture from '../components/PokemonPicture.vue';
import { usePokemonGame } from '../composables/usePokemonGame.ts';
import { GameStatus, type Pokemon } from '../interfaces';
const { gameStatus, isLoading, pokemonOptions, pokemonToGuess, resetGame } = usePokemonGame();
const confettiColors = ['#f43f5e', '#eab308', '#22c55e', '#3b82f6', '#a855f7'];
const isIncorrectAnswer = ref(false);
const incorrectAnswerAttempts = ref(0);

const checkAnswer = (pokemon: Pokemon) => {
    if (pokemon.id === pokemonToGuess.value?.id) {
        isIncorrectAnswer.value = false;
        gameStatus.value = GameStatus.Won;
        return;
    }

    isIncorrectAnswer.value = true;
    incorrectAnswerAttempts.value++;
};
</script>

<style scoped>
.correct-answer,
.incorrect-answer {
    margin-top: 1rem;
    border-radius: 0.75rem;
    padding: 0.75rem 1.5rem;
    font-size: 1.5rem;
    font-weight: 700;
}

.correct-answer {
    background: #dcfce7;
    color: #15803d;
    animation: correct-answer-pop 500ms ease-out both;
}

.incorrect-answer {
    background: #fee2e2;
    color: #b91c1c;
    animation: incorrect-answer-shake 400ms ease-in-out both;
}

.confetti-container {
    position: fixed;
    inset: 0;
    z-index: 20;
    overflow: hidden;
    pointer-events: none;
}

.confetti-piece {
    position: absolute;
    top: -1rem;
    width: 0.6rem;
    height: 0.9rem;
    border-radius: 2px;
    animation: confetti-fall 2.8s ease-in forwards;
}

@keyframes correct-answer-pop {
    0% {
        opacity: 0;
        transform: scale(0.65) translateY(0.75rem);
    }

    70% {
        opacity: 1;
        transform: scale(1.1);
    }

    100% {
        transform: scale(1);
    }
}

@keyframes confetti-fall {
    from {
        opacity: 1;
        transform: translate3d(0, -1rem, 0) rotate(0);
    }

    to {
        opacity: 0;
        transform: translate3d(var(--drift), 105vh, 0) rotate(720deg);
    }
}

@media (prefers-reduced-motion: reduce) {
    .correct-answer,
    .incorrect-answer {
        animation: none;
    }

    .confetti-piece {
        top: var(--scatter-top);
        animation: confetti-fade 1.4s ease-out both;
    }
}

@keyframes confetti-fade {
    0% {
        opacity: 0;
        transform: scale(0.5);
    }

    20% {
        opacity: 0.85;
        transform: scale(1);
    }

    100% {
        opacity: 0;
        transform: scale(1);
    }
}
</style>