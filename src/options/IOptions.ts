interface IOptions {
    trigger?: Trigger[];
    content?: string;
    placement?: string;
    placementOffset?: number;
    optimizePlacement?: boolean;
    transitionPlacement?: boolean;
    alignment?: string;
    alignmentOffset?: number;
    viewportPadding?: number;
    timeToHoverOnPop?: number;
    showDelay?: number;
    fadeDuration?: number;
}

export default IOptions;