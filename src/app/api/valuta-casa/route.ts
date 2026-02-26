import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { siteConfig } from '@/lib/site-config';

export const runtime = 'nodejs';

type ValutaCasaPayload = {
  nome: string;
  cognome: string;
  indirizzo: string;
  comune: string;
  email: string;
  telefono: string;
  tipologia: string;
  statoImmobile: string;
  metratura: string;
  tempistiche: string;
  note: string;
};

function isValidPayload(payload: Partial<ValutaCasaPayload>) {
  return Boolean(
    payload.nome?.trim() &&
      payload.cognome?.trim() &&
      payload.indirizzo?.trim() &&
      payload.comune?.trim() &&
      payload.email?.trim() &&
      payload.telefono?.trim() &&
      payload.tipologia?.trim() &&
      payload.statoImmobile?.trim() &&
      payload.tempistiche?.trim()
  );
}

function getSmtpTransport() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? '587');
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as Partial<ValutaCasaPayload>;

    if (!isValidPayload(payload)) {
      return NextResponse.json({ error: 'Dati non validi' }, { status: 400 });
    }

    const transporter = getSmtpTransport();

    if (!transporter) {
      return NextResponse.json(
        { error: 'Configurazione email mancante sul server' },
        { status: 500 }
      );
    }

    const contactEmail = process.env.CONTACT_EMAIL || siteConfig.email;
    const from = process.env.SMTP_FROM || process.env.SMTP_USER || siteConfig.email;

    const metraturaText = payload.metratura?.trim() ? `${payload.metratura} mq` : 'Non indicata';
    const noteText = payload.note?.trim() || 'Nessuna';

    await transporter.sendMail({
      from,
      to: contactEmail,
      replyTo: payload.email,
      subject: `Nuova richiesta valutazione - ${payload.nome} ${payload.cognome}`,
      text: [
        'Nuova richiesta dalla pagina Valuta Casa',
        '',
        `Nome: ${payload.nome}`,
        `Cognome: ${payload.cognome}`,
        `Email: ${payload.email}`,
        `Telefono: ${payload.telefono}`,
        `Indirizzo immobile: ${payload.indirizzo}`,
        `Comune: ${payload.comune}`,
        `Tipologia: ${payload.tipologia}`,
        `Stato immobile: ${payload.statoImmobile}`,
        `Metratura: ${metraturaText}`,
        `Tempistiche: ${payload.tempistiche}`,
        `Note: ${noteText}`,
      ].join('\n'),
    });

    await transporter.sendMail({
      from,
      to: payload.email,
      subject: 'Richiesta valutazione ricevuta',
      text: [
        `Ciao ${payload.nome},`,
        '',
        'grazie per aver richiesto una valutazione del tuo immobile.',
        'Abbiamo ricevuto correttamente i tuoi dati e ti contatteremo subito per i prossimi passi.',
        '',
        `Team ${siteConfig.name}`,
      ].join('\n'),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Errore invio richiesta valutazione:', error);
    return NextResponse.json({ error: 'Errore interno del server' }, { status: 500 });
  }
}
