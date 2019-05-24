declare module "body-scroll-lock" {
    export function disableBodyScroll(element?: Element): void;
    export function enableBodyScroll(element?: Element): void;
    export function clearAllBodyScrollLocks(): void;
}
