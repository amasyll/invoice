/***
 * @Copyrigtht: Banna Group 2022
 * @Created: Fri Sep 09 2022 17:29:42 GMT-1200 (UTC−12:00)
 * @Author: Amadou Sylla <Ahmadnourding@gmail.com>
 * @Lisence: MIT
 */
const chart_of_accounts = require("chart-of-accounts")

exports.paymentClients = function(_mothodes) {
  let __TYPES__ = _mothodes.toLowerCase()
  let payment_methode
  switch (__TYPES__) {
    case 'vouchers':
    case 'voucher':
    case 'checks':
    case 'check':
      payment_methode = "513"
      break
    case 'transfers':
    case 'transfer':
    case 'payments':
    case 'payment':
      payment_methode = "52"
      break
    case 'credit':
    case 'loan':
      payment_methode = "411"
      break
    case 'cash':
      payment_methode = "57"
      break
    case 'credit card':
      payment_methode = "515"
      break
    default:
      throw new SyntaxError(`"${__TYPES__}": is not a suported payment methode`)
  }
  return payment_methode
}

exports.vatAndTaxs = function(__codes__) {
  let vat
  if (__codes__ == '70') {
    vat = '443'
  } else if (__codes__ == '701') {
    vat = '4431'
  } else if (__codes__ == '60') {
    vat = '445'
  } else if (__codes__ == '601') {
    vat = '4452'
  }
  return vat
}

exports.paymentProvider = function(_mothodes) {
  let __TYPES__ = _mothodes.toLowerCase()
  let payment_methode
  switch (__TYPES__) {
    case 'vouchers':
    case 'voucher':
    case 'checks':
    case 'check':
      payment_methode = "513"
      break
    case 'transfers':
    case 'transfer':
    case 'payments':
    case 'payment':
      payment_methode = "52"
      break
    case 'credit':
    case 'loan':
      payment_methode = "401"
      break
    case 'cash':
      payment_methode = "57"
      break
    case 'credit card':
      payment_methode = "515"
      break
    default:
      throw new SyntaxError(`"${__TYPES__}": is not a suported payment methode`)
  }
  return payment_methode
}
