import * as yup from 'yup';

export interface FormData {
  propertyType: string;
  rooms: number | null;
  size: number | null;
  location: string;
  yearBuilt: number | null;
  condition: string;
  furnishing: string;
  specialFeatures: string[];
  neighborhood: string;
  energyEfficiency: string;
  orientation: string;
  floor: number | null;
  parking: string;
  price: number | null;
  saleOrRent: 'sale' | 'rent' | '';
  transport: string;
  petsAllowed: 'yes' | 'no' | 'limited' | '';
  balconyOrTerrace: 'balcony' | 'terrace' | 'both' | 'none' | '';
  garden: 'yes' | 'no' | 'shared' | '';
  targetPlatform: 'website' | 'instagram' | 'tiktok' | 'all' | '';
  additionalInfo: string;
}

export const schema = yup.object().shape({
  propertyType: yup.string().required('Immobilientyp ist erforderlich'),
  rooms: yup.number().nullable().min(1, 'Muss mindestens 1 Zimmer haben'),
  size: yup.number().nullable().min(1, 'Größe muss positiv sein'),
  location: yup.string().required('Standort ist erforderlich'),
  yearBuilt: yup.number().nullable().min(1800, 'Jahr muss nach 1800 sein'),
  condition: yup.string(),
  furnishing: yup.string(),
  specialFeatures: yup.array().of(yup.string()),
  neighborhood: yup.string(),
  energyEfficiency: yup.string(),
  orientation: yup.string(),
  floor: yup.number().nullable().min(0, 'Etage muss 0 oder höher sein'),
  parking: yup.string(),
  price: yup.number().nullable().min(0, 'Preis muss positiv sein'),
  saleOrRent: yup.string().oneOf(['sale', 'rent', '']),
  transport: yup.string(),
  petsAllowed: yup.string().oneOf(['yes', 'no', 'limited', '']),
  balconyOrTerrace: yup.string().oneOf(['balcony', 'terrace', 'both', 'none', '']),
  garden: yup.string().oneOf(['yes', 'no', 'shared', '']),
  targetPlatform: yup.string().oneOf(['website', 'instagram', 'tiktok', 'all', '']).required('Zielplattform ist erforderlich'),
  additionalInfo: yup.string(),
});