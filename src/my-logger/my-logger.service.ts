import { ConsoleLogger, Injectable, Optional } from '@nestjs/common';
import { promises as fsPromises } from 'fs';
import * as path from 'path';

@Injectable()
export class MyLoggerService extends ConsoleLogger {
  constructor(@Optional() context?: string) {
    super();
    if (context) this.setContext(context);
  }
  async logToFile(entry: string) {
    const formattedEntry = `${Intl.DateTimeFormat('en-US', {
      dateStyle: 'short',
      timeStyle: 'short',
      timeZone: 'America/Chicago',
    }).format(new Date())}\t${entry}\n`;
    const logsDir = path.join(import.meta.dirname, '..', '..', 'logs');

    try {
      await fsPromises.mkdir(logsDir, { recursive: true });
      await fsPromises.appendFile(
        path.join(logsDir, 'myLogFile.log'),
        formattedEntry,
      );
    } catch (e) {
      if (e instanceof Error) console.error(e.message);
    }
  }

  log(message: any, context?: string) {
    const ctx = context ?? this.context;
    this.logToFile(`${ctx}\t${message}`);
    super.log(message, ctx);
  }

  error(message: any, stackOrContext?: string) {
    const text =
      typeof message === 'string' ? message : JSON.stringify(message);
    this.logToFile(`${stackOrContext}\t${text}`);
    super.error(message, stackOrContext);
  }
}
