export interface Author {
  name: string;
  institution: string;
  email?: string;
  linkedin?: string;
  image?: string; // Mantendo opcional caso queira usar no futuro
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
    sigla?: string;
    [key: string]: any;
  };
  geometry: any;
}

export interface GeoJsonData {
  type: string;
  features: GeoJsonFeature[];
}