<script setup>
    import { onMounted, onUnmounted } from 'vue'
    import { NOTIFY } from '@/constants'

    const props = defineProps({
        message: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            default: NOTIFY.SUCCESS,
            validator: (val) => Object.values(NOTIFY).includes(val),
        },
        duration: {
            type: Number,
            default: 3000,
        },
    })

    const emit = defineEmits(['dismiss'])

    let timerId = null

    onMounted(() => {
        timerId = setTimeout(() => emit('dismiss'), props.duration)
    })

    onUnmounted(() => {
        clearTimeout(timerId)
    })
</script>

<template>
    <div :class="['pn-toast', type]" role="alert">
        <span class="pn-toast-icon">
            {{ type === NOTIFY.SUCCESS ? '✓' : type === NOTIFY.ERROR ? '!' : 'ⓘ' }}
        </span>
        <span>{{ message }}</span>
        <button type="button" class="pn-toast-close" @click="emit('dismiss')">×</button>
    </div>
</template>

<style scoped>
    .pn-toast-icon {
        width: 22px;
        height: 22px;
        border-radius: 50%;
        display: grid;
        place-items: center;
        font-weight: 700;
        font-size: 12px;
        color: var(--pn-orange);
        background: var(--pn-orange-soft);
        flex-shrink: 0;
    }

    .pn-toast.success .pn-toast-icon {
        color: var(--pn-green);
        background: var(--pn-green-soft);
    }

    .pn-toast.error .pn-toast-icon {
        color: var(--pn-red);
        background: var(--pn-red-soft);
    }

    .pn-toast.info .pn-toast-icon {
        color: var(--pn-blue);
        background: var(--pn-blue-soft);
    }
</style>
