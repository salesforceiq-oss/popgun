export default class EnumUtil {
  static getNames(e: any): Array<any> {
    return Object.keys(e).filter((v: any) => isNaN(parseInt(v, 10)));
  }

  static getValues(e: any): Array<any> {
    return Object.keys(e).map((v: any) => parseInt(v, 10)).filter((v: any) => !isNaN(v));
  }

  static getNamesAndValues(e: any): Array<any> {
    return EnumUtil.getValues(e).map((v: any) => { return { name: e[v] as string, value: v }; });
  }
}