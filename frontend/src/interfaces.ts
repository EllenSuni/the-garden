export interface PlantType {
  plantname: string;
  sciname: string | null;
  gardenarea: string;
  needsdressing: boolean;
  dressingtime: string | null;
  needsfertilizer: boolean;
  fertilizertime: string | null;
  needstrimming: boolean;
  trimmingtime: string | null;
  plantingmonth: string;
  plantingyear: number | null;
  bloomtime: string | null;
  harvesttime: string | null;
  notes: string | null;
}
