export interface IPlant {
  id: number;
  name: string;
  scientific_name: string;
}

export interface IAddPlant {
  name: string;
  scientific_name: string;
  planted: string;
}

export interface IEvent {
  id: number;
  type: string;
  month: number;
  plant_id: number;
}

export interface IArea {
  id: number;
  name: string;
}

export interface INote {
  id: number;
  plant_id: number;
  text: string;
}

export interface IFullPlant extends IPlant {
  area: string[];
  // event: IEvent[];
  text: string;
}
