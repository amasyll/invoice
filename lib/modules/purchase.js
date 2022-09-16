/***
 * @Copyrigtht: Banna Group 2022
 * @Created: Fri Sep 09 2022 17:29:42 GMT-1200 (UTC−12:00)
 * @Author: Amadou Sylla <Ahmadnourding@gmail.com>
 * @Lisence: MIT
 */
const calculator = require("vat-rate-calculator")
/**
 * Constents
 */
const __ZERO__ = 0
const __BANK__ = '52'
const __PROVIDER__ = '401'
const __CASH_REGISt__ = '57'
const __DISCOUNTS__OBTAINUED__ = '773'
const __VAT_INVOICED__ = '443'

function reductionAmount(originAmount, reductionRate) {
  const reductionAmount = (originAmount * (reductionRate / 100))
  return reductionAmount
}

function priceAfterReduction(originAmount, reductionRate) {
  const priceAfterReduction =
    (originAmount - reductionAmount(originAmount, reductionRate))
  return priceAfterReduction
}

function isString(x) {
  return (x.constructor === String) ? true : false
}

function toNumber(x) {
  if (typeof x == "number") return x
  if (typeof x == "string") {
    var xParsed = parseInt(x, 10)
    if (isNaN(xParsed)) {
      throw new TypeError("This argument must be a number")
    }
    return xParsed
  }
}

function isNumber(x) {
  return (x.constructor === Number) ? true : false
}

exports.purchaseOnCash = function(_dates, _codes, _amount, _ref, _reductRate, _vatRate = 0, _array = [_dates, _codes, _amount, _ref, _reductRate]) {
  let sales = []
  sales[0] = {
    date: _array[0],
    comments: `Suivant la facture N°${_array[3]}`
  }
  switch (_vatRate) {
    case __ZERO__:
      if (_reductRate == __ZERO__) {
        sales[1] = {
          code: __CASH_REGISt__,
          credit: _array[2]
        }
        sales[2] = {
          code: _array[1],
          debit: _array[2]
        }
      } else if (_reductRate > __ZERO__) {
        sales[1] = {
          code: __CASH_REGISt__,
          credit: priceAfterReduction(_array[2], _array[4])
        }
        sales[2] = {
          code: _array[1],
          debit: _array[2]
        }
        sales[3] = {
          code: __DISCOUNTS__OBTAINUED__,
          credit: reductionAmount(_array[2], _array[4])
        }
      }
      break
    default:
      if (_reductRate == __ZERO__) {
        sales[1] = {
          code: __CASH_REGISt__,
          credit: calculator('ATI', _array[2], _vatRate)
        }
        sales[2] = {
          code: __VAT_INVOICED__,
          debit: calculator('VAT', _array[2], _vatRate)
        }
        sales[3] = {
          code: _array[1],
          debit: _array[2]
        }
      } else if (_reductRate > __ZERO__) {
        sales[1] = {
          code: __CASH_REGISt__,
          credit: calculator('ATI', priceAfterReduction(_array[2], _array[4]), _vatRate)
        }
        sales[2] = {
          code: __VAT_INVOICED__,
          debit: calculator('VAT', priceAfterReduction(_array[2], _array[4]), _vatRate)
        }
        sales[3] = {
          code: _array[1],
          debit: _array[2]
        }
        sales[4] = {
          code: __DISCOUNTS__OBTAINUED__,
          credit: reductionAmount(_array[2], _array[4])
        }
      }
  }
  return sales
}

exports.purchaseOnCredit = function(_dates, _codes, _amount, _ref, _reductRate, _vatRate = 0, _array = [_dates, _codes, _amount, _ref, _reductRate]) {
  let sales = []
  sales[0] = {
    date: _array[0],
    comments: `Suivant la facture N°${_array[3]}`
  }
  switch (_vatRate) {
    case __ZERO__:
      if (_reductRate == __ZERO__) {
        sales[1] = {
          code: __PROVIDER__,
          credit: _array[2]
        }
        sales[2] = {
          code: _array[1],
          debit: _array[2]
        }
      } else if (_reductRate > __ZERO__) {
        sales[1] = {
          code: __PROVIDER__,
          credit: priceAfterReduction(_array[2], _array[4])
        }
        sales[2] = {
          code: _array[1],
          debit: _array[2]
        }
        sales[3] = {
          code: __DISCOUNTS__OBTAINUED__,
          credit: reductionAmount(_array[2], _array[4])
        }
      }
      break
    default:
      if (_reductRate == __ZERO__) {
        sales[1] = {
          code: __PROVIDER__,
          credit: calculator('ATI', _array[2], _vatRate)
        }
        sales[2] = {
          code: __VAT_INVOICED__,
          debit: calculator('VAT', _array[2], _vatRate)
        }
        sales[3] = {
          code: _array[1],
          debit: _array[2]
        }
      } else if (_reductRate > __ZERO__) {
        sales[1] = {
          code: __PROVIDER__,
          credit: calculator('ATI', priceAfterReduction(_array[2], _array[4]), _vatRate)
        }
        sales[2] = {
          code: __VAT_INVOICED__,
          debit: calculator('VAT', priceAfterReduction(_array[2], _array[4]), _vatRate)
        }
        sales[3] = {
          code: _array[1],
          debit: _array[2]
        }
        sales[4] = {
          code: __DISCOUNTS__OBTAINUED__,
          credit: reductionAmount(_array[2], _array[4])
        }
      }
  }
  return sales
}

exports.purchaseOnBank = function(_dates, _codes, _amount, _ref, _reductRate, _vatRate = 0, _array = [_dates, _codes, _amount, _ref, _reductRate]) {
  let sales = []
  sales[0] = {
    date: _array[0],
    comments: `Suivant la facture N°${_array[3]}`
  }
  switch (_vatRate) {
    case __ZERO__:
      if (_reductRate == __ZERO__) {
        sales[1] = {
          code: __BANK__,
          credit: _array[2]
        }
        sales[2] = {
          code: _array[1],
          debit: _array[2]
        }
      } else if (_reductRate > __ZERO__) {
        sales[1] = {
          code: __BANK__,
          credit: priceAfterReduction(_array[2], _array[4])
        }
        sales[2] = {
          code: _array[1],
          debit: _array[2]
        }
        sales[3] = {
          code: __DISCOUNTS__OBTAINUED__,
          credit: reductionAmount(_array[2], _array[4])
        }
      }
      break
    default:
      if (_reductRate == __ZERO__) {
        sales[1] = {
          code: __BANK__,
          credit: calculator('ATI', _array[2], _vatRate)
        }
        sales[2] = {
          code: __VAT_INVOICED__,
          debit: calculator('VAT', _array[2], _vatRate)
        }
        sales[3] = {
          code: _array[1],
          debit: _array[2]
        }
      } else if (_reductRate > __ZERO__) {
        sales[1] = {
          code: __BANK__,
          credit: calculator('ATI', priceAfterReduction(_array[2], _array[4]), _vatRate)
        }
        sales[2] = {
          code: __VAT_INVOICED__,
          debit: calculator('VAT', priceAfterReduction(_array[2], _array[4]), _vatRate)
        }
        sales[3] = {
          code: _array[1],
          debit: _array[2]
        }
        sales[4] = {
          code: __DISCOUNTS__OBTAINUED__,
          credit: reductionAmount(_array[2], _array[4])
        }
      }
  }
  return sales
}