export interface Ave {
  id: number;
  name: string;
  sciName: string;
  status: string;
  region: string[];
  family: string;
  order: string;
  images: string[];
  recordings?: Recording[];
  lengthMin?: string;
  lengthMax?: string;
}

export interface Recording {
  file: string;
  type: string;
  loc: string;
  rec: string;
}

export interface NuthatchResponse {
  entities: Ave[];
}