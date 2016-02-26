import IOptions from '../IOptions';
import Trigger from '../Trigger';

let defaultOptions: IOptions = {
    trigger: [new Trigger('hover')],
    content: '',
    placement: 'top',
    placementOffset: 8,
    optimizePlacement: true,
    transitionPlacement: true,
    alignment: '',
    alignmentOffset: 0,
    viewportPadding: 10,
    timeToHoverOnPop: 300,
    showDelay: 0,
    fadeDuration: 100
};

export default defaultOptions;