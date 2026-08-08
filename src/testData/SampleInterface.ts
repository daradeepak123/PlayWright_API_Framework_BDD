

export interface Login{

    userName?:string,
    password?:string,
}

const validUser:Login={
    
    password:'admin123'
}

console.log(validUser.userName)

console.log(validUser.password)