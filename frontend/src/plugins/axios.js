"use strict";

import Vue from "vue";
import axios from "axios";
var qs = require('qs');


axios.defaults.headers.common["Content-Type"] = "application/json";

let config = {
  baseURL: `https://pokeapi.co/api/v2/`,
  paramsSerializer: function (params) {
    return qs.stringify(params, {arrayFormat: 'brackets'})
  }
};

const _axios = axios.create(config);


_axios.interceptors.request.use(
  function(config) {
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

Plugin.install = function(Vue) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    }
  });
};

Vue.use(Plugin);
export default Plugin;