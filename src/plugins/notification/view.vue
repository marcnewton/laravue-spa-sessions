<template>

    <div id="app-notifications">

        <transition-group name="fade">
            <div v-for="(item,index) in $notification.que" :key="index" :class="item.color" @click="$delete($notification.que,index)">
                {{ item.message }}
            </div>
        </transition-group>

    </div>

</template>

<script>

    export default {

        name: 'notification-app'

    }

</script>

<style lang="scss">

    #app-notifications {

        display: flex;
        flex-direction: column;
        position: fixed;
        top: 0;
        right: 0;
        z-index: 999;

        width: 30em;
        font-size: 0.75rem;

        > span {

            display: flex;
            flex-direction: column;
            width:100%;

            > div {

                display: flex;
                padding: 7px 14px;
                margin: 7px 14px;
                box-shadow: 2px 3px #00000040;
                align-items: center;

                &.info {
                    background-color: var(--info);
                }

                &.primary {
                    background-color: var(--primary);
                }

                &.success {
                    background-color: var(--success);
                }

                &.warning {
                    background-color: var(--warning);
                }

                &.error {
                    background-color: var(--error);
                }

            }
        }

    }

</style>
