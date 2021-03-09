"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.valInDeep = valInDeep;
exports.flattenDeep = flattenDeep;
exports.flattenDeepParents = flattenDeepParents;
exports.regDeepParents = regDeepParents;
exports.arrayToTree = arrayToTree;
exports.patchTreeChain = patchTreeChain;
exports.splicParentsUntil = splicParentsUntil;
exports.intersectionBy = intersectionBy;
exports.deepClone = deepClone;
exports.getMax = getMax;
exports.getMin = getMin;
exports.autoPositionAfterDelete = exports.depData = exports.unique = void 0;

var _time = _interopRequireDefault(require("./time"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * 从树形数据中递归筛选目标值
 * arr 数据源 
 * val 目标值
 * id 需要判断相等的字段
 * childs 子集
 */
function valInDeep() {
  var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var val = arguments.length > 1 ? arguments[1] : undefined;
  var id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "Id";
  var childs = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "Children";
  return arr.reduce(function (flat, item) {
    return flat.concat(item[id] == val ? item : valInDeep(item[childs] || [], val, id, childs));
  }, []);
}
/**
 * 将树形数据向下递归为一维数组
 * @param {*} arr 数据源
 * @param {*} childs  子集key
 */


function flattenDeep() {
  var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var childs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "Children";
  return arr.reduce(function (flat, item) {
    return flat.concat(item, item[childs] ? flattenDeep(item[childs], childs) : []);
  }, []);
}
/**
 * 将树形数据向上将此支线递归为一维数组
 * @param {*} arr 数据源
 * @param {*} parent 父级
 */


function flattenDeepParents(arr, parent) {
  return arr.reduce(function (flat, item) {
    return flat.concat(item[parent] || [], item[parent] ? flattenDeepParents([item[parent]], parent) : []);
  }, []);
}
/**
 * 根据条件递归祖先元素
 * @param {*} row 数据源
 * @param {*} parent 父级数据
 * @param {*} reg 回调
 */


function regDeepParents(row, parent, reg) {
  if (row[parent]) {
    reg && reg(row[parent]);
    regDeepParents(row[parent], parent, reg);
  }
}
/**
 * 将数组转化成树结构 array to tree
 * @param {*} array 数据源
 * @param {*} options 字段名配置项
 */


function arrayToTree() {
  var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    id: "id",
    pid: "pid",
    children: "children",
    rootPidVal: null
  };
  var array_ = []; // 创建储存剔除叶子节点后的骨架节点数组

  var unique = {}; // 创建盒子辅助本轮children合并去重

  var root_pid = options.rootPidVal || [0, "0", undefined, "undefined", null, "null", "00000000-0000-0000-0000-000000000000", ""]; // 可能存在的根节点pid形式

  array.forEach(function (item) {
    // 筛选可以插入当前节点的所有子节点
    var children_array = array.filter(function (it) {
      return it[options.pid] === item[options.id];
    });

    if (Array.isArray(item[options.children]) && item[options.children].length) {
      var _item$options$childre;

      // 去重合并数组
      item[options.children].map(function (i) {
        return unique[i[options.id]] = 1;
      });

      (_item$options$childre = item[options.children]).push.apply(_item$options$childre, _toConsumableArray(children_array.filter(function (i) {
        return unique[i[options.id]] !== 1;
      })));
    } else {
      item[options.children] = children_array;
    } // 当children_array有数据时插入下一轮array_，当无数据时将最后留下来的根节点树形插入数组


    var has_children = children_array.length > 0;

    if (has_children || !has_children && root_pid.includes(item[options.pid])) {
      array_.push(item);
    }
  }); // 当数组内仅有根节点时退出，否组继续处理 最终递归深度次

  if (!array_.every(function (item) {
    return root_pid.includes(item[options.pid]);
  })) {
    return arrayToTree(array_, options);
  } else {
    return array_;
  }
}
/**
 * 如果数据里缺少树枝节点，则根据parents和自增长id补全整条树链，输出数据调用上部arrToTree函数组装成完整的树
 * @param {Array} data 当前选中的某些数据 [一维数组]
 * @param {Array} sourceData 拥有完整数据的源数据 [一维数组]
 * @param {Object} options 配置参数，包括id，pid，树链parents，组成树链的自增长IdentityId, 根节点的默认pid为空的guid
 */


function patchTreeChain(data, sourceData) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    Id: "Id",
    ParentId: "ParentId",
    Parents: "Parents",
    IdentityId: "IdentityId",
    root: "00000000-0000-0000-0000-000000000000"
  };
  var _out_put_data = [],
      // 声明一个导出数据盒子
  _all_lack_data = []; // 声明一个全部需要补全的节点盒子

  data.forEach(function (i) {
    // 当一个节点在整个已选节点里找不到父节点时，并且此节点不是根节点时，从源数据中补全
    if (!data.find(function (t) {
      return t[options.Id] === i[options.ParentId];
    }) && i[options.ParentId] !== options.root) {
      // 首先将记录在节点身上的父级树链拆分
      var _parents = i[options.Parents].substring(1, i[options.Parents].length - 1).split(",").filter(function (item) {
        return !!item;
      }); // 然后查找父级树链中某一链条是否已在数据中存在，已存在的不需要补全，从树链中剔除


      var _lack_parents = _parents.filter(function (e) {
        return data.findIndex(function (m) {
          return m[options.IdentityId] == e;
        }) === -1;
      }); // 合并全部需要补全的数据


      _all_lack_data = _all_lack_data.concat(_lack_parents);
    }
  }); // 去重后根据IdentityId在源数据中找到完整的节点数据并组装

  _toConsumableArray(new Set(_all_lack_data)).forEach(function (item) {
    _out_put_data.push(sourceData.find(function (it) {
      return it[options.IdentityId] == item;
    }));
  }); // 最后返回当前数据和需要补全父级树链的数据


  return _out_put_data.concat(data);
}
/**
 * 从坐标值拼接指定字段到祖先元素
 * @param {*} data 一维数据源
 * @param {*} coordinate 坐标值数据 
 * @param {*} options 配置项
 */


