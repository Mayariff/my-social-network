export type FieldValidatorType= (value:string)=> string| undefined

export const RequiredField: FieldValidatorType = (value) =>{
    return value ? undefined:   "Field is request";
}
export  const MaxLengthCreator =(maxLength: number):FieldValidatorType=>(value)=>{
    return (value && value.length > maxLength)? 'Max length is 30 symbols':   undefined;
}

