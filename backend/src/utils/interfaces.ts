interface ReturnResponse {
    status:"success" | "error";
    message:string;
    data:[]| {};       
}

export default ReturnResponse