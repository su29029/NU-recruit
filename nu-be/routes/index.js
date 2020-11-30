var express = require('express');
var multer = require('multer');
var upload = multer({});
var nodemailer = require('nodemailer');
var router = express.Router();

/* GET home page. */
router.post('/submit', upload.single('file'), async function(req, res, next) {
  // console.log(req.file);
  // console.log(req.body);
  let testAccount = await nodemailer.createTestAccount();
  let transporter = nodemailer.createTransport({
    service: 'qq',
    port: 465,
    secureConnection: true,
    auth: {
      user: "2261501994@qq.com",
      pass: "farvdjaqjfghdjcb",
    },
  });
  let submitInformation = JSON.parse(req.body.stat); // name studentID email field
  let informationHTML = ""; 
  informationHTML += "<p>姓名：" + submitInformation["name"] + "\r\n";
  informationHTML += "<p>学号：" + submitInformation["studentID"] + "\r\n";
  informationHTML += "<p>邮箱：" + submitInformation["email"] + "\r\n";
  informationHTML += "<p>方向：" + submitInformation["field"] + "\r\n";
  let mailOptions = {
    from: '2261501994@qq.com',
    to: submitInformation.email,
    subject: 'test-mail',
    html: '<h4>你的报名信息已提交成功！</h4>\r\n<p>你的报名信息如下：</p>\r\n' + informationHTML,
    attachments: [
      {
        filename: req.file.originalname,
        content: req.file.buffer
      }
    ]
  };

  transporter.sendMail(mailOptions, ( err, info ) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Message sent: %s', info.messageId);
    }
  })
  res.send("success");
});

module.exports = router;
