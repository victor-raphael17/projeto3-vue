<script setup>
    const stack = [
        { name: 'Vue 3', desc: 'Framework reativo baseado em componentes' },
        { name: 'Vue Router 4', desc: 'Roteamento SPA com guards de navegação' },
        { name: 'Vuex 4', desc: 'Gerenciamento de estado global com módulos' },
        { name: 'Axios', desc: 'Cliente HTTP para consumo de API REST' },
        { name: 'Vite', desc: 'Build tool e dev server' },
        { name: 'Bootstrap 5', desc: 'Framework de UI responsivo' },
    ]
</script>

<template>
    <div>
        <h3 class="pn-card-title fs-5 mb-3">Stack Técnico</h3>
        <div>
            <div
                v-for="tech in stack"
                :key="tech.name"
                class="pn-tech-row"
            >
                <strong>{{ tech.name }}</strong>
                <span class="pn-muted small">{{ tech.desc }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .pn-tech-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 0;
        border-bottom: 1px solid var(--pn-border-soft);
    }
    .pn-tech-row:last-child {
        border-bottom: none;
    }
    .pn-tech-row strong {
        color: var(--pn-text);
    }
</style>
