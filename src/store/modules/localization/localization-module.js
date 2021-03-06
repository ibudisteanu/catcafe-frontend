import Vuex from 'vuex'

import actions from './localization-actions'
import mutations from './localization-mutations'

export default {
    state:  {

        selectedCountryCode: '',
        selectedCountry: '',

        country: '',
        countryCode: '',
        city: '',
        latitude: '',
        longitude: '',
        ip: '',
        timeZone: '',

        clientIP: '',

        request: {
            sent: false,
            done: false,
            error: false,
        },

        countriesAllowed: ['ro', 'us', 'md'],

    },
    actions,
    mutations,
}