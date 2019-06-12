// src/main.js
import Vue from 'vue';
// import Vue from 'vue/dist/vue.esm.js'  // 解决You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build


// console.log('hello world');

const say = function () {
  return new Promise((resolve, reject) => {
    resolve('I am es7');
  })
}


var app = new Vue({
  el: '#app',
  data: {
    mess: 'Hello Vue@2.0!'
  },
  methods: {
    /*updateData() {
      say().then((res)=>{
        this.mess = res;
      });
    },*/
    async updateData() {
      const mess = await say();
      this.mess = mess;
    }
  },
  created() {
    this.updateData();
  }
})
