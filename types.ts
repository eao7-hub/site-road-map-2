export interface Author {
  name: string;
  institution: string;
  email?: string;
  linkedin?: string;
}

export interface NavigationItem {
  label: string;
  href: string;
}

export interface GeoJsonFeature {
  type: string;
  properties: {
    name: string;
    id?: string;
    [key: string]: any;
  };
  geometry: any;
}

export interface GeoJsonData {
  type: string;
  features: GeoJsonFeature[];
}