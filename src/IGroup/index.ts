import IOptions from '../IOptions';

interface IGroup {
  schema?: string;
  options?: IOptions;
  getElement?: Function;
}

export default IGroup;