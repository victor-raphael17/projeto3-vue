<script setup>
    import { ref, computed } from 'vue'
    import InfoTab from '@/components/about/InfoTab.vue'
    import TechTab from '@/components/about/TechTab.vue'
    import ContactTab from '@/components/about/ContactTab.vue'

    const tabs = [
        { id: 'info', label: 'Sobre', component: InfoTab },
        { id: 'tech', label: 'Tecnologias', component: TechTab },
        { id: 'contact', label: 'Contato', component: ContactTab },
    ]

    const tabById = Object.fromEntries(tabs.map((t) => [t.id, t.component]))
    const currentTabId = ref('info')
    const currentComponent = computed(() => tabById[currentTabId.value] ?? InfoTab)
</script>

<template>
    <div class="card">
        <div class="card-body">
            <ul class="nav nav-tabs mb-3">
                <li v-for="tab in tabs" :key="tab.id" class="nav-item">
                    <button
                        type="button"
                        :class="['nav-link', { active: currentTabId === tab.id }]"
                        @click="currentTabId = tab.id"
                    >
                        {{ tab.label }}
                    </button>
                </li>
            </ul>

            <keep-alive>
                <component :is="currentComponent" />
            </keep-alive>
        </div>
    </div>
</template>
