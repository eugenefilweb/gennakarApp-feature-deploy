- [x] End Patrol Button Overlapped with compass
- [x] Choose Barangay - should be Choose SubCategory
## PATROL HISTORY
- [x] Photo of encoded flora not shown
- [x] Encoded Fauna record not shown
- [x] Indicate Encoded Fauna and Incident Report
    ```
        Ex:
        Encoded Flora (1)
        Encoded Fauna (1)
        Encoded Incident Reports (1)
    ```
    
- [x] Patrol number is different from the patrol number before syncing
        - Can Add validation umber but patrol number should be the same for reference
- [ ] wrong distance
## Field
- [x] add another field for Description
## Flora
- [x] Photo of encoded Flroa now shown
- [x] Unclickable
- [x] Per flora entry
    - Photo, category icon, description
- [x] add tagalog to description
## Fauna
- [x] Encoded Fauna not syncing
## Report
- [x] Photos of incident
- [x] Report are not reflecting
## incident
- [x] Spacing for category ( make closer )

# Priorities
- [ ] Syncing
- [ ] Patrol Tracking
- [ ] Flora Fauna Functions
- [ ] Incident Report

---------------------------------------------------------------

# PRIO TASK
- [x] Add Flora
- [x] Add Fauna
- [ ] Add Incident



atleast 3 image flora (3)
atleast 1 image fauna (1)
atleast 1 photo incident

dismiss button (english) flora/fauna/incident



```
	[Change Log]:

	[Changes]:
	Corrected the grammar in Patrols Alert Messages.
	Removed the "Complete Status" for completed patrols.
	Rectified the translation of "isda" to "Fish."
	Updated the button text on the Fauna Page.
	Fixes:
	Removed the "Encoded Report."
	Implemented automatic synchronization for Incident Reports.
	Revised category names.
	Fixed the alignment of the entry patrol list tab.
```






















<!-- 		
				<!-- <ion-card *ngIf="currentPatrol.syncStatus" style="border-radius: 0.45rem; border: 2px solid #e2e9d0; box-shadow: none;">
					<ion-card-header style="--background: var(--ion-color-gntertiary);">
						<ion-card-subtitle style="display: flex; justify-content: space-between; align-items: center;">
							<ion-badge color="{{currentPatrol.syncStatus == 'Ongoing' ? 'primary': 'warning'}}">
								{{currentPatrol.syncStatus}}
							</ion-badge>
							<h3 style="margin: 0; font-size: 12px; font-weight: bold;">{{formatDate(currentPatrol.timestamp,'ll')}}</h3>
						</ion-card-subtitle>
					</ion-card-header>
					<ion-card-content>
						<div class="start" style="display: flex; align-items: flex-start; flex-direction: column; justify-content: center;">
							<ion-text class="time">
								Start | End : 
								{{formatDate(currentPatrol.timestamp,'hh:mm A')}} - {{formatDate(currentPatrol.lastTimestamp,'hh:mm A')}}
							</ion-text>
							<ion-text class="location">
								Location : 
								{{currentPatrol.sitio?'Sitio '+currentPatrol.sitio+', ':null}}{{currentPatrol.barangay?' Barangay '+currentPatrol.barangay:null}}
							</ion-text>
							<ion-text class="watershed">
								Watershed : 
								{{currentPatrol.watershed || 'None'}}
							</ion-text>
							<ion-text class="flora">
								Flora Encoded : 
								{{floras.length}}
							</ion-text>
							<ion-text class="fauna">
								Fauna Encoded : 
								{{faunas.length}}
							</ion-text>
							<ion-text class="distance">
								Distance : 
								{{totalDistance.toFixed(2)}} Meters
							</ion-text>
							<ion-text class="travel">
								Travel Hours : 
								{{travelHours(currentPatrol)}}
							</ion-text>
							<ion-text class="travel">
								Coordinates : 
								{{coordinates.length}}
							</ion-text>
						</div>
					</ion-card-content>
				</ion-card> --> -->