function splicParentsUntil(data, coordinate) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    pathName: 'name',
    // 所要拼接字段
    pathConnector: '\\',
    // 连接符 
    pathId: "id",
    // 数据源匹配字段 
    pathParents: "parents",
    pathIdentityId: "identityId"
  };
  var coordinate_item = data.find(function (i) {
    return i[options.pathId] === coordinate[options.pathId];
  });
  if (!coordinate_item) return '';
  if (!coordinate_item[options.pathParents]) return coordinate_item[options.pathName];

  var _parents = coordinate_item[options.pathParents].substring(1, coordinate_item[options.pathParents].length - 1).split(",").filter(function (i) {
    return !!i;
  });

  var splic_parents = '';

  _parents.forEach(function (i) {
    var _parent = data.find(function (t) {
      return t[options.pathIdentityId] == i;
    });

    splic_parents += "".concat(_parent[options.pathName]).concat(options.pathConnector);
  });

  return splic_parents + coordinate_item[options.pathName];
}
/**
 * 根据数组2内的元素，通过match字段匹配数组1内的完整内容组成的数据
 * @param {*} array1 带有完整item对象的源数组列表
 * @param {*} array2 只带有match字段组成的简单数组
 * @param {*} match 用于匹配数组1和数组2的字段
 */


function intersectionBy() {
  var array1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var array2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var match = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "Id";
  if ([null, "null", undefined, "undefined"].includes(array2)) return;
  var data = [];
  array2.forEach(function (item) {
    var match_success = array1.find(function (it) {
      return it[match] === item;
    });
    match_success && data.push(match_success);
  });
  return data;
}
/**
 * 深拷贝
 * @param {*} source 要拷贝的数据
 */


