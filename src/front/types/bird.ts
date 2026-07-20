export interface Ave {
  id: number;
  name: string;
  sciName: string;
  status: string;
  region: string[]; 
  family: string;
  order: string;
  images: string[];
}

export interface NuthatchResponse {
  entities: Ave[];
}