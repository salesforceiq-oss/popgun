import IOptions from '../IOptions';
import Trigger from '../Trigger';

let defaultOptions: IOptions = {
    trigger: [new Trigger('hover')],
    html: '',
    text: '',
    placement: 'top',
    placementOffset: 8,
    optimizePlacement: true,
    transitionPlacement: true,
    alignment: '',
    alignmentOffset: 0,
    viewportPadding: 10,
    timeToHoverOnPop: 300,
    showDelay: 0,
    fadeDuration: 100,
    cushion: 8,
    containerCushion: 10,
    disableClickOff: false,
    tipClass: '',
    darkStyle: false,
    disable: false,
    reusePopover: true
};

export default defaultOptions;
