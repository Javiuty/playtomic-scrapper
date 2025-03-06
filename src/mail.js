import { Resend } from 'resend'
import { html } from './templates.js'
import 'dotenv/config'

export async function sendEmail (datos) {
  const resend = new Resend(process.env.RESEND_API_KEY)

  const template = html(datos)

  const { data, error } = await resend.emails.send({
    from: 'Escubot <onboarding@resend.dev>',
    to: ['javiiescuadra@gmail.com'],
    subject: 'Partidos de padel disponibles',
    html: template
  })

  if (error) {
    return console.error({ error })
  }

  console.log('Email sent', data)
}
