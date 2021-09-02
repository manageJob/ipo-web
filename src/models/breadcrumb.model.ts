export interface Breadcrumb {
  name?: string
  path?: string
  icon?: string
}

export interface BreadcrumbPath {
  id?: number
  previousName: string
  previousPath: string
  icon?: string
}
