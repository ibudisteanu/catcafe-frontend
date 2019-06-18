import NetworkHelper from "modules/network/network-helper"
import CookiesService from "src/services/cookies/cookies.service"

export default {
    // ensure data for rendering given list type

    LOCALIZATION_STORE_SELECTED: ({ commit, dispatch, state }, {selectedCountry, selectedCountryCode} ) => {

        commit('SET_LOCALIZATION_SELECTED_COUNTRY', {selectedCountry, selectedCountryCode});

        CookiesService.setCookie('selectedCountry', selectedCountry);
        CookiesService.setCookie('selectedCountryCode', selectedCountryCode);

    },

    LOCALIZATION_NEW_IP: ({ commit, dispatch, state }, ip ) => {

        return commit("SET_LOCALIZATION_IP", ip);

    },

    LOCALIZATION_FETCH: async ({ commit, dispatch, state }, ip ) => {

        if ( state.request.done && !state.request.error )
            return;

        if (!ip) ip = state.ip;

        ip = ip.replace("::ffff:", '');
        ip = ip.replace('127.0.0.1','');

        try {

            let res = await NetworkHelper.get("https://geoip-db.com/json/" + ip, undefined, '');

            const payload = {
                country: res.country_name || '',
                countryCode: res.country_code || '',
                city: res.city || '',
                latitude: res.latitude || '',
                longitude: res.longitude || '',
                clientIP: res.ip || '',
                timeZone: res.time_zone || '',
                request: {
                    sent: true,
                    done: true,
                    error: false,
                },
            };

            commit('SET_LOCALIZATION_DATA', payload );

            if (!state.selectedCountryCode)
                commit('SET_LOCALIZATION_SELECTED_COUNTRY', { selectedCountryCode: payload.countryCode, selectedCountry:payload.country } );

        }
        catch(Exception){

            console.log("Geo IP rejected ",Exception.toString());

            commit('SET_LOCALIZATION_REQUEST_ERROR',{});

            if (!state.selectedCountryCode)
                commit('SET_LOCALIZATION_SELECTED_COUNTRY', { selectedCountryCode: 'us', selectedCountry: 'United States' } );

        }

    },

}