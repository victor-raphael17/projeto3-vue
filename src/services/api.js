import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.BASE_URL,
    timeout: 8000,
    headers: { Accept: 'application/json' },
})

api.interceptors.response.use(
    (res) => res,
    (err) => {
        const status = err.response?.status
        const base =
            err.response?.data?.message ||
            err.message ||
            'Erro desconhecido na requisição'
        const message = status ? `[${status}] ${base}` : base
        return Promise.reject(new Error(message))
    },
)

export async function fetchSuggestions() {
    const { data } = await api.get('suggestions.json')
    if (!Array.isArray(data)) {
        throw new Error('Resposta inválida: esperado um array de itens')
    }
    return data
}
