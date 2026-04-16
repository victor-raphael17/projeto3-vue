<script setup>
    import { ref, onActivated } from 'vue'

    const visits = ref(0)
    onActivated(() => visits.value++)
</script>

<template>
    <div>
        <h3 class="pn-card-title fs-5 mb-2">Sobre o PizzaNow</h3>
        <p class="pn-soft" style="line-height: 1.7">
            Aplicação de exemplo construída com Vue 3 para demonstrar todos os principais
            conceitos do framework: componentes, reatividade, slots, roteamento, gestão
            de estado global e consumo de API.
        </p>
        <p class="pn-muted small mb-0">
            Esta aba foi montada {{ visits }} vez(es) — graças ao
            <code class="pn-accent">&lt;keep-alive&gt;</code>, o estado é
            preservado ao trocar de aba.
        </p>
    </div>
</template>
