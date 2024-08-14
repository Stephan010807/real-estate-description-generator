import OpenAI from 'openai';
import { NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import Description from '@/models/Description';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const platformInstructions: { [key: string]: string } = {
      website: "Erstelle eine ausführliche, SEO-optimierte Beschreibung für die Website. Verwende HTML-Tags für die Strukturierung.",
      instagram: "Verfasse eine kurze, prägnante Beschreibung mit maximal 2200 Zeichen. Füge relevante Hashtags am Ende hinzu.",
      tiktok: "Erstelle eine sehr kurze, aufmerksamkeitsstarke Beschreibung mit maximal 300 Zeichen. Konzentriere dich auf die herausragendsten Merkmale.",
      all: "Erstelle drei separate Beschreibungen: eine ausführliche für die Website, eine für Instagram und eine für TikTok, gemäß den jeweiligen Plattformanforderungen."
    };

    const prompt = `
    Erstelle eine ${data.targetPlatform === 'all' ? 'mehrere Versionen einer' : ''} detaillierten Immobilienbeschreibung für eine ${data.propertyType || 'Immobilie'} mit den folgenden Details:

    Grundinformationen:
    - Anzahl der Zimmer: ${data.rooms || 'Keine Angaben'}
    - Größe: ${data.size || 'Keine Angaben'} Quadratmeter
    - Lage: ${data.location || 'Keine Angaben'}
    - Baujahr: ${data.yearBuilt || 'Keine Angaben'}

    Zustand und Ausstattung:
    - Renovierungszustand: ${data.condition || 'Keine Angaben'}
    - Ausstattungsstandard: ${data.furnishing || 'Keine Angaben'}
    - Besondere Merkmale: ${data.specialFeatures?.join(', ') || 'Keine Angaben'}
    - Energieeffizienz: ${data.energyEfficiency || 'Keine Angaben'}

    Umgebung und Lage:
    - Nachbarschaft: ${data.neighborhood || 'Keine Angaben'}
    - Ausrichtung: ${data.orientation || 'Keine Angaben'}
    - Etage: ${data.floor || 'Keine Angaben'}
    - Verkehrsanbindung: ${data.transport || 'Keine Angaben'}

    Zusätzliche Eigenschaften:
    - Parkmöglichkeiten: ${data.parking || 'Keine Angaben'}
    - Haustiere erlaubt: ${data.petsAllowed || 'Keine Angaben'}
    - Balkon/Terrasse: ${data.balconyOrTerrace || 'Keine Angaben'}
    - Garten: ${data.garden || 'Keine Angaben'}

    Finanzielle Aspekte:
    - Preis: ${data.price || 'Keine Angaben'} ${data.saleOrRent === 'sale' ? 'EUR' : data.saleOrRent === 'rent' ? 'EUR/Monat' : ''}
    - ${data.saleOrRent === 'sale' ? 'Kaufobjekt' : data.saleOrRent === 'rent' ? 'Mietobjekt' : ''}

    Zusatzinformationen:
    ${data.additionalInfo || 'Keine Zusatzinformationen'}

    Zielplattform: ${data.targetPlatform || 'Keine Angabe'}

    ${platformInstructions[data.targetPlatform] || 'Erstelle eine allgemeine Beschreibung.'}

    Allgemeine Richtlinien:
    1. Beginne mit einem fesselnden Eröffnungssatz, der die Hauptvorteile der Immobilie hervorhebt.
    2. Strukturiere die Beschreibung in klare Abschnitte: Überblick, Ausstattung, Lage, Besonderheiten, Finanzielles.
    3. Verwende beschreibende Adjektive, um die Immobilie lebendig darzustellen.
    4. Integriere relevante Keywords für SEO, wie Immobilientyp, Lage und Hauptmerkmale.
    5. Schließe mit einer Zusammenfassung ab, die die Einzigartigkeit der Immobilie betont.
    6. Passe die Länge und den Stil an die jeweilige Plattform an.
    7. Verwende das passende Format für jede Plattform (z.B. HTML für Website, Hashtags für Instagram).
    `.trim();

    console.log('Sending prompt to OpenAI:', prompt);

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1000,  // Erhöht für mehrere Beschreibungen
      user: 'asst_4geMpMksFuAgENrJAna5L1WB',
    });

    console.log('OpenAI Response:', response);

    const descriptionContent = response.choices[0]?.message?.content || 'Keine Beschreibung verfügbar.';

    console.log('Generated Description:', descriptionContent);

    if (!descriptionContent.trim()) {
      return NextResponse.json({ error: 'Fehler beim Generieren der Beschreibung. Die Beschreibung ist leer.' }, { status: 500 });
    }

    await dbConnect();
    console.log('Connected to the database');

    const description = await Description.create({
      title: `${data.propertyType || 'Immobilie'} in ${data.location || 'Unbekannt'}`,
      content: descriptionContent,
      targetPlatform: data.targetPlatform,
    });

    console.log('Description stored in database:', description);

    return NextResponse.json({ description });
  } catch (error) {
    console.error('Fehler beim Erstellen der Beschreibung:', error);
    return NextResponse.json({ error: 'Fehler beim Erstellen der Beschreibung' }, { status: 500 });
  }
}