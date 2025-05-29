export interface Barangay {
  brgy_code: string;
  brgy_name: string;
  city_code: string;
  province_code: string;
  region_code: string;
}

export interface Province {
  province_code: string;
  province_name: string;
  psgc_code: string;
  region_code: string;
}

export interface City {
  city_code: string;
  city_name: string;
  province_code: string;
  psgc_code: string;
  region_desc: string; // If this should be region_code, update the key in the data or interface
}

export interface Region {
  id: number;
  psgc_code: string;
  region_name: string;
  region_code: string;
}
