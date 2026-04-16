<script setup>
    import { ref, computed, watch, inject } from 'vue'
    import MenuForm from '@/components/MenuForm.vue'
    import CategoryFilter from '@/components/CategoryFilter.vue'
    import MenuItem from '@/components/MenuItem.vue'
    import MenuSummary from '@/components/MenuSummary.vue'
    import { fetchSuggestions } from '@/services/api'
    import { NOTIFY, ALL_CATEGORY } from '@/constants'

    const STORAGE_KEY = 'cardapio-items'
    const notify = inject('notify')

    function loadSaved() {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (!saved) return []
        try {
            return JSON.parse(saved)
        } catch {
            localStorage.removeItem(STORAGE_KEY)
            return []
        }
    }

    const items = ref(loadSaved())
    const activeCategory = ref(ALL_CATEGORY)
    const loading = ref(false)
    const apiError = ref('')

    const filteredItems = computed(() => {
        if (activeCategory.value === ALL_CATEGORY) return items.value
        return items.value.filter((item) => item.category === activeCategory.value)
    })

    const availableCount = computed(
        () => items.value.filter((item) => item.available).length,
    )

    const averagePrice = computed(() => {
        if (filteredItems.value.length === 0) return 0
        const sum = filteredItems.value.reduce((acc, item) => acc + item.price, 0)
        return sum / filteredItems.value.length
    })

    watch(
        () => items.value.length,
        (len) => {
            document.title = `Cardápio Digital (${len} itens)`
        },
        { immediate: true },
    )

    watch(
        items,
        (newItems) => {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems))
        },
        { deep: true },
    )

    function addItem(item) {
        items.value.push(item)
        notify(`"${item.name}" adicionado ao cardápio`, NOTIFY.SUCCESS)
    }

    function removeItem(id) {
        const removed = items.value.find((item) => item.id === id)
        items.value = items.value.filter((item) => item.id !== id)
        if (removed) {
            notify(`"${removed.name}" removido do cardápio`, NOTIFY.INFO)
        }
    }

    async function loadSuggestions() {
        loading.value = true
        apiError.value = ''
        try {
            const data = await fetchSuggestions()
            const existingIds = new Set(items.value.map((i) => i.id))
            const fresh = data.filter((d) => !existingIds.has(d.id))
            items.value.push(...fresh)
            notify(`${fresh.length} sugestão(ões) carregada(s) da API`, NOTIFY.INFO)
        } catch (err) {
            apiError.value = err.message
            notify(`Falha ao carregar sugestões: ${err.message}`, NOTIFY.ERROR)
        } finally {
            loading.value = false
        }
    }
</script>

<template>
    <div class="row g-4">
        <aside class="col-12 col-lg-4 col-xl-3">
            <MenuForm @add-item="addItem" />

            <div class="card mt-3">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center mb-3 gap-3">
                        <div>
                            <h2 class="pn-card-title">Sugestões via API</h2>
                            <p class="pn-card-sub">Endpoint /suggestions.json</p>
                        </div>
                        <span class="pn-tag">🌐</span>
                    </div>

                    <button
                        class="btn btn-outline-primary w-100"
                        :disabled="loading"
                        @click="loadSuggestions"
                    >
                        {{ loading ? 'Carregando...' : 'Carregar sugestões' }}
                    </button>

                    <div v-if="apiError" class="alert alert-danger mt-3 mb-0">
                        {{ apiError }}
                    </div>
                </div>
            </div>
        </aside>

        <section class="col-12 col-lg-8 col-xl-9">
            <MenuSummary
                :total-items="items.length"
                :available-items="availableCount"
                :average-price="averagePrice"
            />

            <CategoryFilter
                :active-category="activeCategory"
                @filter-change="activeCategory = $event"
            />

            <div v-if="filteredItems.length" class="row g-3">
                <div
                    v-for="item in filteredItems"
                    :key="item.id"
                    class="col-12 col-sm-6 col-md-4 col-xl-3"
                >
                    <MenuItem :item="item" @remove-item="removeItem" />
                </div>
            </div>

            <div v-else class="pn-empty">
                <div class="pn-empty-icon">🍕</div>
                <p class="mb-0">
                    Nenhum item encontrado. Cadastre um novo item ou carregue as sugestões.
                </p>
            </div>
        </section>
    </div>
</template>
