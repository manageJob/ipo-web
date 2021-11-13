import { BreadcrumbPath } from "../models/breadcrumb.model";

export interface News {
  name: string
  detail: string
}

export interface LocationParam {
  id: string;
  breadcrumb: BreadcrumbPath
  isHistory: boolean
}

export interface Criteria {
  name?: string
  lastname?: string
}
