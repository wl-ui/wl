/**
 * @auther weilan
 * @time 2020.03.09
 * @description: 一个数组操作函数库
 */

import Time from "./time"

/**
 * 从树形数据中递归筛选目标值
 * arr 数据源 
 * val 目标值
 * id 需要判断相等的字段
 * childs 子集
 */
function valInDeep(arr = [], val, id = "Id", childs = "Children") {
  return arr.reduce((flat, item) => {
    return flat.concat(
      item[id] == val ? item : valInDeep(item[childs] || [], val, id, childs)
    );
  }, []);
}

/**
 * 将树形数据向下递归为一维数组
 * @param {*} arr 数据源
 * @param {*} childs  子集key
 */
function flattenDeep(arr = [], childs = "Children") {
  return arr.reduce((flat, item) => {
    return flat.concat(
      item,
      item[childs] ? flattenDeep(item[childs], childs) : []
    );
  }, []);
}

/**
 * 将树形数据向上将此支线递归为一维数组
 * @param {*} arr 数据源
 * @param {*} parent 父级
 */
function flattenDeepParents(arr, parent) {
  return arr.reduce((flat, item) => {
    return flat.concat(
      item[parent] || [],
      item[parent] ? flattenDeepParents([item[parent]], parent) : []
    );
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
function arrayToTree(
  array = [],
  options = { id: "id", pid: "pid", children: "children", rootPidVal },
) {
  let array_ = []; // 创建储存剔除叶子节点后的骨架节点数组
  let unique = {}; // 创建盒子辅助本轮children合并去重
  let root_pid = options.rootPidVal || [
    0,
    "0",
    undefined,
    "undefined",
    null,
    "null",
    "00000000-0000-0000-0000-000000000000",
    ""
  ]; // 可能存在的根节点pid形式
  array.forEach(item => {
    // 筛选可以插入当前节点的所有子节点
    let children_array = array.filter(
      it => it[options.pid] === item[options.id]
    );
    if (Array.isArray(item[options.children]) && item[options.children].length) {
      // 去重合并数组
      item[options.children].map(i => (unique[i[options.id]] = 1));
      item[options.children].push(
        ...children_array.filter(i => unique[i[options.id]] !== 1)
      );
    } else {
      item[options.children] = children_array;
    }
    // 当children_array有数据时插入下一轮array_，当无数据时将最后留下来的根节点树形插入数组
    let has_children = children_array.length > 0;
    if (
      has_children ||
      (!has_children && root_pid.includes(item[options.pid]))
    ) {
      array_.push(item);
    }
  });
  // 当数组内仅有根节点时退出，否组继续处理 最终递归深度次
  if (!array_.every(item => root_pid.includes(item[options.pid]))) {
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
function patchTreeChain(
  data,
  sourceData,
  options = {
    Id: "Id",
    ParentId: "ParentId",
    Parents: "Parents",
    IdentityId: "IdentityId",
    root: "00000000-0000-0000-0000-000000000000"
  }
) {
  let _out_put_data = [], // 声明一个导出数据盒子
    _all_lack_data = []; // 声明一个全部需要补全的节点盒子
  data.forEach(i => {
    // 当一个节点在整个已选节点里找不到父节点时，并且此节点不是根节点时，从源数据中补全
    if (!data.find(t => t[options.Id] === i[options.ParentId]) &&
      i[options.ParentId] !== options.root
    ) {
      // 首先将记录在节点身上的父级树链拆分
      let _parents = i[options.Parents]
        .substring(1, i[options.Parents].length - 1)
        .split(",")
        .filter(item => !!item);
      // 然后查找父级树链中某一链条是否已在数据中存在，已存在的不需要补全，从树链中剔除
      let _lack_parents = _parents.filter(
        e => data.findIndex(m => m[options.IdentityId] == e) === -1
      );
      // 合并全部需要补全的数据
      _all_lack_data = _all_lack_data.concat(_lack_parents);
    }
  });
  // 去重后根据IdentityId在源数据中找到完整的节点数据并组装
  [...new Set(_all_lack_data)].forEach(item => {
    _out_put_data.push(sourceData.find(it => it[options.IdentityId] == item));
  });
  // 最后返回当前数据和需要补全父级树链的数据
  return _out_put_data.concat(data);
}

/**
 * 从坐标值拼接指定字段到祖先元素
 * @param {*} data 一维数据源
 * @param {*} coordinate 坐标值数据 
 * @param {*} options 配置项
 */
function splicParentsUntil(data, coordinate, options = {
  pathName: 'name', // 所要拼接字段
  pathConnector: '\\', // 连接符 
  pathId: "id", // 数据源匹配字段 
  pathParents: "parents",
  pathIdentityId: "identityId",
}) {
  let coordinate_item = data.find(i => i[options.pathId] === coordinate[options.pathId]);
  if (!coordinate_item) return '';
  if (!coordinate_item[options.pathParents]) return coordinate_item[options.pathName];
  let _parents = coordinate_item[options.pathParents]
    .substring(1, coordinate_item[options.pathParents].length - 1)
    .split(",")
    .filter(i => !!i);
  let splic_parents = '';
  _parents.forEach(i => {
    let _parent = data.find(t => t[options.pathIdentityId] == i);
    splic_parents += `${_parent[options.pathName]}${options.pathConnector}`
  })
  return splic_parents + coordinate_item[options.pathName];
}

/**
 * 根据数组2内的元素，通过match字段匹配数组1内的完整内容组成的数据
 * @param {*} array1 带有完整item对象的源数组列表
 * @param {*} array2 只带有match字段组成的简单数组
 * @param {*} match 用于匹配数组1和数组2的字段
 */
function intersectionBy(array1 = [], array2 = [], match = "Id") {
  if ([null, "null", undefined, "undefined"].includes(array2)) return;
  let data = [];
  array2.forEach(item => {
    let match_success = array1.find(it => it[match] === item);
    match_success && data.push(match_success);
  });
  return data;
}

/**
 * 深拷贝
 * @param {*} source 要拷贝的数据
 */
function deepClone(source) {
  if (!source && typeof source !== "object") {
    throw new Error("error arguments", "shallowClone");
  }
  const targetObj = source.constructor === Array ? [] : {};
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === "object") {
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
function getMax(arr = [], key = null, stamp = false) {
  let _o = !key ? arr : arr.map(i => i[key]);
  let _t = !stamp ? _o : _o.map(i => Time.init(i).valueOf());
  return Math.max(..._t);
}

/**
 * 筛选出数组中最小值
 * @param {*} arr 数据
 * @param {*} key 如果是复杂型数组，请指定字段key
 * @param {*} stamp 如果是时间格式，请设置以转化时间戳
 */
function getMin(arr = [], key = null, stamp = false) {
  let _o = !key ? arr : arr.map(i => i[key]);
  let _t = !stamp ? _o : _o.map(i => Time.init(i).valueOf());
  return Math.min(..._t);
}

/**
 * @name 数组去重
 * @param {Array} arr 原数组
 * @param {String} key 要比对的key，不传则认为是简单数组
 */
const unique = (arr, key) => {
  let hashList = [];
  key ? arr.forEach(i => {
    if (hashList.find(t => t[key] == i[key])) return;
    hashList.push(i)
  }) : arr.forEach(i => {
    if (hashList.includes(i)) return;
    hashList.push(i)
  })
  return hashList
}

/**
 * @name 数组查重
 * @param {Array} arr 原数组
 * @param {String} key 要比对的key，不传则认为是简单数组
 */
const depData = (arr, key) => {
  let hashList = [];
  const depData = arr.filter((i) => {
    const _item = key ? i[key] : i
    if (hashList.includes(_item)) return i;
    hashList.push(_item);
  });
  return depData
}

/**
 * @name 删除数据后自动定位
 * @param {Array} data 未删除前数据
 * @param {String} key 作为判断依据的数据key
 * @param {String|Number} delId 要删除数据的id
 * @param {String|Number} actId 当前选中的数据id
 * @param {Boolean} isTree 
 * @param {String} keyParent 
 */
const autoPositionAfterDelete = (data, key, delId, actId, isTree, keyParent) => {
  // 源数据校验
  if (!Array.isArray(data)) throw Error('data必须是一个数组');
  // 非树形结构
  // if (!isTree) {
  // 找到当前选中数据索引
  const activeIndex = data.findIndex(i => i[key] === actId);
  // 删后数据
  const nextData = data.filter(i => i[key] !== delId);
  // 删除的是非当前选中数据，或删后数组为空，无需重新定位
  if (delId !== actId || !nextData.length) return { nextItem: null, nextData }
  // 删除的是当前选中数据，自动定位前一个数据，第0时自动定位后一个数据
  const nextIndex = activeIndex !== 0 ? activeIndex - 1 : 0
  return { nextItem: nextData[nextIndex], nextData }
  // }
  // 树形结构
}

export {
  valInDeep, // 从树形数据中递归筛选目标值
  flattenDeep, // 将树形数据向下递归为一维数组
  flattenDeepParents, // 将树形数据向上将此支线递归为一维数组
  regDeepParents, // 根据条件递归祖先元素
  arrayToTree, // 将数组转化成树结构
  patchTreeChain, // 如果数据里缺少树枝节点，则根据parents和自增长id补全整条树链，输出数据调用上部arrToTree函数组装成完整的树
  splicParentsUntil, // 从坐标值拼接指定字段到祖先元素
  intersectionBy, // 根据数组2内的元素，通过match字段匹配数组1内的完整内容组成的数据
  deepClone, // 深拷贝
  getMax, // 筛选出数组中最大值
  getMin, // 筛选出数组中最小值
  unique, // 数组去重
  depData, // 获取数组重复数据
  autoPositionAfterDelete, // 数组删除数据后自动定位
};