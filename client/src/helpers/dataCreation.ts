
export const getNPreviousDates = (n: number=0) => {
  var date = new Date();
  const res: Date[] = [date];
  for(let i=0;i<n;i++){
    date.setDate(date.getDate()-1);
    let copiedDate = new Date(date.getTime());
    res.push(copiedDate)
  }
  // dateObj.setDate(dateObj.getDate()-1);
  return res
};
export const createFileNames = (name:string,n:number) =>{
  const res:string[] = []
  const dates = getNPreviousDates(n)
  const dateStrings = formatedDatseFromDates(dates)
  dateStrings.forEach(dateString=>{
    res.push(`${dateString}-${name}.jpg`)
  })
  return res
}
export const formatedDateFromDate = (d: Date) => {
  return `${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`;
};
export const formatedDatseFromDates = (dates: Date[]) => {
// gets list of dates from previous  days

  const arr: string[] = [];
  dates.forEach((date) => {
    arr.push(formatedDateFromDate(date));
  });
  return arr;
};
