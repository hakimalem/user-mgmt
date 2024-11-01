import { Controller, Get, Res, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { join } from 'path';
import { Response, Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  async serveFrontend(@Req() req: Request, @Res() res: Response) {
    const path = req.path;
    const buildPath = join(__dirname, '..', 'build');

    // Serve static files if the path starts with /assets or /static
    if (path.startsWith('/assets') || path.startsWith('/static')) {
      res.sendFile(join(buildPath, path));
    }
    // Serve index.html for non-API routes
    else if (!path.startsWith('/api') && !path.startsWith('/user')) {
      res.sendFile(join(buildPath, 'index.html')); // Update the path to your CRA build folder
    }
  }
}
