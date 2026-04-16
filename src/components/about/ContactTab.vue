<script setup>
    import { ref, inject } from 'vue'
    import { NOTIFY } from '@/constants'

    const notify = inject('notify')
    const email = ref('')
    const message = ref('')

    function send() {
        if (!email.value || !message.value) {
            notify('Preencha email e mensagem', NOTIFY.ERROR)
            return
        }
        notify(`Mensagem enviada para ${email.value}`, NOTIFY.SUCCESS)
        email.value = ''
        message.value = ''
    }
</script>

<template>
    <div>
        <h3 class="pn-card-title fs-5 mb-3">Fale Conosco</h3>
        <form @submit.prevent="send">
            <div class="mb-3">
                <label class="pn-label">Email</label>
                <input
                    v-model.trim="email"
                    type="email"
                    class="form-control"
                    placeholder="voce@email.com"
                />
            </div>
            <div class="mb-3">
                <label class="pn-label">Mensagem</label>
                <textarea
                    v-model.trim="message"
                    class="form-control"
                    rows="4"
                    placeholder="Escreva sua mensagem..."
                ></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Enviar mensagem</button>
        </form>
    </div>
</template>
