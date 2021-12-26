import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { HttpException } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();
    const errorMessage: any = exception.getResponse();


    let message: Array<String> = new Array<String>();

    if (status == 404) {
      message.push('Route not found');
    } else if (status == 400) {
      errorMessage.forEach(e => {
        let tmpList = e.constraints;
        for (let ele in tmpList) {
          message.push(tmpList[ele]);
        }
      });
    } else if (status == 401) {
      message.push("You aren't authorized to access here");
    } else if (status == 500) {
      message.push('Internal server error');
    } else {
      console.log(errorMessage);
      if(errorMessage.message != null) {
        message.push(errorMessage.message);
      } else {
        message.push('Error, contact the developpement team');
      }
    }

    response.status(status).json({
      status: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: message,
    });
  }
}
