type BreakpointKeys =
    | "mobileLarge"
    | "phablet"
    | "phabletLarge"
    | "tabletPort"
    | "tabletLand"
    | "lap"
    | "desk"
    | "deskWide"
    | number;

type Breakpoints = { [key in BreakpointKeys]: string };

type BreakpointValues<T> = { [key in BreakpointKeys]?: T };

type BreakpointProp<T> = [T, BreakpointValues<T>] | T | BreakpointValues<T>;
