/***
 * @Copyrigtht: Banna Group 2022
 * @Created: Fri Sep 09 2022 17:29:42 GMT-1200 (UTC−12:00)
 * @Author: Amadou Sylla <Ahmadnourding@gmail.com>
 * @Lisence: MIT
 */

/**
 *Modules dependencies
 */
const chart_of_accounts = require("./modules/chart-of-accounts/index")
const {
  vatAndTaxs,
  paymentClients,
  paymentProvider
} = require("./modules/payments")

/**
 * Create a that return the all included tax for a given
 * 
 * @param {string|number} _taxFree 
 * @param {string|number} _valueAddedTaxRate
 * @returns {number}
 * @private
 */
function allTaxIncluded(_taxFree, _valueAddedTaxRate) {

  if (typeof _taxFree === 'number' && typeof _valueAddedTaxRate === 'number') {
    return Number(_taxFree * (1 + _valueAddedTaxRate / 100))
  }

  if (typeof _taxFree !== 'string' && typeof _valueAddedTaxRate !== 'string') {
    throw new TypeError('The amount and tax rate must be a number or string')
  }

  var taxfree = parseInt(_taxFree, 10)
  var valuaddedtaxrate = parseInt(_valueAddedTaxRate, 10)

  if (!isNaN(taxfree) && !isNaN(valuaddedtaxrate)) {
    return Number(taxfree * (1 + valuaddedtaxrate / 100))
  }
  return Number(0)
}

/**
 * Create a that return the  tax free for a given
 * 
 * @param {string|number} _allTaxIncluded 
 * @param {string|number} _valueAddedTaxRate
 * @returns {number}
 * @private
 */
function taxFree(_allTaxIncluded, _valueAddedTaxRate) {

  if (typeof _allTaxIncluded === 'number' && typeof _valueAddedTaxRate === 'number') {
    return Number(_allTaxIncluded / (1 + _valueAddedTaxRate / 100))
  }

  if (typeof _allTaxIncluded !== 'string' && typeof _valueAddedTaxRate !== 'string') {
    throw new TypeError('The amount and tax rate must be a number or string')
  }

  var taxfree = parseInt(_allTaxIncluded, 10)
  var valuaddedtaxrate = parseInt(_valueAddedTaxRate, 10)

  if (!isNaN(taxfree) && !isNaN(valuaddedtaxrate)) {
    return Number(taxfree / (1 + valuaddedtaxrate / 100))
  }
  return Number(0)
}

/**
 * Create a function that return the value added tax for a given
 * 
 * @param {string|number} _taxFree 
 * @param {string|number} _valueAddedTaxRate
 * @returns {number}
 * @private
 */
function valueAddedTax(_taxFree, _valueAddedTaxRate) {

  if (typeof _taxFree === 'number' && typeof _valueAddedTaxRate === 'number') {
    return Number(_taxFree * (_valueAddedTaxRate / 100))
  }

  if (typeof _taxFree !== 'string' && typeof _valueAddedTaxRate !== 'string') {
    throw new TypeError('The amount and tax rate must be a number or string')
  }

  var taxfree = parseInt(_taxFree, 10)
  var valuaddedtaxrate = parseInt(_valueAddedTaxRate, 10)

  if (!isNaN(taxfree) && !isNaN(valuaddedtaxrate)) {
    return Number(taxfree * (valuaddedtaxrate / 100))
  }
  return Number(0)
}

function toNumber(x) {
  if (typeof x == "number") return Math.abs(x)
  if (typeof x == "string") {
    var xParsed = parseInt(x, 10)
    if (isNaN(xParsed)) {
      throw new Error("This argument must be a number")
    }
    return Math.abs(Number(xParsed))
  }
}

function isDdMmYyyy(date) {
  return /^\d{2}\/\d{2}\/\d{4}$/.test(date)
}

function reductionAmount(originAmount, reductionRate) {
  return (originAmount * (reductionRate / 100))
}

