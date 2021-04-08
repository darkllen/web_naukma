import Vue from "vue";


Vue.component('book', {
    // camelCase в JavaScript
    props: ['seen', 'short_info', 'full_info', 'title', 'details_button'],
    template : '\
    <div class="card w-75 text-white bg-dark mb-3">\
        <div class="card-body">\
            <h5 class="card-title">{{title}}</h5>\
            <short :short_info=short_info>assa</short>\
            <long :full_info=full_info v-if="seen==1"></long>\
        </div>\
        <button class="card-footer btn btn-primary w-100" v-on:click="seen*=-1">{{details_button}}</button>\
    </div>'
  })


Vue.component('short', {
    props: ['short_info'],
    template : '<h6 class="card-subtitle mb-2 text-muted"> {{short_info}} </h6>'
  })


Vue.component('long', {
    props: ['full_info'],
    template : '<p class="card-text">{{full_info}} </p>'
  })

  var app = new Vue({
    el: '#book',
    data: {}
  })


