import Vue from "vue";

export default {


    SET_TOPIC:  (state, topic ) => {
        state.topic = topic;
        return topic;
    },

    SET_TOPICS:  (state, topics ) => {

        state.map = {};

        for (const topic of topics)
            Vue.set( state.map, topic.slug, topic);

    },

    ADD_TOPICS: (state, topics)=>{

        for (const topic of topics)
            if ( !state.map[topic.slug] )
                Vue.set( state.map, topic.slug, topic);

    },


    SET_TOPICS_DELETE: ( state, ids ) => {

        ids.map(it => Vue.delete( state.map, it ));

    }


}