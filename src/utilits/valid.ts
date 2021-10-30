export const RequiredField = (value:boolean) =>{
    return value? undefined:   "Fild is requert";
}
export  const MaxLenghtCreator =(maxLength: number)=>(value: string)=>{
    return (value && value.length > maxLength)? 'Max lenght is 30 symbols':   undefined;
}

