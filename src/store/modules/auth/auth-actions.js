import NetworkHelper from "modules/network/network-helper"

export default {
    // ensure data for rendering given list type

    AUTH_LOGIN: async ({ commit, dispatch, state }, { userEmail, password, country, captcha } ) => {

        const out = await NetworkHelper.post('/auth/signin', {userEmail, password, country, captcha} );

        if (out && out.user) {
            commit('SET_AUTH_USER', out.user);
            commit('SET_AUTH_SESSION', out.session);
        }

        return out;
    },

    AUTH_SIGN_UP: ({ commit, dispatch, state }, { } ) => {

    },

    AUTH_LOGOUT: async ({ commit, dispatch, state },  ) => {

        const out = await NetworkHelper.get('/auth/logout',  );

        if ( out )
            return commit('SET_AUTH_SESSION', undefined );

    },

    AUTH_LOGIN_SESSION: async ({ commit, dispatch, state }, session ) => {

        const out = await NetworkHelper.post('/auth/signin-session', {key: session.key || state.session.key} );

        if (out){
            commit('SET_AUTH_USER', out.user);
            commit('SET_AUTH_SESSION', out.session);
        }

    },

}