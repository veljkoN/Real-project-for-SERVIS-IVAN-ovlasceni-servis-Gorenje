const cutString = (materijal:string) => {
    if(materijal[0]==='0'){
      return materijal.slice(materijal.length-6, materijal.length)
    }
    else if(materijal[0]==='H'){
      return materijal
    }
  }
export default cutString