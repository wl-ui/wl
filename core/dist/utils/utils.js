"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.download = download;

/**
 * @author weilan
 * @time 2020.07.01
 * @description 通用工具函数
 */

/**
* @name处理下载接口返回的文件流数据
* @param {*} res http请求返回数据
*/
function download(res) {
  // 错误处理
  if (res.data.type == "application/json") {
    var reader = new FileReader();
    reader.readAsText(res.data, 'utf-8');

    reader.onload = function () {
      var json_data = JSON.parse(reader.result);
      throw Error(json_data.Message);
    };

    return;
  } // 下载处理


  var filename = "content-disposition" in res.headers ? decodeURIComponent(res.headers["content-disposition"].split(";")[1].split("=")[1].replace(/"/g, "")) : "下载文件";

  try {
    if (window.navigator.msSaveOrOpenBlob) {
      navigator.msSaveBlob(res.data, filename);
    } else {
      var blob = new Blob([res.data], {
        type: "application/vnd.ms-excel"
      });
      var url = URL.createObjectURL(blob);
      var link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      URL.revokeObjectURL(url); // 释放URL 对象

      document.body.removeChild(link);
    }
  } catch (err) {
    throw Error(err);
  }
}