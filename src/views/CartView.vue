<script setup>
    import { computed, inject } from 'vue'
    import { useStore } from 'vuex'
    import { formatBRL } from '@/utils/format'
    import { NOTIFY } from '@/constants'

    const store = useStore()
    const notify = inject('notify')

    const items = computed(() => store.getters['cart/items'])
    const total = computed(() => store.getters['cart/total'])
    const isEmpty = computed(() => store.getters['cart/isEmpty'])

    function decrement(id) {
        store.dispatch('cart/decrement', id)
    }

    function remove(id, name) {
        store.dispatch('cart/removeFromCart', id)
        notify(`"${name}" removido dos pedidos`, NOTIFY.INFO)
    }

    function checkout() {
        notify(`Pedido finalizado: ${formatBRL(total.value)}`, NOTIFY.SUCCESS)
        store.dispatch('cart/clearCart')
    }
</script>

<template>
    <div class="row g-4 align-items-start">
        <div v-if="isEmpty" class="col-12">
            <div class="card">
                <div class="card-body">
                    <div class="pn-empty">
                        <div class="pn-empty-icon">📋</div>
                        <p class="mb-0">
                            Você ainda não tem pedidos. Adicione itens pela
                            <router-link :to="{ name: 'menu' }">página de cardápio</router-link>.
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <template v-else>
            <section class="col-12 col-lg-8">
                <div class="card">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center mb-3 gap-3">
                            <div>
                                <h2 class="pn-card-title">Seus Pedidos</h2>
                                <p class="pn-card-sub">Revise quantidades e confirme</p>
                            </div>
                            <span class="pn-tag">{{ items.length }} item(ns)</span>
                        </div>

                        <div>
                            <div v-for="item in items" :key="item.id" class="pn-cart-item">
                                <div>
                                    <div class="pn-cust-name">{{ item.name }}</div>
                                    <div class="pn-cust-meta">
                                        {{ formatBRL(item.price) }} × {{ item.quantity }}
                                    </div>
                                </div>
                                <div class="d-flex align-items-center gap-2">
                                    <div class="pn-qty">
                                        <button @click="decrement(item.id)">−</button>
                                        <span>{{ item.quantity }}</span>
                                        <button @click="store.dispatch('cart/addToCart', item)">+</button>
                                    </div>
                                    <button
                                        class="btn btn-danger-soft btn-sm"
                                        @click="remove(item.id, item.name)"
                                    >
                                        ✕
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <aside class="col-12 col-lg-4">
                <div class="card">
                    <div class="card-body">
                        <h2 class="pn-card-title mb-3">Resumo</h2>

                        <div class="pn-summary-row">
                            <span class="pn-soft">Subtotal</span>
                            <span>{{ formatBRL(total) }}</span>
                        </div>
                        <div class="pn-summary-row">
                            <span class="pn-soft">Taxa de entrega</span>
                            <span class="pn-accent">Grátis</span>
                        </div>

                        <div class="pn-summary-total">
                            <span>Total</span>
                            <span>{{ formatBRL(total) }}</span>
                        </div>

                        <button class="btn btn-primary w-100" @click="checkout">
                            Finalizar pedido
                        </button>
                    </div>
                </div>
            </aside>
        </template>
    </div>
</template>

<style scoped>
    .pn-summary-row {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
        padding: 8px 0;
        border-bottom: 1px dashed var(--pn-border-soft);
    }

    .pn-summary-total {
        display: flex;
        justify-content: space-between;
        font-size: 20px;
        font-weight: 800;
        margin: 16px 0 18px 0;
        color: var(--pn-text);
    }

    .pn-summary-total span:last-child {
        color: var(--pn-orange);
    }
</style>
