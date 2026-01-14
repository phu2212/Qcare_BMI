
export interface ProgressData {
  stt: number;
  date: string;
  weight: number;
  bmi: number;
  bodyFat?: number;
  visceralFat?: number;
  notes?: string;
}

export interface ExtractionResult {
  customerName: string;
  startDate: string;
  data: ProgressData[];
}
