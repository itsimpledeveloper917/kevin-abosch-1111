import { notification, message } from "antd";

const get_arweave_option = () => {
// const protocol = process.env.REACT_APP_PROTOCOL
// const protocol = process.env.REACT_APP_PROTOCOL

  let ar_option = {
    host: 'arweave.net',// Hostname or IP address for a Arweave host
    port: 443,          // Port
    protocol: 'https',  // Network protocol http or https
    timeout: 20000,     // Network request timeouts in milliseconds
    logging: false,     // Enable network request logging
  }

  // if(protocol !== 'HTTPS') {
  //   ar_option = {}
  // }

 // if(protocol !== 'HTTPS') {
 //   ar_option = {}
 // }

  return ar_option
}
const show_notification = (msg, title = 'KOI', type = 'error', actionClose = () => {}) => {
  // type : success || error || info || warning
  let custom_class = 'custom-notification-' + type
  notification.open({
    placement: 'topRight',
    top: 90,
    duration: 4,
    message: title,
    className: custom_class,
    description: msg,
    onClick: () => {
      console.log("Notification Clicked!");
    },
    onClose: actionClose
  });
}

const show_message = (msg, type = 'error', actionClose = () => {}) => {
  // type : success || error || info || warning
  let custom_class = 'custom-message-' + type
  message.error({
    top: 90,
    duration: 3,
    content: msg,
    className: custom_class,
    onClose: actionClose
  });
}

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

const show_fixed_number = (val, fixed = 0) => {
  return val.toFixed(fixed)
}

const show_digit_number = (val, digit = 0) => {
  if(typeof val !== 'number'){
    return ''
  }
  if(val) {
    return val.toLocaleString('en-US')
  }
  else
    return 0
}

const show_ar_balance = (val) => {
  if(typeof val !== 'number'){
    return ''
  }
  if(val) {
    let bigger = parseInt(Math.floor(val))
    let lower = val % 1
    return bigger.toLocaleString('en-US') + "." + lower.toFixed(4) * 10000
  }
  else
    return 0
}

const convertArBalance = (str_number) => {
  let balance = Number(str_number)
  return balance / 1000000000000

}

const validEmail = (str) => {
  if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(str)) { 
    return true
  }else{
    return false
  }
}


const wait = async (ms) => {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

const getMediaType = (fileType) => {
  let mediaType = ''
  if(fileType){
    if(fileType.includes('image/')) {
      mediaType = 'image'
    }else if(fileType.includes('video/')){
      mediaType = 'video'
    }else if(fileType.includes('audio/')){
      mediaType = 'audio'
    }
  }
  return mediaType
}

const mediaExists = (media_url) => {
  var http = new XMLHttpRequest();

  http.open('HEAD', media_url, false);
  http.send();
  return http.status !== 404;

}

const showShortString = (content, str_length) => {
  let new_content_name = content
  if(content.length > str_length) new_content_name = new_content_name.substr(0, str_length) + '...'
  return new_content_name
}

export {
  get_arweave_option,
  show_notification,
  show_message,
  show_digit_number,
  show_fixed_number,
  show_ar_balance,
  getBase64,
  convertArBalance,
  validEmail,
  wait,
  getMediaType,
  mediaExists,
  showShortString,
}