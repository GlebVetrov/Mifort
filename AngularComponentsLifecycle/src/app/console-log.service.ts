export class ConsoleLogService {

    write(logMessage: string, color: string = 'red') {
      console.log ( '%c%s', `color: ${color}`, logMessage );
    }

}
