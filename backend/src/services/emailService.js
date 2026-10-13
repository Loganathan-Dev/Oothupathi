import nodemailer from 'nodemailer'
import env from '../../config/env.js'

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      secure: env.SMTP_PORT === 465,
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
      },
    })
  }

  async sendEmail(to, subject, html, from = env.SMTP_USER) {
    try {
      const mailOptions = {
        from,
        to,
        subject,
        html,
      }

      const info = await this.transporter.sendMail(mailOptions)
      console.log(`Email sent: ${info.messageId}`)
      return info
    } catch (error) {
      console.error('Email sending error:', error)
      throw error
    }
  }

  async sendWelcomeEmail(email, name) {
    const subject = 'Welcome to Oothupathi!'
    const html = `
      <h1>Welcome to Oothupathi!</h1>
      <p>Dear ${name},</p>
      <p>Thank you for registering with Oothupathi. We're excited to have you on board!</p>
      <p>You can now explore our products and services.</p>
      <p>Best regards,<br>Oothupathi Team</p>
    `
    return this.sendEmail(email, subject, html)
  }

  async sendPasswordResetEmail(email, token) {
    const resetLink = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password/${token}`
    const subject = 'Reset Your Password - Oothupathi'
    const html = `
      <h1>Reset Your Password</h1>
      <p>You requested a password reset for your Oothupathi account.</p>
      <p>Click the link below to reset your password:</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>This link will expire in 1 hour.</p>
      <p>If you didn't request this, please ignore this email.</p>
      <p>Best regards,<br>Oothupathi Team</p>
    `
    return this.sendEmail(email, subject, html)
  }

  async sendEnquiryConfirmation(email, name, enquiryId) {
    const subject = 'Enquiry Received - Oothupathi'
    const html = `
      <h1>Enquiry Received</h1>
      <p>Dear ${name},</p>
      <p>Thank you for your enquiry. We have received it and will get back to you shortly.</p>
      <p>Your enquiry ID: ${enquiryId}</p>
      <p>Best regards,<br>Oothupathi Team</p>
    `
    return this.sendEmail(email, subject, html)
  }

  async sendQuoteEmail(email, name, quoteNumber, total) {
    const subject = `Quote #${quoteNumber} - Oothupathi`
    const html = `
      <h1>Quote Generated</h1>
      <p>Dear ${name},</p>
      <p>Your quote #${quoteNumber} has been generated.</p>
      <p>Total Amount: ${total}</p>
      <p>Please log in to your account to view the full details.</p>
      <p>Best regards,<br>Oothupathi Team</p>
    `
    return this.sendEmail(email, subject, html)
  }

  async sendApplicationConfirmation(email, name, jobTitle) {
    const subject = 'Application Received - Oothupathi'
    const html = `
      <h1>Application Received</h1>
      <p>Dear ${name},</p>
      <p>Thank you for applying for the position of ${jobTitle} at Oothupathi.</p>
      <p>We will review your application and get back to you shortly.</p>
      <p>Best regards,<br>Oothupathi Team</p>
    `
    return this.sendEmail(email, subject, html)
  }

  async sendOrderConfirmation(email, name, orderNumber, total) {
    const subject = `Order #${orderNumber} Confirmation - Oothupathi`
    const html = `
      <h1>Order Confirmation</h1>
      <p>Dear ${name},</p>
      <p>Your order #${orderNumber} has been confirmed.</p>
      <p>Total Amount: ${total}</p>
      <p>We will notify you when your order is shipped.</p>
      <p>Best regards,<br>Oothupathi Team</p>
    `
    return this.sendEmail(email, subject, html)
  }

  async sendOrderStatusUpdate(email, name, orderNumber, status) {
    const subject = `Order #${orderNumber} Status Update - Oothupathi`
    const html = `
      <h1>Order Status Update</h1>
      <p>Dear ${name},</p>
      <p>Your order #${orderNumber} status has been updated to: ${status}</p>
      <p>Best regards,<br>Oothupathi Team</p>
    `
    return this.sendEmail(email, subject, html)
  }
}

export default new EmailService()