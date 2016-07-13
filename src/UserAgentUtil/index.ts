export default class UserAgentUtil {

  static isSafari(): boolean {
    return UserAgentUtil._isBrowser('safari', 'chrome');
  }

  private static _isBrowser(keyword: string, excludeKeyWord: string): boolean {
      return UserAgentUtil._userAgentHas(keyword) && !this._userAgentHas(excludeKeyWord);
  }

  private static _userAgentHas(keyword: string): boolean {
    return !!keyword && window.navigator.userAgent.toLowerCase().indexOf(keyword) > -1;
  }

}
