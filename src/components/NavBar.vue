<script setup>
    import { computed } from 'vue'
    import { useStore } from 'vuex'
    import { useRouter } from 'vue-router'

    const store = useStore()
    const router = useRouter()

    const isAuthenticated = computed(() => store.getters['auth/isAuthenticated'])
    const username = computed(() => store.getters['auth/username'])
    const cartCount = computed(() => store.getters['cart/count'])

    const initials = computed(() => {
        const name = username.value || 'Guest'
        return name
            .split(' ')
            .slice(0, 2)
            .map((p) => p[0]?.toUpperCase())
            .join('')
    })

    function logout() {
        store.dispatch('auth/logout')
        router.push({ name: 'home' })
    }
</script>

<template>
    <aside class="pn-sidebar">
        <div class="pn-brand">
            <div class="pn-brand-logo">🍕</div>
            <div>
                <div class="pn-brand-name">PizzaNow</div>
                <div class="pn-brand-sub">Gestão de Pizzaria</div>
            </div>
        </div>

        <nav class="d-flex flex-column gap-1">
            <div class="pn-nav-title">Principal</div>
            <router-link class="pn-nav-link" :to="{ name: 'home' }">
                <span class="pn-nav-icon">▦</span>
                Dashboard
            </router-link>
            <router-link class="pn-nav-link" :to="{ name: 'menu' }">
                <span class="pn-nav-icon">🍕</span>
                Cardápio
            </router-link>
            <router-link class="pn-nav-link" :to="{ name: 'cart' }">
                <span class="pn-nav-icon">📋</span>
                Pedidos
                <span v-if="cartCount > 0" class="pn-nav-badge">{{ cartCount }}</span>
            </router-link>
        </nav>

        <nav class="d-flex flex-column gap-1">
            <div class="pn-nav-title">Outros</div>
            <router-link class="pn-nav-link" :to="{ name: 'about' }">
                <span class="pn-nav-icon">ⓘ</span>
                Sobre
            </router-link>
            <template v-if="isAuthenticated">
                <button class="pn-nav-link" type="button" @click="logout">
                    <span class="pn-nav-icon">⎋</span>
                    Sair
                </button>
            </template>
            <router-link v-else class="pn-nav-link" :to="{ name: 'login' }">
                <span class="pn-nav-icon">⇲</span>
                Entrar
            </router-link>
        </nav>

        <div class="pn-user-card">
            <div class="pn-avatar">{{ isAuthenticated ? initials : '?' }}</div>
            <div>
                <div class="pn-user-name">
                    {{ isAuthenticated ? username : 'Visitante' }}
                </div>
                <div class="pn-user-role">
                    {{ isAuthenticated ? 'Operador' : 'Não logado' }}
                </div>
            </div>
        </div>
    </aside>
</template>

<style scoped>
    button.pn-nav-link {
        background: transparent;
        border: 1px solid transparent;
        text-align: left;
        width: 100%;
        font-family: inherit;
        cursor: pointer;
    }
</style>
