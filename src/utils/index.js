export const convertISOStringToLocaleDateString = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB"); // dd/mm/yyyy
};

export const convertISOStringToLocaleTimeString = (dateStr)=>{
  const date = new Date(dateStr)
  return date.toLocaleTimeString("it-IT")
}

export const currencyFormatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  maximumFractionDigits: 0,

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});
