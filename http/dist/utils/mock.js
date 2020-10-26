"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.param2Obj = param2Obj;
exports.mockXHR = mockXHR;

var _mockjs = _interopRequireDefault(require("mockjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function param2Obj(url) {
  var search = url.split('?')[1];

  if (!search) {
    return {};
  }

  return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"').replace(/\+/g, ' ') + '"}');
}

function mockXHR() {
  var mocks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  // mock patch
  // https://github.com/nuysoft/Mock/issues/300
  _mockjs["default"].XHR.prototype.proxy_send = _mockjs["default"].XHR.prototype.send;

  _mockjs["default"].XHR.prototype.send = function () {
    if (this.custom.xhr) {
      this.custom.xhr.withCredentials = this.withCredentials || false;

      if (this.responseType) {
        this.custom.xhr.responseType = this.responseType;
      }
    }

    this.proxy_send.apply(this, arguments);
  };

  function XHR2ExpressReqWrap(respond) {
    return function (options) {
      var result = null;

      if (respond instanceof Function) {
        var body = options.body,
            type = options.type,
            url = options.url; // https://expressjs.com/en/4x/api.html#req

        result = respond({
          method: type,
          body: JSON.parse(body),
          query: param2Obj(url)
        });
      } else {
        result = respond;
      }

      return _mockjs["default"].mock(result);
    };
  }

  var _iterator = _createForOfIteratorHelper(mocks),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var i = _step.value;

      if (i.intercept) {
        var _iterator2 = _createForOfIteratorHelper(i.fetchs),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var fetch = _step2.value;

            _mockjs["default"].mock(new RegExp(fetch.url), fetch.type || 'get', XHR2ExpressReqWrap(fetch.response));
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
} // const responseFake = (url, type, respond) => {
//   return {
//     url: new RegExp(`/mock${url}`),
//     type: type || 'get',
//     response(req, res) {
//       res.json(Mock.mock(respond instanceof Function ? respond(req, res) : respond))
//     }
//   }
// }
// export default mocks.map(route => {
//   return responseFake(route.url, route.type, route.response)
// })