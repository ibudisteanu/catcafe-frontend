<template>

    <div v-if="modalOpened">

        <div class="modal-background" @click="this.closeModal"> </div>

        <div class="modal show-modal" ref="refModal">
            <div class="modal-content">
                <icon icon="times-circle" class="close-button " @click="closeModal" />

                <template v-if="form" >
                    <component  :is="form" ref="refForm" />
                    <hr />
                </template>

                <slot class="noOverflow" name="content"/>
            </div>
        </div>

    </div>

</template>


<script>
import Icon from "client/components/UI/elements/icons/icon"

export default{

    components: {Icon},

    data: () => {
        return {
            modalOpened: false,
            form: null,
        }
    },

    props:{
        title: {default: 'Modal Title'},
    },

    methods:{

        closeModal(e){

            if( e) e.stopPropagation();
            this.form = null;

            this.modalOpened = false;

        },

        showModal(e, form){

            if (e) e.stopPropagation();

            this.form = form;
            this.modalOpened = true;
        },

    }

}

</script>


<style>
    .modal-background{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(26, 26, 26, 0.9);
        z-index: 10;
    }

    .modal {
        position:fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        opacity: 0;
        visibility: hidden;
        transition: visibility 0s linear 0.25s, opacity 0.25s 0s, transform 0.25s;
        z-index: 11;
    }

    .modal-content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 10px;
        padding: 10px 10px 0;
        background-color: #282121;
        border: solid 1px #532f2f;
        width: 100%;
    }

    .close-button {
        position: absolute;
        top: -20px;
        right: 0;
        text-align: center;
        cursor: pointer;
        color: white;
    }


    .close-button:hover {
        background-color: #4c4c4c;
    }

    .show-modal {
        opacity: 1;
        visibility: visible;
        transition: visibility 0s linear 0s, opacity 0.25s 0s, transform 0.25s;
        width: 80%;
        max-width: 600px;
    }

    .modal hr{
        border-top-color: #4b3f3f;
    }


    @media only screen and (max-width: 600px) {

        .modal-content {
            padding: 5px 5px 0;
        }

    }

</style>