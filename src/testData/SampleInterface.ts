

export interface register{
    
}



export interface LoginTestData{  //undefined

    userName?:string,
    password?:string,
}

export const validUser:LoginTestData={
    userName:'Admin',
    password:'admin123'
}
export const missingUserName:LoginTestData={
    password:'admin'
}

export const invalidvalidUser:LoginTestData={
     userName:'Admin',
    password:'admin'
       
}

export const missingUserPassword:LoginTestData={
    password:'admin'   
}
