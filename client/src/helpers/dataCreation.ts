
export const getNPreviousDates = (n: number=0,passedDate:Date= new Date()) => {
  // makes function pure
  const copy = new Date(passedDate)
  const res: Date[] = [new Date(copy)];
  for(let i=0;i<n;i++){
    copy.setDate(copy.getDate()-1);
    console.log(passedDate,copy,"XD")
    res.push(new Date(copy))
  }
    return res
};
export const createFileNames = (name:string,n:number,passedDate:Date=new Date()) =>{
  const res:string[] = []
  const dates = getNPreviousDates(n,passedDate)
  const dateStrings = formatedYearsFromDates(dates)
  dateStrings.forEach(dateString=>{
    res.push(`${dateString}-${name}.jpg`)
  })
  return res
}
export const formatedYearFromDate = (d: Date) => {
  return `${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`;
};

export const formatedYearsFromDates = (dates: Date[]) => {
  const arr: string[] = [];
  dates.forEach((date) => {
    arr.push(formatedYearFromDate(date));
  });
  return arr;
};

export const dateToFormatedMonth = (d:Date) =>{
  return `${d.getDate()}-${d.getMonth()}`;
}
export const datesToFormatedMonths = (dates:Date[] )=>{
  const arr: string[] = [];
  dates.forEach((date) => {
    arr.push(dateToFormatedMonth(date));
  });
  return arr;
}
