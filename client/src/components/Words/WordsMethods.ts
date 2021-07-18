import { TotalWordSiteData, AnyMap } from "../../interfaces"


export const getFormatedDataToGraph = (totalData:TotalWordSiteData,selected:[string, number][]) =>{
  const keys = Object.keys(totalData)
  // removes total from keys. which only leaves website names
  keys.splice(keys.indexOf("total",1))
  const res:AnyMap[] = []
  selected.forEach(entry=>{
    const word = entry[0]
    const totalCount = entry[1]
    const tempObj:AnyMap = {
      word:word,
      total:totalCount
    }
    keys.forEach(key=>{
      let count
      // handles the situtaion if the word si not present
      console.log(totalData[key], "BUM")
      if(totalData[key].frequencyOfWords[word]=== undefined){
        count = 0
      }else{
        count = totalData[key].frequencyOfWords[word]
      }
      tempObj[key] = count
    })
    res.push({
      ...tempObj
    })
  })
  return res
}