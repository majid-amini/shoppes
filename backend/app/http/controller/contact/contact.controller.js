const createHttpError = require("http-errors");
const ContactModel = require("../../models/contact/contact.model");
const {
  CreateContactValidation,
  RemoveValidation,
  AnswerValidation,
} = require("../../validation/contact/contact.validation");
const { StatusCodes: HttpStatus } = require("http-status-codes");
const nodemailer = require("nodemailer");

class Contact {
  async createContact(req, res, next) {
    try {
      const validation = await CreateContactValidation.validateAsync(req.body);
      const { name, email, phone, body } = validation;
      const contact = await ContactModel.create({
        name,
        email,
        phone,
        body,
        answer: false,
      });
      if (!contact)
        throw createHttpError.InternalServerError("ارتباط با موفقیت ایجاد نشد");
      return res.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        data: {
          message: "ارتباط با موفقیت ایجاد شد",
          contact,
        },
      });
    } catch (err) {
      next(err);
    }
  }
  async getAllContact(req, res, next) {
    try {
      const contacts = await ContactModel.find({});
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: {
          message: "تمامی ارتباطات موجود با موفقیت بازگردانی شدند",
          contacts,
        },
      });
    } catch (err) {
      next(err);
    }
  }
  async removeContact(req, res, next) {
    try {
      const validation = await RemoveValidation.validateAsync(req.params);
      const { id } = validation;
      const removeResult = await ContactModel.findOneAndRemove({ _id: id });
      if (!removeResult)
        throw createHttpError.NotFound("ارتباط مورد نظر یافت نشد");
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: {
          message: "ارتباط مورد نظر با موفقیت حذف شد",
        },
      });
    } catch (err) {
      next(err);
    }
  }
  async answerContact(req, res, next) {
    try {
      const validation = await AnswerValidation.validateAsync(req.body);
      const { answer, email } = validation;
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "www.dariushkhazaei629@gmail.com",
          pass: "xgcm jrbi haww bcxu",
        },
      });
      const mailOptions = {
        from: "www.dariushkhazaei629@gamil.com",
        to: email,
        subject: "پاسخ ایمیل شما از طرف سایت فلان",
        text: answer,
      };
      const contact = await ContactModel.findOneAndUpdate(
        { email: email },
        { answer: true }
      );
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            data: {
              message: error,
            },
          });
        } else {
          res.status(HttpStatus.OK).json({
            statusCode: HttpStatus.OK,
            data: {
              message: "پاسخ ایمیل با موفقیت ارسال شد",
              contact,
            },
          });
        }
      });
    } catch (err) {
      next(err);
    }
  }
}

const ContactController = new Contact();
module.exports = ContactController;
