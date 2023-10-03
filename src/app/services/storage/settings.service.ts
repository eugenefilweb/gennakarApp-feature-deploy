import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthConstants } from 'src/app/config/auth-constants';
import { Network } from 'src/app/types/general.type';
import { HttpService } from '../http.service';
import { NetworkService } from '../network.service';
import { StorageService } from './storage.service';
import { Settings } from 'src/app/types/live.type';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  name: string = AuthConstants.SETTINGS;
  INIT_DATA: Settings = {
    general: {
      coordinate_frequency_tracking: 10,
      coordinate_radius_tracking: 3,
      app_name: "AYOS",
      icon: "hzo_xDir66-1678416374460",
      login_background: "qD0HFCwmxa-1678417674801",
      iconUrl: "https://gennakar.accessgov.ph/assets/images/fa/fa45eb_Gen-Nakar-Logo-01.png-BOkFoF-aXF-1678416374.png",
      loginBackgroundUrl: "https://gennakar.accessgov.ph/assets/images/9c/9c022d_illustration-hornbill-at-pinanga.png-IaI_g-1e1o-1678417674.png",
      photos_per_category: 4
    },
    watersheds: [
      {
        gallery: [],
        id: 1,
        name: "Umiray",
        type: 3,
        description: "The Umiray Angat Transbasin Project (UATP) is an expansion project of the Metropolitan Waterworks and Sewerage System (MWSS) for the supply of the Angat Dam reservoir. The 13-kilometer-long (8.1 mi) 4.30 meter (14.1 ft) diameter tunnel-aqueduct system.",
        photo: "dLZsc9u0ep-1670821566",
        record_status: 1,
        created_by: 3,
        updated_by: 1,
        created_at: "2022-12-12 05:06:10",
        updated_at: "2023-03-16 06:38:26"
      },
      {
        gallery: [],
        id: 2,
        name: "Kanan",
        type: 3,
        description: "Project Objectives The main purpose of the Project is to ensure water security. In addition, the Project aims to increase the raw water supply to meet future potable water demand of Metro Manila and reduce dependence on the Angat Dam.",
        photo: "ZjvjR_nx55-1670821615",
        record_status: 1,
        created_by: 3,
        updated_by: 1,
        created_at: "2022-12-12 05:06:58",
        updated_at: "2023-03-16 04:41:21"
      },
      {
        gallery: [],
        id: 3,
        name: "Kaliwa",
        type: 3,
        description: "Project Objectives The main purpose of the Project is to ensure water security. In addition, the Project aims to increase the raw water supply to meet future potable water demand of Metro Manila and reduce dependence on the Angat Dam.",
        photo: "nbCQuLk1yF-1670821647",
        record_status: 1,
        created_by: 3,
        updated_by: 1,
        created_at: "2022-12-12 05:07:30",
        updated_at: "2023-03-16 04:41:15"
      }
    ],
    incidents: [
      {
          id: 1,
          label: "Pagpuputol ng puno",
          label_eng: "Logging",
          icon: "",
          incident_type: [
            {
              id: 1,
              label: "Panggamit sa bahay",
              label_eng: "Personal Use",
              icon: "",
            },
            {
              id: 2,
              label: "Pambenta",
              label_eng: "Commercial Activity",
              icon: "",
            },
          ]
      },
      {
          id: 2,
          label: "Land Clearing",
          label_eng: "Pagkakaingin",
          icon: "",
          incident_type: [
            {
              id: 1, 
              label_eng: 'Agricultural', 
              label: 'May kinalaman sa pagtatanim', 
              icon: ''
            },
            {
              id: 2, 
              label_eng: 'Infrastructure', 
              label: 'May kinalaman sa pagpapagawa', 
              icon: ''
            },
            {
              id: 3, 
              label_eng: 'Mining', 
              label: 'May kinalaman sa pagmimina', 
              icon: ''
            },
            {
              id: 4, 
              label_eng: 'Others', 
              label: 'Iba pa', 
              icon: ''
            },
          ]
      },
      {
          id: 3,
          label: "Enroachment",
          label_eng: "Pag-angkin ng lupa",
          icon: "",
          incident_type: [
            {id: 1, label_eng: 'Unauthorized settlements', label: 'Iligal pag-iiskwater', icon: ''},
            {id: 2, label_eng: 'Unauthorized tourism facility', label: 'Iligal na pang-turista', icon: ''},
            {id: 3, label_eng: 'Others', label: 'Iba pa', icon: ''}
          ]
      },
      {
          id: 4,
          label: "Ilegal na pangagaso",
          label_eng: "Poaching",
          icon: "",
          incident_type: [

            {id: 1, label_eng: 'Flora', label: 'Halaman', icon: ''},

            {id: 2, label_eng: 'Fauna', label: 'Hayop', icon: ''},

            {id: 3, label_eng: 'Others', label: 'Iba pa', icon: ''},
          ]
      },
      {
          id: 5,
          label: "Pagguho ng lupa",
          label_eng: "Soil Erosion",
          icon: "",
          incident_type: [
            {id: 1, label_eng: 'Water-induced', label: 'Dahil sa tubig o ulan', icon: ''},

            {id: 2, label_eng: 'Human-activity', label: 'Dahil sa tao', icon: ''}
          ]
      },
      {
          id: 6,
          label: "Ilegal na gawain",
          label_eng: "Illegal Forest Activity",
          icon: "",
          incident_type: [

            {"id ": 1, label_eng: 'Mining', label: 'Pagmimina', icon: ''},

            {"id ": 2, label_eng: 'Charcoal making', label: 'Paguuling', icon: ''},
          ]
      },
      {
          id: 7,
          label: "Polusyon",
          label_eng: "Pollution",
          icon: "",
          incident_type: [

            {id: 1, label_eng: 'Water pollution', label: 'Sa tubig', icon: ''},

            {id: 2, label_eng: 'Air pollution', label: 'Sa hangin', icon: ''},

            {id: 3, label_eng: 'Solid waste', label: 'Basura', icon: ''},

            {id: 4, label_eng: 'Others', label: 'Iba pa', icon: ''},
          ]
      },
      {
          id: 8,
          label: "Sirang imprastraktura",
          label_eng: "Damaged Infrastracture",
          icon: "",
          incident_type: [

            {id: 1, label_eng: 'Natural causes', label: 'Dahil sa kalikasan, ulan, baha, etc.', icon: ''},

            {id: 2, label_eng: 'Neglect', label: 'Dahil napabayaan', icon: ''},
 
            {id: 3, label_eng: 'Vandalism', label: 'Sinadyang sirain', icon: ''}
          ]
      },
      {
          id: 9,
          label: "Iba pa",
          label_eng: "Others",
          icon: "",
          incident_type: []
      }
    ],
    floras: [
      {
        icon: '', 
        id: 1, 
        label: 'Epipitas',
        label_eng: 'Epiphytes', 
      }, 
      {
        icon: '', 
        id: 2, 
        label: 'Pako',
        label_eng: 'Ferns', 
      }, 
      {
        icon: '', 
        id: 3, 
        label: 'Damo at Uwak-Uwakan',
        label_eng: 'Grass', 
      }, 
      {
        icon: '', 
        id: 4, 
        label: 'Halamang-Gamot',
        label_eng: 'Herbs', 
      }, 
      {
        icon: '', 
        id: 5, 
        label: 'Punong Kahoy',
        label_eng: 'Trees', 
      }, 
      {
        icon: '', 
        id: 6, 
        label: 'Gumagapang na halaman',
        label_eng: 'Vines', 
      }, 
      {
        icon: '', 
        id: 7, 
        label: 'Palma',
        label_eng: 'Palms', 
      }, 
      {
        icon: '', 
        id: 8, 
        label: 'Halaman na Mababa',
        label_eng: 'Shrubs', 
      }, 
      {
        icon: '', 
        id: 99,
         label: 'Iba pa',
        label_eng: 'Others', 
      },

    ],
    faunas: [
      {
        icon: '', 
        id: 1, 
        label: 'Isda',
        label_eng: 'Fish', 
      }, 
      {
        icon: '', 
        id: 2, 
        label: 'Arthropoda',
        label_eng: 'Arthropods', 
      }, 
      {
        icon: '', 
        id: 3, 
        label: 'Ibon',
        label_eng: 'Bird', 
      }, 
      {
        icon: '', 
        id: 4, 
        label: 'Amphibians',
        label_eng: 'Amphibians', 
      }, 
      {
        icon: '', 
        id: 5, 
        label: 'Mamalya',
        label_eng: 'Mammals', 
      }, 
      {
        icon: '', 
        id: 6, 
        label: 'Reptilya',
        label_eng: 'Reptiles', 
      }, 
      {
        icon: '', 
        id: 99,
        label: 'Iba pa',
        label_eng: 'Others', 
      },

    ],
    barangay: [
      {
          created_at: "2022-12-09 02:51:55",
          created_by: 3,
          id: 19,
          municipality_id: 2,
          name: "Banglos",
          no: 19,
          priority_score: 0,
          record_status: 1,
          updated_at: "2023-09-15 01:15:27",
          updated_by: 3
      },
      {
          created_at: "2022-12-09 02:52:00",
          created_by: 3,
          id: 20,
          municipality_id: 2,
          name: "Batangan",
          no: 20,
          priority_score: 0,
          record_status: 1,
          updated_at: "2023-09-15 01:15:27",
          updated_by: 3
      },
      {
          created_at: "2022-12-09 02:52:05",
          created_by: 3,
          id: 21,
          municipality_id: 2,
          name: "Catablingan",
          no: 21,
          priority_score: 0,
          record_status: 1,
          updated_at: "2023-09-15 01:15:27",
          updated_by: 3
      },
      {
          created_at: "2022-12-09 02:52:10",
          created_by: 3,
          id: 22,
          municipality_id: 2,
          name: "Canaway",
          no: 22,
          priority_score: 0,
          record_status: 1,
          updated_at: "2023-09-15 01:15:27",
          updated_by: 3
      },
      {
          created_at: "2022-12-09 02:52:15",
          created_by: 3,
          id: 23,
          municipality_id: 2,
          name: "Lumutan",
          no: 23,
          priority_score: 0,
          record_status: 1,
          updated_at: "2023-09-15 01:15:27",
          updated_by: 3
      },
      {
          created_at: "2022-12-09 02:52:22",
          created_by: 3,
          id: 24,
          municipality_id: 2,
          name: "Mahabang Lalim",
          no: 24,
          priority_score: 0,
          record_status: 1,
          updated_at: "2023-09-15 01:15:27",
          updated_by: 3
      },
      {
          created_at: "2022-12-09 02:52:27",
          created_by: 3,
          id: 25,
          municipality_id: 2,
          name: "Maigang",
          no: 25,
          priority_score: 0,
          record_status: 1,
          updated_at: "2023-09-15 01:15:27",
          updated_by: 3
      },
      {
          created_at: "2022-12-09 02:52:33",
          created_by: 3,
          id: 26,
          municipality_id: 2,
          name: "Maligaya",
          no: 26,
          priority_score: 0,
          record_status: 1,
          updated_at: "2023-09-15 01:15:27",
          updated_by: 3
      },
      {
          created_at: "2022-12-09 02:52:37",
          created_by: 3,
          id: 27,
          municipality_id: 2,
          name: "Magsikap",
          no: 27,
          priority_score: 0,
          record_status: 1,
          updated_at: "2023-09-15 01:15:27",
          updated_by: 3
      },
      {
          created_at: "2022-12-09 02:52:43",
          created_by: 3,
          id: 28,
          municipality_id: 2,
          name: "Minahan Norte",
          no: 28,
          priority_score: 0,
          record_status: 1,
          updated_at: "2023-09-15 01:15:27",
          updated_by: 3
      },
      {
          created_at: "2022-12-09 02:52:48",
          created_by: 3,
          id: 29,
          municipality_id: 2,
          name: "Minahan Sur",
          no: 29,
          priority_score: 0,
          record_status: 1,
          updated_at: "2023-09-15 01:15:27",
          updated_by: 3
      },
      {
          created_at: "2022-12-09 02:52:54",
          created_by: 3,
          id: 30,
          municipality_id: 2,
          name: "Pagsangahan",
          no: 30,
          priority_score: 0,
          record_status: 1,
          updated_at: "2023-09-15 01:15:27",
          updated_by: 3
      },
      {
          created_at: "2022-12-09 02:52:59",
          created_by: 3,
          id: 31,
          municipality_id: 2,
          name: "Pamplona",
          no: 31,
          priority_score: 0,
          record_status: 1,
          updated_at: "2023-09-15 01:15:27",
          updated_by: 3
      },
      {
          created_at: "2022-12-09 02:53:04",
          created_by: 3,
          id: 32,
          municipality_id: 2,
          name: "Pisa",
          no: 32,
          priority_score: 0,
          record_status: 1,
          updated_at: "2023-09-15 01:15:27",
          updated_by: 3
      },
      {
          created_at: "2022-12-09 02:53:08",
          created_by: 3,
          id: 33,
          municipality_id: 2,
          name: "Poblacion",
          no: 33,
          priority_score: 0,
          record_status: 1,
          updated_at: "2023-09-15 01:15:27",
          updated_by: 3
      },
      {
          created_at: "2022-12-09 02:53:12",
          created_by: 3,
          id: 34,
          municipality_id: 2,
          name: "Sablang",
          no: 34,
          priority_score: 0,
          record_status: 1,
          updated_at: "2023-09-15 01:15:27",
          updated_by: 3
      },
      {
          created_at: "2022-12-09 02:53:17",
          created_by: 3,
          id: 35,
          municipality_id: 2,
          name: "San Marcelino",
          no: 35,
          priority_score: 0,
          record_status: 1,
          updated_at: "2023-09-15 01:15:27",
          updated_by: 3
      },
      {
          created_at: "2022-12-09 02:53:22",
          created_by: 3,
          id: 36,
          municipality_id: 2,
          name: "Umiray",
          no: 36,
          priority_score: 0,
          record_status: 1,
          updated_at: "2023-09-15 01:15:27",
          updated_by: 3
      },
      {
          created_at: "2023-09-18 02:49:03",
          created_by: 2,
          id: 37,
          municipality_id: 2,
          name: "Anoling",
          no: 37,
          priority_score: 0,
          record_status: 1,
          updated_at: "2023-09-18 02:49:03",
          updated_by: 2
      }
  ]
  

  };
  settings: BehaviorSubject<Settings> = new BehaviorSubject(this.INIT_DATA);

  constructor(
    private _storage: StorageService,
    private _network: NetworkService,
    private _http: HttpService,
  ) {
    this.init();
  }

  async init() {
    const network: Network = await this._network.getNetwork();
    if (network.connected) {
      this._http.get('setting/general').subscribe((response: any) => {
        const { status, data } = response;

        if (status) {
          this._storage.set(this.name, data).then((data: Settings) => {
            this.settings.next(data);
          });
        }
      });
    }
    else {
      this._storage.set(this.name, this.INIT_DATA).then((data: Settings) => {
        this.settings.next(data);
      });
    }
  }
}
