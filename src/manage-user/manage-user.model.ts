import { BreadcrumbPath } from "../models/breadcrumb.model";

export interface User {
  // name: string
  // lastname: string
  username: string
  // password?: string
  // telephoneNumber: string
  // bankName: string
  // bankNumber: string
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
