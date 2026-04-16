export default {
    namespaced: true,
    state: () => ({
        user: null,
    }),
    mutations: {
        SET_USER(state, user) {
            state.user = user
        },
        HYDRATE(state, payload) {
            if (payload?.user) state.user = payload.user
        },
    },
    actions: {
        login({ commit }, { username }) {
            commit('SET_USER', {
                username,
                loggedAt: new Date().toISOString(),
            })
        },
        logout({ commit }) {
            commit('SET_USER', null)
        },
    },
    getters: {
        isAuthenticated: (state) => state.user !== null,
        username: (state) => state.user?.username || '',
    },
}
