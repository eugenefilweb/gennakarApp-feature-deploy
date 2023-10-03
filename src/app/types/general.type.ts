export type Coordinate = {
  timestamp: number;
  lat: number;
  lon: number;
};

export type Photo = {
  base64string: string;
  category: string;
  filepath: string;
  id: number;
  webviewPath: string;
};

export type Photos = {
  id: number;
  filepath: string;
  webviewPath: string;
  base64string: string;
}

export type FormPhoto = {
  base64string: string;
  category: string;
  filepath: string;
  id: number;
  webviewPath: string;
};

export type FloraPhoto = {
  base64string: string;
  category: string;
  filepath: string;
  id: number;
  webviewPath: string;
};

export type FaunaPhoto = {
  base64string: string;
  category: string;
  filepath: string;
  id: number;
  webviewPath: string;
};


export type incidentPhoto = {
  base64string: string;
  filepath: string;
  id: number;
  category: string;
  webviewPath: string;
};


export type Form = {
  appId: number | string;
  common_name: string;
  date_encoded: string;
  description: string;
  barangay: string;
  sitio: string;
  latitude: number;
  longitude: number;
  photos: FormPhoto[];
  category_id: number;
  category_name: string;
};


export type CurrentPatrol = {
  status: boolean;
  timestamp: number;
  lastTimestamp: number;
  watershed: string;
  notes: string;
  distance: number;
  floras: Flora[];
  faunas: Fauna[];
  coordinates: Coordinate[];
  syncStatus: string;
  barangay: string;
  sitio: string;
  totalTime: number;
};

export type Patrol = {
  status: boolean;
  timestamp: number;
  lastTimestamp: number;
  watershed: string;
  notes: string;
  distance: number;
  barangay: string;
  sitio: string;
  floras: Flora[];
  faunas: Fauna[];
  coordinates: Coordinate[];
  syncStatus: string;
};

export type EnvironmentalIncident = {
  // key: number;
  date_time: string
  longitude: string;
  latitude: string;
  watershed: string;
  incident: number;
  incident_type: number;
  description: string;
  additional_details: string;
  photos: any;
  barangay: string;
  sitio: string;
};

export type Flora = {
  appId: number | string;
  common_name: string;
  date_encoded: string;
  description: string;
  barangay: string;
  sitio: string;
  latitude: number;
  longitude: number;
  photos: FloraPhoto[];
  category_id: number;
  category_name: string;
};


export type Fauna = {
  appId: number | string;
  common_name: string;
  date_encoded: string;
  description: string;
  barangay: string;
  sitio: string;
  latitude: number;
  longitude: number;
  photos: FaunaPhoto[];
  category_id: number;
};

export type Network = {
  connected: boolean;
  connectionType: string;
};

export type LoginCredential = {
  username: string;
  password: string;
};

export type BackgroundPositionGeolocation = {
  accuracy: number;
  altitude: number;
  altitudeAccuracy: number;
  bearing: number;
  latitude: number;
  longitude: number;
  simulated: boolean;
  speed: number;
  time: number;
};

export type LonLat = {
  latitude: number;
  longitude: number;
};
