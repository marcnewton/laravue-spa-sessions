import NotificationApp from './view';

export default {

    install: (Vue, options = {

        timeout: 5000,

    }) => {

        Vue.prototype.$notification = new Vue({

            data: () => ({

                que: []

            }),

            methods: {

                notify(message, color = 'info') {

                    let self = this;

                    let item = {

                        timer: setTimeout(function () {

                            let index = self.que.findIndex(seek => seek.message === message);

                            if (index > -1) self.$delete(self.que,index);

                        }, options.timeout),

                        message: message,

                        color: color
                    };

                    this.que.push(item);

                }

            }

        });

        // Global shorthand helpers

        window.notify = Vue.prototype.$notification.notify;

        // Vue template bind helpers

        Vue.notify = Vue.prototype.$notification.notify;
        Vue.prototype.$notify = Vue.prototype.$notification.notify;

        Vue.component('notification-app', NotificationApp);
    }

};
