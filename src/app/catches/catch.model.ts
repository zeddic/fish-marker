import { Timestamp } from "@angular/fire/firestore";

export interface Catch {
	id?: string;
	type: string;
	lat: number;
	lng: number;
	lbs: number;
	oz: number;
	rig: string;
	bait: string;
	uid: string;
	marker?: any;
	image?: string;
}