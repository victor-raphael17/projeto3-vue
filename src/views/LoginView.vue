<script setup>
    import { ref, inject } from 'vue'
    import { useStore } from 'vuex'
    import { useRouter, useRoute } from 'vue-router'
    import { NOTIFY } from '@/constants'

    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const notify = inject('notify')

    const username = ref('')
    const error = ref('')

    function submit() {
        const name = username.value.trim()
        if (!name) {
            error.value = 'Informe um nome de usuário'
            return
        }
        store.dispatch('auth/login', { username: name })
        notify(`Bem-vindo, ${name}!`, NOTIFY.SUCCESS)
        const raw = route.query.redirect
        const isSafeInternal = typeof raw === 'string' && /^\/(?!\/)/.test(raw)
        router.push(isSafeInternal ? raw : { name: 'home' })
    }
</script>

<template>
    <div class="card pn-login-card">
        <div class="card-body p-4">
            <div class="pn-login-brand">
                <div class="pn-brand-logo" style="width: 48px; height: 48px; font-size: 24px">🍕</div>
                <div>
                    <div class="pn-brand-name" style="font-size: 22px">PizzaNow</div>
                    <div class="pn-brand-sub">Gestão de Pizzaria</div>
                </div>
            </div>

            <h1 class="pn-card-title fs-4 mb-1">Acesse sua conta</h1>
            <p class="pn-card-sub mb-3">Login simulado: qualquer usuário é aceito.</p>

            <form @submit.prevent="submit">
                <div class="mb-3">
                    <label for="username" class="pn-label">Usuário</label>
                    <input
                        id="username"
                        v-model.trim="username"
                        type="text"
                        class="form-control"
                        placeholder="seu_usuario"
                        required
                    />
                </div>

                <div v-if="error" class="alert alert-danger mb-3">{{ error }}</div>

                <button type="submit" class="btn btn-primary w-100">
                    Entrar no painel
                </button>
            </form>

            <p class="pn-muted small mt-3 text-center mb-1">
                Necessário para acessar os pedidos (rota protegida).
            </p>

            <router-link
                :to="{ name: 'home' }"
                class="pn-muted small d-block text-center"
            >
                ← Voltar ao dashboard
            </router-link>
        </div>
    </div>
</template>

<style scoped>
    .pn-login-card {
        width: 100%;
        max-width: 420px;
    }

    .pn-login-brand {
        display: flex;
        align-items: center;
        gap: 14px;
        margin-bottom: 28px;
        padding-bottom: 20px;
        border-bottom: 1px solid var(--pn-border-soft);
    }
</style>
