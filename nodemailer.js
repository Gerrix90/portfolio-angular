const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
dotenv.load()

const email = process.env.USER_EMAIL
const pw = process.env.USER_EMAIL_PASSWORD

let transport = {
  host: 'smtp.gmail.com',
  service: 'gmail',
  port: 25,
  auth: {
    user: email,
    pass: pw
  }
}

let transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
  if (error) {
    console.log(error)
  } else {
    console.log('Server is ready to take messages')
  }
})

router.post('/send', (req, res, next) => {
  const name = req.body.name
  const email = req.body.email
  const message = req.body.message
  const content = `name: ${name} \n email: ${email} \n message: ${message}`

  const mail = {
    from: name,
    to: 'firzhugh@gmail.com',
    subject: 'Mail from Portfolio',
    text: content
  }

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        msg: err.message
      })
    } else {
      res.json({
        msg: 'success'
      })
    }
  })
})

module.exports = router
