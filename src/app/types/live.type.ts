import { Coordinate } from './general.type';
import {
  Barangay,
  Island,
  Municipality,
  Province,
  Region,
} from './location.type';

export type LiveFlora = {
  photos: {
    fullheight: string[],
    immediate_vicinity: string[],
    leaves: string[],
    fruit: string[],
    trunk: string[],
    roots: string[],
    west_left: string[],
    east_right: string[],
  },
  id: number,
  app_id: number,
  common_name: string,
  description: string,
  kingdom: string,
  family: string,
  genus: string,
  species: string,
  sub_species: string,
  varieta_and_infra_var_name: string,
  taxonomic_group: string,
  date_encoded: string,
  record_status: number,
  created_by: number,
  updated_by: number,
  created_at: string,
  updated_at: string,
  latitude: number,
  longitude: number,
  status: number,
  validated_by_id: number,
  notes: string,
  patrol_id: number,
  patroller_id: number,
  ago: string,
  tablePhotoUrl: string,
  largePhotoUrl: string,
  photoUrls: {
    fullheight: string[],
    immediate_vicinity: string[],
    leaves: string[],
    fruit: string[],
    trunk: string[],
    roots: string[],
    west_left: string[],
    east_right: string[],
  },
};

export type LiveFauna = {
  photos: {
    fullheight: string[],
    immediate_vicinity: string[],
    leaves: string[],
    fruit: string[],
    trunk: string[],
    roots: string[],
    west_left: string[],
    east_right: string[],
  },
  id: number,
  app_id: number,
  common_name: string,
  description: string,
  kingdom: string,
  family: string,
  genus: string,
  species: string,
  sub_species: string,
  varieta_and_infra_var_name: string,
  taxonomic_group: string,
  date_encoded: string,
  record_status: number,
  created_by: number,
  updated_by: number,
  created_at: string,
  updated_at: string,
  latitude: number,
  longitude: number,
  status: number,
  validated_by_id: number,
  notes: string,
  patrol_id: number,
  patroller_id: number,
  ago: string,
  tablePhotoUrl: string,
  largePhotoUrl: string,
  photoUrls: {
    fullheight: string[],
    immediate_vicinity: string[],
    leaves: string[],
    fruit: string[],
    trunk: string[],
    roots: string[],
    west_left: string[],
    east_right: string[],
  },
};

export type LivePatrol = {
  coordinates: Coordinate[],
  id: number,
  user_id: number,
  watershed: string,
  date: string,
  notes: string,
  distance: number,
  total_time: number,
  status: number,
  record_status: number,
  created_by: number,
  updated_by: number,
  created_at: string,
  updated_at: string,
  totalFauna: number,
  totalTrees: number,
  createdAt: string,
  statusLabel: string,
  travelHours: string,
  tripId: string,
  totalDistance: string,
  totalCoordinates: number,
  floras: LiveFlora[],
  faunas: [],
  statusClass: string,
};

export type User = {
  access_token: string,
  created_at: string,
  created_by: number,
  email: string,
  firstname: string,
  google2fa: string,
  google2fa_ts: number,
  id: number,
  isDeveloper: boolean,
  is_blocked: number,
  lastname: string,
  lastname_initial: string,
  login_type: number,
  photo: string,
  photoLink: string,
  position: string,
  record_status: number,
  role_id: number,
  slug: string,
  status: number,
  updated_at: string,
  updated_by: number,
  userPhotoIcon: string,
  userPhotoLink: string,
  username: string,
  verification_token: string,
};

export type Watershed = {
  created_at: string,
  created_by: number,
  description: string,
  gallery: string[],
  id: number,
  name: string,
  photo: string,
  record_status: number,
  type: number,
  updated_at: string,
  updated_by: number,
};

export type incidentSetting = {
  icon: string,
  id: number,
  incident_type: any[],
  label: string,
  label_eng: string,
};

export type GeneralSetting = {
  app_name: string,
  coordinate_frequency_tracking: number,
  coordinate_radius_tracking: number,
  icon: string,
  iconUrl: string,
  loginBackgroundUrl: string,
  login_background: string,
  photos_per_category: number,
};

export type FloraSetting = {
  icon: string,
  id: number,
  label: string,
  label_eng: string
};

export type FaunaSetting = {
  icon: string,
  id: number,
  label: string,
  label_eng: string
};

export type BarangaySetting = {
  created_at: string,
  created_by: number,
  id: number,
  municipality_id: number,
  name: string,
  no: number,
  priority_score: number,
  record_status: 1,
  updated_at: string,
  updated_by: number
};

export type Settings = {
  general: GeneralSetting,
  watersheds: Watershed[],
  incidents: incidentSetting[],
  floras: FloraSetting[],
  faunas: FaunaSetting[],
  barangay: BarangaySetting[]
};

export type Library = {
  brgy: Barangay[],
  common_name: string,
  conservation_status: string,
  created_at: string,
  created_by: number,
  distribution: string,
  family: string,
  gallery: string[],
  galleryUrl: string[],
  genus: string,
  id: number,
  island_group: Island[],
  municipality: Municipality[],
  notes: string,
  photo: string,
  province: Province[],
  record_status: number,
  region: Region[],
  residency_status: string,
  species: string,
  specific_area: string,
  sub_species: string,
  tablePhotoUrl: string,
  taxonomic_group: string,
  updated_at: string,
  updated_by: number,
  varieta_and_infra_var_name: string,
  watershed_id: number,
};

export type DataProviderMeta = {
  currentPage: number,
  pageCount: number,
  perPage: number,
  totalCount: number,
};