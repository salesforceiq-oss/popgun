import IOptions from '../IOptions';

interface IGroup {
  schema?: string;
  options?: IOptions;
  getContentElement?: Function;
}

export default IGroup;