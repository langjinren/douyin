export function judgePlatform() {
  var ua = navigator.userAgent.toLowerCase();
  if (ua.indexOf("android") >= 0 && ua.indexOf("pumpkinfilm") >= 0) {
    return 1
  } else if ((ua.indexOf("iphone") >= 0 || ua.indexOf("ipad") >= 0) && ua.indexOf("pumpkinfilm") >= 0) {
    return 2
  } else if (ua.indexOf("windows") >= 0 && ua.indexOf("pumpkinfilm") >= 0) {
    return 3
  } else if (ua.indexOf("imac") >= 0 && ua.indexOf("pumpkinfilm") >= 0) {
    return 4
  }
}
export function setupWebViewJavascriptBridge(callback: any) {
  if (window.WebViewJavascriptBridge) {
    return callback(window.WebViewJavascriptBridge);
  }
  if (window.WVJBCallbacks) {
    return window.WVJBCallbacks.push(callback);
  }
  window.WVJBCallbacks = [callback];
  var WVJBIframe = document.createElement('iframe');
  WVJBIframe.style.display = 'none';
  WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
  document.documentElement.appendChild(WVJBIframe);
  setTimeout(function () {
    document.documentElement.removeChild(WVJBIframe)
  }, 0)
}

export function getUrlKey (name: any) {
  let LocString = String(window.document.location.href);
  let rs = new RegExp('(^|)' + name + '=([^&]*)(&|$)', 'gi').exec(LocString),
    tmp;
  if ((tmp = rs)) {
    return tmp[2];
  }
  return '';
}

export function isInstallOtherApp(package_name: string) {
  console.log('isInstallOtherApp', package_name)
  return new Promise(resolve => {
    if (judgePlatform() == 1) {
      return resolve(window.jsObj.isInstallOtherApp(package_name));
    } else if (judgePlatform() == 2) {
      setupWebViewJavascriptBridge(function (bridge: any) {
        bridge.callHandler(
          "isInstallOtherApp",
          {
            "scheme_str": package_name
          },
          function callback(response : string | number) {
            return resolve(response)
          }
        )
      });
    }
  })
}

export function jumpOtherApp(scheme: string) {
  console.log('jumpOtherApp', scheme)
  if (judgePlatform() == 1) {
    window.jsObj.jumpOtherApp(scheme);
  } else if (judgePlatform() == 2) {
    setupWebViewJavascriptBridge(function (bridge: any) {
      bridge.callHandler(
        "jumpOtherApp",
        {
          uri: scheme
        }
      )
    });
  }
}

export function getRefer(url: string, method: string) {
  var refer = {
    url: url,
    method: method
  }
  return new Promise(resolve => {
    if (judgePlatform() == 1) {
      return resolve(JSON.parse(window.jsObj.getRefer(JSON.stringify(refer))));
    } else if (judgePlatform() == 2) {
      setupWebViewJavascriptBridge(function (bridge: any) {
        bridge.callHandler(
          "getRefer",
          refer,
          function callback(response: object) {
            return resolve(response)
          }
        )
      });
    }
  })
}

export function getBeautifulSnowUser() {
  return new Promise( resolve => {
    if (judgePlatform() === 1) {
      if(window.jsObj !== undefined ) {
        return resolve(JSON.parse(window.jsObj.getBeautifulSnowUser()))
      }
    } else if (judgePlatform() === 2) {
      setupWebViewJavascriptBridge(function (bridge: any) {
        bridge.callHandler('getBeautifulSnowUser', function callback(response: object) {
         return resolve(response)
        })
      });
    }
  })
}