function priceAfterReduction(originAmount, reductionRate) {
  return (originAmount - (originAmount * (reductionRate / 100)))
}

function typeError(__ErrorMessages__) {
  throw new TypeError(`${__ErrorMessages__}`)
}

function syntaxError(__ErrorMessages__) {
  throw new SyntaxError(`${__ErrorMessages__}`)
}

function isString(x) {
  return (x.constructor === String) ? true : false
}

/***
 * -------------------------------------------------
 *         Types          |   Names         |Require| 
 * -----------------------|-----------------|-------| 
 * @param2 {String}       | __paymntMethod  |   true|
 * @param3 {Object|Array} | __ob__          |   true|
 * @param4 {Number}       | __vatRate       |  false|
 * --------------------------------------------------
 * @returns [Array] 
 * @Api public 
 */
function invoice(__paymntMethod, __ob__, __vatRate) {
  /*______________________Function header start_____________________________*/
  try {
    this.__paymntMethod__ = isString(__paymntMethod) ? __paymntMethod :
      typeError("The paymnt method must a string")
    this.__vatRate__ = (toNumber(__vatRate) || 0)
    switch (__ob__.constructor) {
      case Object:
        this.__dates__ = isDdMmYyyy(__ob__.date) ? __ob__.date :
          syntaxError("The date must be in this forma \"DD/MM/YYYY\"")
        this.__label__ = isString(__ob__.label) ? __ob__.codes :
          typeError("The label must be a string")
        this.__amount__ = toNumber(__ob__.amount)
        this.__ref__ = isString(__ob__.ref) ? __ob__.ref :
          typeError("The ref must be a string")
        this.__reductRate__ = (toNumber(__ob__.reduc) || 0)
        break
      case Array:
        this.__dates__ = isDdMmYyyy(__ob__[0]) ? __ob__[0] :
          syntaxError("The date must be in this forma \"DD/MM/YYYY\"")
        this.__label__ = isString(__ob__[1]) ? __ob__[1] :
          typeError("The label must be a string")
        this.__amount__ = toNumber(__ob__[2])
        this.__ref__ = isString(__ob__[3]) ? __ob__[3] :
          typeError("The folio must be a string")
        this.__reductRate__ = (toNumber(__ob__[4]) || 0)
        break
      default:
        typeError(`The argument 2 must be an object or an array but a ${typeof __ob__} passed`)
    }
  } catch (error) {
    throw `${error.name}: ${error.message}`
  }
  /*______________________Function body return_____________________________*/
  let __CODES__, journals = []
  if (chart_of_accounts(this.__label__).toString().length > 2) {
    __CODES__ = chart_of_accounts(this.__label__).toString().substring(0, 2)
  } else {
    __CODES__ = chart_of_accounts(this.__label__).toString()
  }
  journals[0] = {
    date: this.__dates__,
    comments: `Suivant la facture N°${this.__ref__}`
  }
  switch (__CODES__) {
    case '70':
      if (this.__vatRate__ == 0) {
        if (this.__reductRate__ == 0) {
          //sans tva ni reduc
          journals[1] = {
            codes: paymentClients(this.__paymntMethod__),
            debit: this.__amount__
          }
          journals[2] = {
            codes: chart_of_accounts(this.__label__),
            credit: this.__amount__
          }
        } else if (this.__reductRate__ > 0) {
          //sans tva avec reduc
          journals[1] = {
            codes: paymentClients(this.__paymntMethod__),
            debit: priceAfterReduction(this.__amount__, this.__reductRate__)
          }
          journals[2] = {
            codes: chart_of_accounts(this.__label__),
            credit: this.__amount__
          }
          journals[3] = {
            codes: chart_of_accounts("Escomptes accordés"),
            debit: reductionAmount(this.__amount__, this.__reductRate__)
          }
        }
      } else if (this.__vatRate__ > 0) {
        if (this.__reductRate__ == 0) {
          //avec tva sans reduc
          journals[1] = {
            codes: paymentClients(this.__paymntMethod__),
            debit: allTaxIncluded(this.__amount__, this.__vatRate__)
          }
          journals[2] = {
            codes: chart_of_accounts(this.__label__),
            credit: this.__amount__
          }
          journals[3] = {
            codes: vatAndTaxs(chart_of_accounts(this.__label__)),
            credit: valueAddedTax(this.__amount__, this.__vatRate__)
          }
        } else if (this.__reductRate__ > 0) {
          //avec tva et reduc
          journals[1] = {
            codes: paymentClients(this.__paymntMethod__),
            debit: allTaxIncluded(priceAfterReduction(this.__amount__, this.__reductRate__), this.__vatRate__)
          }
          journals[2] = {
            codes: chart_of_accounts(this.__label__),
            credit: this.__amount__
          }
          journals[3] = {
            codes: vatAndTaxs(chart_of_accounts(this.__label__)),
            credit: valueAddedTax(priceAfterReduction(this.__amount__, this.__reductRate__), this.__vatRate__)
          }
          journals[4] = {
            codes: chart_of_accounts("Escomptes accordés"),
            debit: reductionAmount(this.__amount__, this.__reductRate__)
          }
        }
      }
      break
    case '60':
      if (this.__vatRate__ == 0) {
        if (this.__reductRate__ == 0) {
          //sans tva ni reduc
          journals[1] = {
            codes: paymentClients(this.__paymntMethod__),
            credit: this.__amount__
          }
          journals[2] = {
            codes: chart_of_accounts(this.__label__),
            debit: this.__amount__
          }
        } else if (this.__reductRate__ > 0) {
          //sans tva avec reduc
          journals[1] = {
            codes: paymentClients(this.__paymntMethod__),
            credit: priceAfterReduction(this.__amount__, this.__reductRate__)
          }
          journals[2] = {
            codes: chart_of_accounts(this.__label__),
            debit: this.__amount__
          }
          journals[3] = {
            codes: chart_of_accounts("Escomptes obtenus"),
            credit: reductionAmount(this.__amount__, this.__reductRate__)
          }
        }
      } else if (this.__vatRate__ > 0) {
        if (this.__reductRate__ == 0) {
          //avec tva sans reduc
          journals[1] = {
            codes: paymentClients(this.__paymntMethod__),
            credit: allTaxIncluded(this.__amount__, this.__vatRate__)
          }
          journals[2] = {
            codes: chart_of_accounts(this.__label__),
            debit: this.__amount__
          }
          journals[3] = {
            codes: vatAndTaxs(chart_of_accounts(this.__label__)),
            debit: valueAddedTax(this.__amount__, this.__vatRate__)
          }
        } else if (this.__reductRate__ > 0) {
          //avec tva et reduc
          journals[1] = {
            codes: paymentClients(this.__paymntMethod__),
            credit: allTaxIncluded(priceAfterReduction(this.__amount__, this.__reductRate__), this.__vatRate__)
          }
          journals[2] = {
            codes: chart_of_accounts(this.__label__),
            debit: this.__amount__
          }
          journals[3] = {
            codes: vatAndTaxs(chart_of_accounts(this.__label__)),
            debit: valueAddedTax(priceAfterReduction(this.__amount__, this.__reductRate__), this.__vatRate__)
          }
          journals[4] = {
            codes: chart_of_accounts("Escomptes obtenus"),
            credit: reductionAmount(this.__amount__, this.__reductRate__)
          }
        }
      }
      break
    default:
      syntaxError(`"${this.__label__}": is not a suported operation`)
  }
  var object = [journals[0].date, journals[0].comments]
  for (let i = 1; i < journals.length; i++) {
    object.push({
      codes: (journals[i].codes),
      label: chart_of_accounts(journals[i].codes),
      credit: (journals[i].credit || 0),
      debit: (journals[i].debit || 0)
    })
  }
  return object
}

module.exports = invoice