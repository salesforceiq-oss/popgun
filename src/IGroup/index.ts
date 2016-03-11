import IOptions from '../IOptions';

interface IGroup {
  id?: string;
  schema?: string;
  options?: IOptions;
  getContentElement?: Function;
}

export default IGroup;