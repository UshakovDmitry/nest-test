setDataOrder(data: any) {
  const SKUs = data.ArrayStrings.map(item => item.SKU);
  
  return {
    numberPPO: data.NuberPPO,
    loanAgreementStatus: data.LoanAgreementStatus,
    SKUs: SKUs
  };
}
