/**
 * Format numbers using Indian numbering system (en-IN) and Indian Rupee (INR)
 */
export const formatINR = (value: number, showDecimals: boolean = true): string => {
  if (isNaN(value)) return '₹0.00'
  
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0,
  }).format(value)
}

/**
 * Format plain number in Indian Numbering System (e.g. 1,00,000.50)
 */
export const formatIndianNumber = (value: number, showDecimals: boolean = true): string => {
  if (isNaN(value)) return '0'
  
  return new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0,
  }).format(value)
}

/**
 * Convert number to words in the Indian Numbering System (Lakhs, Crores, Thousands)
 */
export const numberToIndianWords = (amount: number): string => {
  if (isNaN(amount) || amount === 0) return 'Zero Rupees'
  if (amount < 0) return 'Negative amount'
  if (amount > 9999999999) return 'Value exceeds displayable limit'

  const ones = [
    '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
    'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
    'Seventeen', 'Eighteen', 'Nineteen'
  ]
  const tens = [
    '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'
  ]

  const convertLessThanOneThousand = (n: number): string => {
    let current = ''
    if (n >= 100) {
      current += ones[Math.floor(n / 100)] + ' Hundred '
      n %= 100
    }
    if (n >= 20) {
      current += tens[Math.floor(n / 10)] + ' '
      n %= 10
    }
    if (n > 0) {
      current += ones[n] + ' '
    }
    return current.trim()
  }

  const integerPart = Math.floor(amount)
  const decimalPart = Math.round((amount - integerPart) * 100)

  let result = ''
  let num = integerPart

  const crore = Math.floor(num / 10000000)
  num %= 10000000

  const lakh = Math.floor(num / 100000)
  num %= 100000

  const thousand = Math.floor(num / 1000)
  num %= 1000

  const remainder = num

  if (crore > 0) {
    result += convertLessThanOneThousand(crore) + ' Crore '
  }
  if (lakh > 0) {
    result += convertLessThanOneThousand(lakh) + ' Lakh '
  }
  if (thousand > 0) {
    result += convertLessThanOneThousand(thousand) + ' Thousand '
  }
  if (remainder > 0) {
    result += convertLessThanOneThousand(remainder) + ' '
  }

  result = result.trim()
  if (!result) result = 'Zero'
  result += ' Rupees'

  if (decimalPart > 0) {
    result += ` and ${convertLessThanOneThousand(decimalPart)} Paise`
  }

  return result.replace(/\s+/g, ' ').trim()
}
