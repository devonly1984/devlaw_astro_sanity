export { cn } from "cn"
export const formatPrice = (price: number) => {
    return price.toLocaleString('en-US',{
        style:"currency",
        currency:"USD",
        minimumFractionDigits:0,
        maximumFractionDigits: 0
    })
};
export const getNumberofDays=(startDate:Date|undefined, endDate:Date|undefined)=>{
   if (!startDate || !endDate) return;
   const startDateTime = new Date(startDate).getTime();
   const endDateTime = new Date(endDate).getTime();
   const timeDifference = endDateTime - startDateTime;
  const daysDifference = timeDifference / (1000 * 3600 * 24);
  return Math.ceil(daysDifference)
 }