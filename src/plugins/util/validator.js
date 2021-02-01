const Validator = {
    install(Vue) {
        Vue.prototype.$validator = {
            id: function(id) {
                var re = /^[0-9a-z].{4,20}$/
                return re.test(id)
            },
            name: function(name) {
                var re =  /^[가-힣].{1,20}$/
                return re.test(name)
            },
            password: function(password) {
                var re = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{4,20}$/
                return re.test(password)
            }
        }
    }
};

export default Validator;