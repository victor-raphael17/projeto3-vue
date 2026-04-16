<script setup>
    import { ref, provide, computed } from 'vue'
    import { useRoute } from 'vue-router'
    import NavBar from './components/NavBar.vue'
    import NotificationToast from './components/NotificationToast.vue'

    const route = useRoute()
    const notifications = ref([])

    function notify(message, type = 'info') {
        notifications.value.push({
            id: crypto.randomUUID(),
            message,
            type,
        })
    }

    function removeNotification(id) {
        notifications.value = notifications.value.filter((n) => n.id !== id)
    }

    provide('notify', notify)

    const pageTitle = computed(() => route.meta?.title || 'PizzaNow')
    const pageSubtitle = computed(() => route.meta?.subtitle || '')
    const isPlain = computed(() => !!route.meta?.plain)

    const today = new Date().toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    })
</script>

<template>
    <div id="app">
        <div v-if="isPlain" class="pn-plain">
            <router-view v-slot="{ Component }">
                <transition name="fade" mode="out-in">
                    <component :is="Component" />
                </transition>
            </router-view>
        </div>

        <div v-else class="pn-shell">
            <NavBar />

            <div class="pn-main">
                <header class="pn-topbar">
                    <div class="pn-topbar-title">
                        <h1>{{ pageTitle }}</h1>
                        <p>
                            {{ pageSubtitle }}
                            <template v-if="pageSubtitle"> · </template>
                            <span class="pn-accent">Hoje, {{ today }}</span>
                        </p>
                    </div>
                </header>

                <main class="pn-content">
                    <router-view v-slot="{ Component }">
                        <transition name="fade" mode="out-in">
                            <component :is="Component" />
                        </transition>
                    </router-view>
                </main>
            </div>
        </div>

        <div class="position-fixed bottom-0 end-0 p-3 d-flex flex-column align-items-end" style="z-index: 1080">
            <NotificationToast
                v-for="toast in notifications"
                :key="toast.id"
                :message="toast.message"
                :type="toast.type"
                @dismiss="removeNotification(toast.id)"
            />
        </div>
    </div>
</template>
