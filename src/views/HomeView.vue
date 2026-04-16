<script setup>
    import { computed } from 'vue'
    import { useStore } from 'vuex'
    import { useRouter } from 'vue-router'
    import { formatBRL } from '@/utils/format'

    const store = useStore()
    const router = useRouter()
    const cartCount = computed(() => store.getters['cart/count'])

    const stats = [
        {
            label: 'Pedidos Hoje',
            value: 87,
            icon: '📦',
            delta: '+12%',
            trend: 'up',
        },
        {
            label: 'Faturamento',
            value: 'R$ 4.280',
            icon: '💰',
            delta: '+8,4%',
            trend: 'up',
        },
        {
            label: 'Tempo Médio',
            value: '32 min',
            icon: '⏱',
            delta: '-3 min',
            trend: 'down',
        },
        {
            label: 'Avaliação',
            value: '4.8',
            icon: '★',
            delta: '+0,2',
            trend: 'up',
        },
    ]

    const recentOrders = [
        {
            id: '#1047',
            name: 'Rafael Mendes',
            meta: 'Mussarela · 1 item',
            address: 'Rua das Acácias, 212 · Jardim América',
            status: 'preparing',
            statusLabel: 'Preparando',
            total: 62.9,
            color: '#f97316',
        },
        {
            id: '#1046',
            name: 'Ana Souza',
            meta: 'Calabresa · 2 itens',
            address: 'Av. Paulista, 1500 · Bela Vista',
            status: 'delivery',
            statusLabel: 'Saiu p/ entrega',
            total: 98.0,
            color: '#38bdf8',
        },
        {
            id: '#1045',
            name: 'Lucas Costa',
            meta: '4 Queijos · 1 item',
            address: 'R. Augusta, 901 · Consolação',
            status: 'done',
            statusLabel: 'Entregue',
            total: 124.5,
            color: '#22c55e',
        },
        {
            id: '#1044',
            name: 'Juliana Oliveira',
            meta: 'Margherita · 3 itens',
            address: 'Al. Santos, 76 · Jardins',
            status: 'preparing',
            statusLabel: 'Preparando',
            total: 81.3,
            color: '#eab308',
        },
        {
            id: '#1043',
            name: 'Pedro Tavares',
            meta: 'Frango c/ Catupiry · 2',
            address: 'R. Harmonia, 18 · Vila Madalena',
            status: 'pending',
            statusLabel: 'Pendente',
            total: 76.0,
            color: '#a855f7',
        },
    ]

    const bestSellers = [
        { name: 'Calabresa', meta: 'Tradicional · G', count: 142 },
        { name: '4 Queijos', meta: 'Especial · G', count: 118 },
        { name: 'Frango c/ Catupiry', meta: 'Especial · G', count: 97 },
        { name: 'Margherita', meta: 'Tradicional · M', count: 81 },
    ]

    const deliveries = [
        { id: '#1046', driver: 'Marcos', progress: 72, eta: '8 min' },
        { id: '#1042', driver: 'Carla', progress: 45, eta: '15 min' },
        { id: '#1040', driver: 'João', progress: 90, eta: '2 min' },
    ]

    function goMenu() {
        router.push({ name: 'menu' })
    }
</script>

<template>
    <div>
        <div class="row g-3 mb-4">
            <div v-for="(kpi, i) in stats" :key="i" class="col-12 col-md-6 col-xl-3">
                <div class="pn-kpi">
                    <div class="pn-kpi-label">
                        <span class="pn-kpi-icon">{{ kpi.icon }}</span>
                        {{ kpi.label }}
                    </div>
                    <div class="pn-kpi-value">{{ kpi.value }}</div>
                    <span :class="['pn-kpi-delta', kpi.trend]">
                        {{ kpi.trend === 'up' ? '▲' : kpi.trend === 'down' ? '▼' : '•' }}
                        {{ kpi.delta }}
                    </span>
                </div>
            </div>
        </div>

        <div class="row g-3">
            <section class="col-12 col-xl-8">
                <div class="card h-100">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center mb-3 gap-3">
                            <div>
                                <h2 class="pn-card-title">Pedidos Recentes</h2>
                                <p class="pn-card-sub">Últimos pedidos recebidos hoje</p>
                            </div>
                            <button class="btn btn-ghost btn-sm" @click="goMenu">
                                Ver cardápio →
                            </button>
                        </div>

                        <div class="table-responsive">
                            <table class="table table-hover align-middle mb-0">
                                <thead>
                                    <tr>
                                        <th>Pedido</th>
                                        <th>Cliente</th>
                                        <th>Endereço</th>
                                        <th>Status</th>
                                        <th class="text-end">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="order in recentOrders" :key="order.id">
                                        <td class="pn-order-id">{{ order.id }}</td>
                                        <td>
                                            <div class="pn-cust">
                                                <div
                                                    class="pn-cust-avatar"
                                                    :style="{ background: order.color }"
                                                >
                                                    {{ order.name.charAt(0) }}
                                                </div>
                                                <div>
                                                    <div class="pn-cust-name">{{ order.name }}</div>
                                                    <div class="pn-cust-meta">{{ order.meta }}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="pn-soft small">{{ order.address }}</td>
                                        <td>
                                            <span :class="['pn-pill', order.status]">
                                                {{ order.statusLabel }}
                                            </span>
                                        </td>
                                        <td class="text-end fw-bold">
                                            {{ formatBRL(order.total) }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            <aside class="col-12 col-xl-4 d-flex flex-column gap-3">
                <section class="card">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center mb-3 gap-3">
                            <div>
                                <h2 class="pn-card-title">Mais Vendidos</h2>
                                <p class="pn-card-sub">Top sabores da semana</p>
                            </div>
                        </div>
                        <div>
                            <div
                                v-for="(item, i) in bestSellers"
                                :key="item.name"
                                class="pn-topseller"
                            >
                                <div class="pn-topseller-rank">{{ i + 1 }}</div>
                                <div>
                                    <div class="pn-topseller-name">{{ item.name }}</div>
                                    <div class="pn-topseller-meta">{{ item.meta }}</div>
                                </div>
                                <div class="pn-topseller-count">{{ item.count }}</div>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="card">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center mb-3 gap-3">
                            <div>
                                <h2 class="pn-card-title">Entregas em Andamento</h2>
                                <p class="pn-card-sub">Status dos entregadores</p>
                            </div>
                        </div>
                        <div>
                            <div
                                v-for="d in deliveries"
                                :key="d.id"
                                class="pn-delivery-item"
                            >
                                <div class="pn-delivery-head">
                                    <span>
                                        <strong>{{ d.id }}</strong> · {{ d.driver }}
                                    </span>
                                    <span class="pn-accent">{{ d.eta }}</span>
                                </div>
                                <div class="progress">
                                    <div
                                        class="progress-bar"
                                        role="progressbar"
                                        :style="{ width: d.progress + '%' }"
                                        :aria-valuenow="d.progress"
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="card">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center mb-3 gap-3">
                            <div>
                                <h2 class="pn-card-title">Seus Pedidos</h2>
                                <p class="pn-card-sub">{{ cartCount }} item(ns)</p>
                            </div>
                        </div>
                        <router-link class="btn btn-primary w-100" :to="{ name: 'cart' }">
                            Abrir pedidos →
                        </router-link>
                    </div>
                </section>
            </aside>
        </div>
    </div>
</template>
