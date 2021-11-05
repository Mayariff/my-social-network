export type FieldValidatorType= (value:string)=> string| undefined

export const RequiredField: FieldValidatorType = (value) =>{
    return value? undefined:   "Fild is requert";
}
export  const MaxLenghtCreator =(maxLength: number):FieldValidatorType=>(value)=>{
    return (value && value.length > maxLength)? 'Max lenght is 30 symbols':   undefined;
}

