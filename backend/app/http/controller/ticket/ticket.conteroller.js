const createHttpError = require("http-errors");
const TicketModel = require("../../models/ticket/ticket.model");
const {
  createTicket,
  setAnswer,
  getAnswer,
} = require("../../validation/ticket/ticket.validation");
const { StatusCodes: HttpStatus } = require("http-status-codes");

class Ticket {
  async createTicket(req, res, next) {
    try {
      const user = req.user;
      const validation = await createTicket.validateAsync(req.body);
      const { departmentID, departmentSubID, title, priority, body, product } =
        validation;
      const ticket = await TicketModel.create({
        departmentID,
        departmentSubID,
        title,
        priority,
        body,
        product,
        user: user._id,
        answer: 0,
        isAnswer: 0,
      });
      const mainTicket = await TicketModel.findOne({ _id: ticket._id })
        .populate({ path: "departmentID", select: { __v: 0 } })
        .populate({ path: "departmentSubID", select: { __v: 0 } })
        .populate({
          path: "user",
          select: {
            first_name: 1,
            last_name: 1,
            username: 1,
            email: 1,
            mobile: 1,
          },
        });
      if (!ticket)
        throw createHttpError.InternalServerError("تیکت مورد نظر ایجاد نشد");
      return res.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        data: {
          message: "تیکت مورد نظر با موفقیت ایجاد شد",
          mainTicket,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async listOfTicket(req, res, next) {
    try {
      const tickets = await TicketModel.find({ isAnswer: 0 })
        .populate([
          {
            path: "user",
            select: {
              first_name: 1,
              last_name: 1,
              username: 1,
              email: 1,
              mobile: 1,
            },
          },
          {
            path: "product",
          },
          {
            path: "departmentID",
            select: { __v: 0 },
          },
          { path: "departmentSubID", select: { __v: 0 } },
        ])
        .lean();
      if (!tickets) throw createHttpError.NotFound("تیکتی موجود نیست");

      let ticketArr = [];

      tickets.forEach((ticket) => {
        if (ticket.isAnswer === 0) {
          ticketArr.push({
            ...ticket,
            departmentID: ticket.departmentID.title,
            departmentSubID: ticket.departmentSubID.title,
            user: ticket.user.first_name,
            product: ticket.product ? ticket.product.title : null,
          });
        }
      });
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: {
          message: "تمامی تیکت های موجود بازگردانی شدند",
          ticketArr,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async userTickets(req, res, next) {
    try {
      const user = req.user;
      const tickets = await TicketModel.find({ user: user._id })
        .sort({ _id: -1 })
        .populate("departmentID")
        .populate("departmentSubID")
        .populate("user")
        .lean();

      if (!tickets) throw createHttpError.NotFound("تیکتی موجود نیست");
      let ticketArr = [];

      tickets.forEach((ticket) => {
        if (ticket.isAnswer === 0) {
          ticketArr.push({
            ...ticket,
            departmentID: ticket.departmentID.title,
            departmentSubID: ticket.departmentSubID.title,
            user: ticket.user.first_name,
          });
        }
      });
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: {
          message: "تمامی تیکت های موجود برای شما بازگردانی شدند",
          ticketArr,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async setAnswer(req, res, next) {
    try {
      const user = req.user;
      const validation = await setAnswer.validateAsync(req.body);
      const { body, ticketID } = validation;
      const ticket = await TicketModel.findOne({ _id: ticketID }).lean();
      if (!ticket) throw createHttpError.NotFound("تیکت موجود نیست");
      const answer = await TicketModel.create({
        title: ticket.title,
        body,
        parent: ticketID,
        priority: ticket.priority,
        user: user._id,
        isAnswer: 1,
        answer: 0,
        departmentID: ticket.departmentID,
        departmentSubID: ticket.departmentSubID,
      });
      await TicketModel.findOneAndUpdate({ _id: ticket._id }, { answer: 1 });
      return res.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        data: {
          message: "پاسخ برای تیکت مورد نظر ارسال شد",
          answer,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async getAnswer(req, res, next) {
    try {
      const validation = await getAnswer.validateAsync(req.params);
      const { id } = validation;
      const answerTicket = await TicketModel.findOne({ parent: id });
      const ticket = await TicketModel.findOne({ _id: id });
      if (!answerTicket || !ticket)
        throw createHttpError.NotFound("آیدی تیکت مجدد چک شود");
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: {
          message: "جواب تیکت با موفقیت بازگردانی شد",
          ticket: ticket.body,
          answer: answerTicket ? answerTicket.body : null,
        },
      });
    } catch (err) {
      next(err);
    }
  }

 
}

const TicketController = new Ticket();

module.exports = TicketController;
