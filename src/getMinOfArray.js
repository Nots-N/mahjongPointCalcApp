
const getMinOfArray = (array)=>{
    return minCalc(array);
}

const minCalc = (array)=>{
    let min = Infinity;
    for(let i=0; i<array.length;i++){
        if(array[i]<min){
            min=array[i];
        }
    }
    return min;
}


export default getMinOfArray;