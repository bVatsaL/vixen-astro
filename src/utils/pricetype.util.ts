export const getPriceType = ({ paymentType, carDetails, type }: any) => {
  let value = '';
  if (paymentType === 'bi-weekly*') {
    value = carDetails?.[type]?.applied?.[0]?.biWeeklyPayment ?? '';
  }
  if (paymentType === 'per week*') {
    value = carDetails?.[type]?.applied?.[0]?.weeklyPayment ?? '';
  }
  if (paymentType === 'per month*') {
    value = carDetails?.[type]?.applied?.[0]?.monthlyPayment ?? '';
  }
  const apr = carDetails?.[type]?.applied?.[0]?.apr ?? '';
  const length = carDetails?.[type]?.applied?.[0]?.length ?? '';
  const downPayment = carDetails?.[type]?.applied?.[0]?.downPayment ?? '';
  const description = carDetails?.[type]?.applied?.[0]?.disclaimer ?? '';
  return { value, apr, length, downPayment, description };
};

const buildTaxesText = (arr: any) => {
  const l = arr?.length;
  let txt = '';
  if (l) {
    txt = '+ ';
    arr.forEach((tax: any, i: any) => {
      const disclaimer = tax?.disclaimer ? `(${tax?.disclaimer})` : '';
      if (tax?.value) {
        txt += `$${tax?.value?.toLocaleString()} ${tax?.description} ${disclaimer}`;
        if (i + 1 < l) {
          txt += ' + ';
        }
      }
    });
  }
  return txt;
};

const buildFeesText = (arr: any) => {
  const l = arr.length;
  let txt = '';
  if (l) {
    txt = '+ ';
    arr.forEach((fee: any, i: any) => {
      const disclaimer = fee?.disclaimer ? `(${fee?.disclaimer})` : '';
      if (fee.value) {
        txt += `$${fee?.value} ${fee?.description} ${disclaimer}`;
        if (i + 1 < l) {
          txt += ' + ';
        }
      }
    });
  }
  return txt;
};

// const buildConsumerCashText = (consumerCash: any) => {
//   let txt = '';
//   const l = consumerCash?.length;
//   const joiner = { en: 'with', es: 'con' };
//   consumerCash.forEach((i: any) => {
//     if (i?.value !== '0' && i?.value !== undefined) {
//       const end = i === l - 1 ? '.' : ', ';
//       txt += `${joiner?.['en']} ${i?.description} $${i?.value?.toLocaleString?.()} ${end}`;
//     }
//   });
//   return txt;
// };

export const generateFinanceDisclaimer = (financeIncentive: any) => {
  if (!financeIncentive) {
    return '';
  }
  return `${
    financeIncentive?.apr
  }% APR Financing with $${financeIncentive.downPayment?.toLocaleString?.()} down for well qualified buyers on approved credit by  ${
    financeIncentive?.financialInstitution
  }. 
  Maximum term financing is ${financeIncentive?.length} months.
  ${financeIncentive.apr !== 0 ? `$${financeIncentive?.costPer1000} per $1,000.00 borrowed.` : ''}
  ${
    !!financeIncentive?.taxes?.length || !!financeIncentive?.fees?.length
      ? `<span>
  Based on Price of $${financeIncentive?.salesPrice?.toLocaleString?.()} ${buildTaxesText(
          financeIncentive?.taxes,
        )} ${buildFeesText(financeIncentive?.fees)} for a total of $${financeIncentive?.salesPriceIncludingFees}`
      : ''
  }
  ${financeIncentive?.expiry ? `Offer Expires: ${financeIncentive.expiry}.` : ''}`;
};

// to be shown for GMCA Sites
// <span> Based on Price of $${financeIncentive?.financedAmount} ${buildConsumerCashText(financeIncentive?.consumerCash)}
//   Total cost of credits: $'${((msrp ?? 0 - financeIncentive?.totalConsumerCash) / 1000) * financeIncentive?.costPer1000} </span>
