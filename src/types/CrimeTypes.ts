interface OffenseData {
  data_year: number;
  [offenseType: string]: number; // Dynamic property for offense types
}

interface ApiResponse {
  title: string;
  keys: string[];
  data: OffenseData[];
}

export type { ApiResponse, OffenseData };
