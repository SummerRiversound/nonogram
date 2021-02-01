import { store as $store } from '@/plugins/store'
import * as $http from 'axios'

export const Toast = {
    install(Vue) {
        let payload = function(msg, color, type) {
            return {message:msg, color:color, type:type};
        }
        Vue.prototype.$toast = {
            success(msg) {
                $store.dispatch("setToast", payload(msg, "success","success"));
            },
            warning(msg) {
                $store.dispatch("setToast", payload(msg, "warning","warning"));
            },
            error(msg) {
                $store.dispatch("setToast", payload(msg, "error","error"));
            },
            info(msg) {
                $store.dispatch("setToast", payload(msg, "info","info"));
            },
            loading(msg) {
                $store.dispatch("setToast", payload(msg, "dark","loading"));
            },
            default(msg) {
                $store.dispatch("setToast", payload(msg, "dark","default"));
            },
            remove(){
                $store.dispatch("removeToast")
            }
        }
    }
};

export const Loading = {
    install(Vue) {
        Vue.prototype.$loading = function(loading) {
            $store.dispatch("setLoading", loading)
        }
    }
}

export const Copy = {
    install(Vue) {
        Vue.prototype.$copy = function(obj) {
            return JSON.parse(JSON.stringify(obj));
        }
    }
}

export const Download = {
    install(Vue) {
        Vue.prototype.$download = async function(url, params, filename) {
            return await $http({
                url: url,
                method: 'GET',
                params: params,
                responseType: 'blob'
            }).then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', filename || this.$moment().format("YYYY_MM_DD_hh_mm_ss")); //or any other extension
                document.body.appendChild(link);
                link.click();
            })
        }
    }
}

export const numArray = {
    install(Vue) {
        Vue.prototype.$numArray = function(len) {
            return Array.apply(null, { length: len }).map(Number.call, Number)
        }
    }
}

export const checkDevice = {
    install(Vue){
        Vue.prototype.$checkDevice = {
            byOS (){
                return !('win16|win32|win64|windows|mac|macintel|linux|freebsd|openbsd|sunos'.indexOf(navigator.platform.toLowerCase()) >= 0 );
            },
            byMaker(){
                return navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i) ? true : false;
            },
            byTouchInterface(){
                return (navigator.maxTouchPoints || 'ontouchstart' in document.documentElement);
            }
        }
    }
}