function deepClone(source) {
  if (!source && _typeof(source) !== "object") {
    throw new Error("error arguments", "shallowClone");
  }

  var targetObj = source.constructor === Array ? [] : {};
  Object.keys(source).forEach(function (keys) {
    if (source[keys] && _typeof(source[keys]) === "object") {
      targetObj[keys] = source[keys].constructor === Array ? [] : {};
      targetObj[keys] = deepClone(source[keys]);
    } else {
      targetObj[keys] = source[keys];
    }
  });
  return targetObj;
}
/**
 * 筛选出数组中最大值
 * @param {*} arr 数据
 * @param {*} key 如果是复杂型数组，请指定字段key
 * @param {*} stamp 如果是时间格式，请设置以转化时间戳
 */


function getMax() {
  var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var stamp = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var _o = !key ? arr : arr.map(function (i) {
    return i[key];
  });

  var _t = !stamp ? _o : _o.map(function (i) {
    return _time["default"].init(i).valueOf();
  });

  return Math.max.apply(Math, _toConsumableArray(_t));
}
/**
 * 筛选出数组中最小值
 * @param {*} arr 数据
 * @param {*} key 如果是复杂型数组，请指定字段key
 * @param {*} stamp 如果是时间格式，请设置以转化时间戳
 */


function getMin() {
  var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var stamp = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var _o = !key ? arr : arr.map(function (i) {
    return i[key];
  });

  var _t = !stamp ? _o : _o.map(function (i) {
    return _time["default"].init(i).valueOf();
  });

  return Math.min.apply(Math, _toConsumableArray(_t));
}
/**
 * @name 数组去重
 * @param {Array} arr 原数组
 * @param {String} key 要比对的key，不传则认为是简单数组
 */


var unique = function unique(arr, key) {
  var hashList = [];
  key ? arr.forEach(function (i) {
    if (hashList.find(function (t) {
      return t[key] == i[key];
    })) return;
    hashList.push(i);
  }) : arr.forEach(function (i) {
    if (hashList.includes(i)) return;
    hashList.push(i);
  });
  return hashList;
};
/**
 * @name 数组查重
 * @param {Array} arr 原数组
 * @param {String} key 要比对的key，不传则认为是简单数组
 */


exports.unique = unique;

var depData = function depData(arr, key) {
  var hashList = [];
  var depData = arr.filter(function (i) {
    var _item = key ? i[key] : i;

    if (hashList.includes(_item)) return i;
    hashList.push(_item);
  });
  return depData;
};
/**
 * @name 删除数据后自动定位
 * @param {Array} data 未删除前数据
 * @param {String} key 作为判断依据的数据key
 * @param {String|Number} delId 要删除数据的id
 * @param {String|Number} actId 当前选中的数据id
 * @param {Boolean} isTree 
 * @param {String} keyParent 
 */


exports.depData = depData;

var autoPositionAfterDelete = function autoPositionAfterDelete(data, key, delId, actId, isTree, keyParent) {
  // 源数据校验
  if (!Array.isArray(data)) throw Error('data必须是一个数组'); // 非树形结构
  // if (!isTree) {
  // 找到当前选中数据索引

  var activeIndex = data.findIndex(function (i) {
    return i[key] === actId;
  }); // 删后数据

  var nextData = data.filter(function (i) {
    return i[key] !== delId;
  }); // 删除的是非当前选中数据，或删后数组为空，无需重新定位

  if (delId !== actId || !nextData.length) return {
    nextItem: null,
    nextData: nextData
  }; // 删除的是当前选中数据，自动定位前一个数据，第0时自动定位后一个数据

  var nextIndex = activeIndex !== 0 ? activeIndex - 1 : 0;
  return {
    nextItem: nextData[nextIndex],
    nextData: nextData
  }; // }
  // 树形结构
};

exports.autoPositionAfterDelete = autoPositionAfterDelete;