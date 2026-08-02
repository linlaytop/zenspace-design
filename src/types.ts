export interface LightingCategory {
  id: string;
  name: string;
  englishName: string;
  description: string;
  imageUrl: string;
  technicalDetails: {
    basePowerDensity: string; // e.g. "5.5 W/㎡"
    typicalK: string;         // e.g. "2700K - 3200K"
    controlProtocol: string;  // e.g. "DMX512 / RDM / Art-Net"
    ecologyLevel: string;     // e.g. "Eco-Cert Class A"
  };
  features: string[];
  cases: ProjectCase[];
}

export interface ProjectCase {
  title: string;
  location: string;
  concept: string;
  photographer: string;
  stats: { label: string; value: string }[];
}

export interface LightingParam {
  temperature: number;      // 2000K to 6500K
  intensity: number;        // 0 to 100%
  color: string;            // hex or color keyword (for light show/dynamic)
  animationMode: 'static' | 'pulse' | 'breath' | 'chase';
}

export interface BlueprintFixture {
  id: string;
  type: 'spot' | 'flood' | 'wash' | 'linear' | 'water';
  x: number; // percentage
  y: number; // percentage
  angle: number; // beam angle degrees
  color: string;
  intensity: number;
}

export interface ConsultationPlan {
  title: string;
  concept: string;
  colorTemperature: string;
  illuminanceRating: string;
  fixtures: {
    name: string;
    purpose: string;
    power: string;
    qty: string;
  }[];
  controlSystem: string;
  ecologyProtection: string;
}
