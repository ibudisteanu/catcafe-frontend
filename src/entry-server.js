import { createApp } from './app'

const isDev = process.env.NODE_ENV !== 'production'

// This exported function will be called by `bundleRenderer`.
// This is where we perform data-prefetching to determine the
// state of our application before actually rendering it.
// Since data fetching is async, this function is expected to
// return a Promise that resolves to the app instance.
export default context => {
  return new Promise(async (resolve, reject) => {
    const s = isDev && Date.now()
    const { app, router, store } = createApp('server');

    await store.dispatch('LOCALIZATION_NEW_IP', context.ip ); //Dispatching the Context IP


    let session = context.cookies ? context.cookies.session : '';
    if (session === '') session = undefined;
    if (typeof session === "string") session = JSON.parse(session);

    if (session) {

        store.commit('SET_AUTH_SESSION', session);

        try{
            await store.dispatch('AUTH_LOGIN_SESSION', session);
        }catch(err){
        }

    } else {
        store.commit('SET_AUTH_USER', null );
        store.commit('SET_AUTH_SESSION', '' );
    }

    const {selectedCountry, selectedCountryCode} = context.cookies || {};
    if (selectedCountry && selectedCountryCode){

        store.commit('SET_LOCALIZATION_SELECTED_COUNTRY', { selectedCountry, selectedCountryCode} );

    }else {

        await store.dispatch('LOCALIZATION_FETCH',);

    }


    const { url } = context;
    const fullPath = router.resolve(url).route.fullPath;

    if (fullPath !== url)
        reject({ url: fullPath })

    // set router's location
    router.push(url)



      // wait until router has resolved possible async hooks
    router.onReady(() => {
        const matchedComponents = router.getMatchedComponents()
        // no matched routes
        if (!matchedComponents.length) {
            reject({ code: 404 })
        }
        // Call fetchData hooks on components matched by the route.
        // A preFetch hook dispatches a store action and returns a Promise,
        // which is resolved when the action is complete and store state has been
        // updated.

        Promise.all(matchedComponents.map( it  => it.asyncData && it.asyncData({
            app,
            component: it,
            store,
            route: router.currentRoute
        }))).then(() => {
            isDev && console.log(`data pre-fetch: ${Date.now() - s}ms`)
            // After all preFetch hooks are resolved, our store is now
            // filled with the state needed to render the app.
            // Expose the state on the render context, and let the request handler
            // inline the state in the HTML response. This allows the client-side
            // store to pick-up the server-side state without having to duplicate
            // the initial data fetching on the client.

            //console.log("router.path router.path router.path router.path router.path ", router.currentRoute.path );

            context.state = store.state
            resolve(app)
        }).catch(reject)
    }, reject)


  })
}
