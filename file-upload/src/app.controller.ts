import { Controller, Get,Post, UploadedFile, UseInterceptors, } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadFile(@UploadedFile() file) {
    const fileData = file.buffer.toString()
    let arr = fileData.split("\n")
    // console.log(arr)
  let str1 = ""
  let str2 
  let strObj
  let returnArr = []
  for (let j=0; j<arr.length; j++){
    str1 = arr[j]
    str2 = str1.split(" - ")
    let errObj = {timestamp: "", loglevel: "", transactionId: "", err : "" }
    if(str2[2]===""||str2[2]===undefined){}
    else
    {strObj = JSON.parse(str2[2])}
    try{
      if(strObj.hasOwnProperty("err")){
        errObj.timestamp = str2[0]
        errObj.loglevel = str2[1]
        errObj.transactionId = strObj.transactionId
        errObj.err = strObj.err
        returnArr.push(errObj)
        // console.log("logging",str2[0],str2[1],strObj.err)
    }
    }catch(err){
      
    }
    
    
}
    return returnArr;
  }
}
