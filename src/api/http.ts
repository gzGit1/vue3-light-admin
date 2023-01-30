import request from '@/utils/request'

export function getDataInfo(url, data?) {
  return request({
    url: window.serviceConfig.system + url,
    method: 'get',
    params: data
  })
}

export function postDataInfo(url, data?, isFormData?:boolean) {
  return request({
    url: window.serviceConfig.system + url,
    method: 'post',
    data,
    headers: isFormData ? {
      "Content-Type": "application/x-www-form-urlencoded"
    } : {}
  })
}

export function putDataInfo(url, data) {
  return request({
    url: window.serviceConfig.system + url,
    method: 'put',
    data
  })
}

export function deleteInfo(url, data) {
  return request({
    url: window.serviceConfig.system + url,
    method: 'delete',
    data
  })
}

//上传文件
export function uploadFile(url, data, config = {}) {
  return request({
    url: window.serviceConfig.system + url,
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    ...config
  })
}

// 数据导出
export async function exportExcel(url, data) {
  let results = request({
    url: window.serviceConfig.system + url,
    method: 'post',
    responseType: 'blob',
    params: data
  });
  return results;
}
