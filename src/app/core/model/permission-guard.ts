export interface PermissionGuard {
    Only?: Array<string>,
    Except?: Array<string>,
    RedirectTo?: string | Function
}