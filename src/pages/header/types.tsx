export type hrefTarget = "_blank" | "_parent" | "_self" | "_top";

export interface NavItemType {
  label: string;
  href?: string;
  isRouterLink?: boolean;
  rel?: string;
  target?: hrefTarget;
  children?: NavItemType[];
  formCode?: string;
  icon?: any;
  iconPosition?: "before" | "after";
}

export interface NavBarType {
  config: {
    rel: string;
    target: hrefTarget;
  };
  navItems: NavItemType[];
}
