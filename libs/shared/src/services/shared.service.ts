import { Injectable } from '@nestjs/common';

@Injectable()
export class SharedService {
  static ResponseResult(result, message = undefined) {
    return {
      result,
      message,
    };
  }
}
