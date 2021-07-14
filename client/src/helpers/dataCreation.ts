
export const getNPreviousDates = (n: number=0,passedDate:Date= new Date()) => {
  // makes function pure
  const copy = new Date(passedDate)
  const res: Date[] = [new Date(copy)];
  for(let i=0;i<n;i++){
    copy.setDate(copy.getDate()-1);
    console.log(passedDate,copy,"XD")
    res.push(new Date(copy))
  }
  // dateObj.setDate(dateObj.getDate()-1);
    return res
};
export const createFileNames = (name:string,n:number,passedDate:Date=new Date()) =>{
  const res:string[] = []
  const dates = getNPreviousDates(n,passedDate)
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
export const dateToDayAndMonth = (d:Date) =>{
  return `${d.getDate()}-${d.getMonth()}`;
}
export const formatedMonth = (dates:Date[] )=>{
  const arr: string[] = [];
  dates.forEach((date) => {
    arr.push(dateToDayAndMonth(date));
  });
  return arr;
}
