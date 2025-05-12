export const getInitials=(name)=>{
    if(!name) return "";
    const initialArray=name.split(" ");
    if(initialArray.length==1){
        return initialArray[0][0].toUpperCase();
    }
    const initial=initialArray[0][0]+initialArray[initialArray.length-1][0];
    return initial.toUpperCase();
};