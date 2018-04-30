/**
 * Used in routing to restrict access to a lazily loaded module
 */
export interface PermissionGuard {
    Role?: string,
    Only?: Array<string>,
    Except?: Array<string>,
    RedirectTo?: string | Function
}