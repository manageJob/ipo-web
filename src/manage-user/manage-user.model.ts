import { BreadcrumbPath } from "../models/breadcrumb.model";

export interface User {
  username: string
  roleId: string;
}

export interface LocationParam {
  id: string;
  breadcrumb: BreadcrumbPath;
  isHistory: boolean;
}

export interface Criteria {
  name?: string
  lastname?: string
}
