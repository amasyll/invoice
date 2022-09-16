/***
 * @Copyrigtht: Banna Group 2022
 * @Created: Fri Sep 09 2022 17:29:42 GMT-1200 (UTC−12:00)
 * @Author: Amadou Sylla <Ahmadnourding@gmail.com>
 * @Lisence: MIT
 */

/**
 * Dependencies
 */
const {
  salesOnCash,
  salesOnCredit,
  salesOnBank
} = require("./modules/sales.js")
const {
  purchaseOnCash,
  purchaseOnCredit,
  purchaseOnBank
} = require("./modules/purchase.js")
/**
 * Module
 */
module.exports = invoice

function typeError(__ErrorMessages__) {
  throw new TypeError(`${__ErrorMessages__}`)
}

function syntaxError(__ErrorMessages__) {
  throw new SyntaxError(`${__ErrorMessages__}`)
}

function isString(x) {
  return (x.constructor === String) ? true : false
}

function toNumber(x) {
  if (typeof x == "number") return x
  if (typeof x == "string") {
    var xParsed = parseInt(x, 10)
    if (isNaN(xParsed)) {
      throw new Error("This argument must be a number")
    }
    return Number(xParsed)
  }
}

function isDdMmYyyy(date) {
  return /^\d{2}\/\d{2}\/\d{4}$/.test(date)
}

/***
 * -------------------------------------------------
 *         Types          |   Names         |Require| 
 * -----------------------|-----------------|-------| 
 * @param1 {String}       | __typeOfInvoice |   true|
 * @param2 {String}       | __paymntMethod  |   true|
 * @param3 {Object|Array} | __ob__          |   true|
 * @param4 {Number}       | __vatRate       |  false|
 * --------------------------------------------------
 * @returns
 * @public 
 */
function invoice(__typeOfInvoice, __paymntMethod, __ob__, __vatRate) {
  /*______________________Function header start_____________________________*/
  try {
    this.__typeOfInvoice__ = isString(__typeOfInvoice) ? __typeOfInvoice : typeError("The invoice type must a string")
    this.__paymntMethod__ = isString(__paymntMethod) ? __paymntMethod : typeError("The paymnt method must a string")
    this.__vatRate__ = (toNumber(__vatRate) || 0)
    switch (__ob__.constructor) {
      case Object:
        this.__dates__ = isDdMmYyyy(__ob__.date) ? __ob__.date : syntaxError("The date must be in this forma \"DD/MM/YYYY\"")
        this.__codes__ = isString(__ob__.code) ? __ob__.codes : typeError("The code must be a string")
        this.__amount__ = toNumber(__ob__.amount)
        this.__ref__ = isString(__ob__.ref) ? __ob__.ref : typeError("The ref must be a string")
        this.__reductRate__ = (toNumber(__ob__.reduc) || 0)
        break
      case Array:
        this.__dates__ = isDdMmYyyy(__ob__[0]) ? __ob__[0] : syntaxError("The date must be in this forma \"DD/MM/YYYY\"")
        this.__codes__ = isString(__ob__[1]) ? __ob__[1] : typeError("The code must be a string")
        this.__amount__ = toNumber(__ob__[2])
        this.__ref__ = isString(__ob__[3]) ? __ob__[3] : typeError("The ref must be a string")
        this.__reductRate__ = (toNumber(__ob__[4]) || 0)
        break
      default:
        typeError(`The argument 3 must be an object or an array but a ${typeof __ob__} passed`)
    }
  } catch (error) {
    throw `${error.name}: ${error.message}`
  }
  /*______________________Function body return_____________________________*/
  var journal
  switch (this.__typeOfInvoice__) {
    case 'Sales':
      if (this.__paymntMethod__ == 'Cash') {
        journal = salesOnCash
      } else if (this.__paymntMethod__ == 'Credit') {
        journal = salesOnCredit
      } else if (this.__paymntMethod__ == 'Vouchers') {
        journal = salesOnBank
      }
      break
    case 'Purchase':
      if (this.__paymntMethod__ == 'Cash') {
        journal = purchaseOnCash
      } else if (this.__paymntMethod__ == 'Credit') {
        journal = purchaseOnCredit
      } else if (this.__paymntMethod__ == 'Vouchers') {
        journal = purchaseOnBank
      }
      break
    default:
      syntaxError(`${this.__typeOfInvoice__} is not an invoice type `)
  }
  if (typeof journal !== "function") {
    throw new SyntaxError(`${this.__paymntMethod__} is not a payment method `)
  }
  return JSON.stringify(journal(this.__dates__, this.__codes__, this.__amount__, this.__ref__, this.__reductRate__, this.__vatRate__))
}