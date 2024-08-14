import React from 'react';
import { 
  Grid, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, 
  Autocomplete, Chip, InputAdornment, Select, MenuItem
} from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { motion } from 'framer-motion';
import { 
  Home, Hotel, AspectRatio, Event, Build, KingBed, 
  LocationOn, Apartment, EmojiTransportation, AttachMoney, Info,
  Bolt, Explore, Stairs, LocalParking, Pets, Balcony, LocalFlorist,
  Language, Instagram, YouTube
} from '@mui/icons-material';
import { FormData } from './types';

export interface FormStepProps {
  step: number;
  control: Control<FormData>;
}

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -60 },
  transition: { duration: 0.5 }
};

const energyEfficiencyOptions = ['A+', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const conditionOptions = ['Neuwertig', 'Gepflegt', 'Renovierungsbedürftig', 'Saniert', 'Erstbezug'];
const furnishingOptions = ['Voll möbliert', 'Teilmöbliert', 'Unmöbliert', 'Nach Vereinbarung'];
const orientationOptions = ['Norden', 'Nordosten', 'Osten', 'Südosten', 'Süden', 'Südwesten', 'Westen', 'Nordwesten'];
const platformOptions = [
  { value: 'website', label: 'Website', icon: <Language /> },
  { value: 'instagram', label: 'Instagram', icon: <Instagram /> },
  { value: 'tiktok', label: 'TikTok', icon: <YouTube /> },
  { value: 'all', label: 'Alle Plattformen', icon: <Language /> },
];

export const FormStep: React.FC<FormStepProps> = ({ step, control }) => {
  const renderStep = (currentStep: number) => {
    switch (currentStep) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="propertyType"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Immobilientyp"
                    placeholder="z.B. Wohnung, Haus"
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Home />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="rooms"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Anzahl der Zimmer"
                    placeholder="z.B. 3"
                    variant="outlined"
                    type="number"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Hotel />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="size"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Größe (m²)"
                    placeholder="z.B. 120"
                    variant="outlined"
                    type="number"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AspectRatio />
                        </InputAdornment>
                      ),
                      endAdornment: <InputAdornment position="end">m²</InputAdornment>,
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="yearBuilt"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Baujahr"
                    placeholder="z.B. 2000"
                    variant="outlined"
                    type="number"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Event />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="condition"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    options={conditionOptions}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        label="Zustand"
                        variant="outlined"
                        InputProps={{
                          ...params.InputProps,
                          startAdornment: (
                            <InputAdornment position="start">
                              <Build />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                    onChange={(_, data) => field.onChange(data)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="furnishing"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    options={furnishingOptions}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        label="Möblierung"
                        variant="outlined"
                        InputProps={{
                          ...params.InputProps,
                          startAdornment: (
                            <InputAdornment position="start">
                              <KingBed />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                    onChange={(_, data) => field.onChange(data)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="specialFeatures"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    multiple
                    options={['Balkon', 'Einbauküche', 'Kamin', 'Garten', 'Aufzug', 'Parkplatz', 'Terrasse', 'Keller', 'Dachboden', 'Garage']}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Besondere Merkmale"
                        placeholder="z.B. Balkon, Einbauküche"
                      />
                    )}
                    onChange={(_, data) => field.onChange(data)}
                    value={field.value || []}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          variant="outlined"
                          label={option}
                          {...getTagProps({ index })}
                          color="primary"
                        />
                      ))
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="energyEfficiency"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    options={energyEfficiencyOptions}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        label="Energieeffizienzklasse"
                        variant="outlined"
                        InputProps={{
                          ...params.InputProps,
                          startAdornment: (
                            <InputAdornment position="start">
                              <Bolt />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                    onChange={(_, data) => field.onChange(data)}
                  />
                )}
              />
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="location"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Standort"
                    placeholder="z.B. Hamburg, Eppendorf"
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationOn />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="neighborhood"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Nachbarschaft"
                    placeholder="z.B. Ruhige Wohngegend"
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Apartment />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="orientation"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    options={orientationOptions}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        label="Ausrichtung"
                        variant="outlined"
                        InputProps={{
                          ...params.InputProps,
                          startAdornment: (
                            <InputAdornment position="start">
                              <Explore />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                    onChange={(_, data) => field.onChange(data)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="floor"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Etage"
                    placeholder="z.B. 3"
                    variant="outlined"
                    type="number"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Stairs />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="transport"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Verkehrsanbindung"
                    placeholder="z.B. 5 Minuten zur U-Bahn"
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmojiTransportation />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>
          </Grid>
        );
      case 3:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="price"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Preis"
                    placeholder="z.B. 250000"
                    variant="outlined"
                    type="number"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AttachMoney />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="saleOrRent"
                control={control}
                render={({ field }) => (
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Zum Verkauf oder zur Miete</FormLabel>
                    <RadioGroup row {...field}>
                      <FormControlLabel value="sale" control={<Radio color="primary" />} label="Zum Verkauf" />
                      <FormControlLabel value="rent" control={<Radio color="primary" />} label="Zur Miete" />
                    </RadioGroup>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="parking"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Parkplatz"
                    placeholder="z.B. Tiefgarage"
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocalParking />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="petsAllowed"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth variant="outlined">
                    <Select
                      {...field}
                      displayEmpty
                      startAdornment={
                        <InputAdornment position="start">
                          <Pets />
                        </InputAdornment>
                      }
                    >
                      <MenuItem value="">
                        <em>Haustiere erlaubt?</em>
                      </MenuItem>
                      <MenuItem value="yes">Ja</MenuItem>
                      <MenuItem value="no">Nein</MenuItem>
                      <MenuItem value="limited">Eingeschränkt</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="balconyOrTerrace"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth variant="outlined">
                    <Select
                      {...field}
                      displayEmpty
                      startAdornment={
                        <InputAdornment position="start">
<Balcony />
                        </InputAdornment>
                      }
                    >
                      <MenuItem value="">
                        <em>Balkon oder Terrasse?</em>
                      </MenuItem>
                      <MenuItem value="balcony">Balkon</MenuItem>
                      <MenuItem value="terrace">Terrasse</MenuItem>
                      <MenuItem value="both">Beides</MenuItem>
                      <MenuItem value="none">Keines</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="garden"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth variant="outlined">
                    <Select
                      {...field}
                      displayEmpty
                      startAdornment={
                        <InputAdornment position="start">
                          <LocalFlorist />
                        </InputAdornment>
                      }
                    >
                      <MenuItem value="">
                        <em>Garten?</em>
                      </MenuItem>
                      <MenuItem value="yes">Ja</MenuItem>
                      <MenuItem value="no">Nein</MenuItem>
                      <MenuItem value="shared">Gemeinschaftlich</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="targetPlatform"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <FormLabel component="legend">Zielplattform für die Beschreibung</FormLabel>
                    <RadioGroup row {...field}>
                      {platformOptions.map((option) => (
                        <FormControlLabel
                          key={option.value}
                          value={option.value}
                          control={<Radio color="primary" />}
                          label={
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              {option.icon}
                              <span style={{ marginLeft: '8px' }}>{option.label}</span>
                            </div>
                          }
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="additionalInfo"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Zusätzliche Informationen"
                    placeholder="Weitere Details, die Sie hinzufügen möchten"
                    variant="outlined"
                    multiline
                    rows={4}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Info />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>
          </Grid>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      key={step}
      {...fadeInUp}
    >
      {renderStep(step)}
    </motion.div>
  );
};

export default FormStep;