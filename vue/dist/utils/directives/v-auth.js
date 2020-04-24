"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  name: 'auth',
  rule: function rule(store) {
    return {
      // 指令已经添加到元素上，el-指令相关dom元素；binding-对象
      inserted: function inserted(el, binding) {
        var _store$getters;

        // 将权限码字段从binding中提取
        var _data = binding.value; // 将所有按钮权限码提取

        var _permissions = (store === null || store === void 0 ? void 0 : (_store$getters = store.getters) === null || _store$getters === void 0 ? void 0 : _store$getters.permissions) || [];

        if (!_data) throw new Error("The auth code is required\uFF0Ceg: v-auth=\"add\" || v-auth=\"['add', 'edit']\""); // 当前权限是一个集合时

        var _hasPermissions = Array.isArray(_data) ? _data.some(function (i) {
          return _permissions.includes(i);
        }) : _permissions.includes(_data);

        if (!_hasPermissions) {
          var _el$parentNode, _el$parentNode$remove;

          el === null || el === void 0 ? void 0 : (_el$parentNode = el.parentNode) === null || _el$parentNode === void 0 ? void 0 : (_el$parentNode$remove = _el$parentNode.removeChild) === null || _el$parentNode$remove === void 0 ? void 0 : _el$parentNode$remove.call(_el$parentNode, el);
        }
      }
    };
  }
};
exports["default"] = _default;