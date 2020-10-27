export type hrefTarget = "_blank" | "_parent" | "_self" | "_top";

export interface NavItemType {
  label: string;
  href?: string;
  isRouterLink?: boolean;
  rel?: string;
  target?: hrefTarget;
  children?: NavItemType[];
}

export interface NavBarType {
  config: {
    rel: string;
    target: hrefTarget;
    open: "onMouseEnter" | "onClick";
  };
  navItems: NavItemType[];
}
