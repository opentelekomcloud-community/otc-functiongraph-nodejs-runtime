const {
    Logger,
    redirectStdout,
    setLoggerServer
} = require('../logger');

describe('Logger', () => {
    describe('constructor', () => {
        it('should create a Logger instance with the given requestID and invokeID', () => {
            const logger = new Logger('request-id', 'invoke-id');
            expect(logger.requestID).toBe('request-id');
            expect(logger.invokeID).toBe('invoke-id');
            expect(logger.logLevel).toBe('INFO');
        });
    });

    describe('setLevel', () => {
        it('should set the log level to the given level', () => {
            const logger = new Logger();
            logger.setLevel('DEBUG');
            expect(logger.logLevel).toBe('DEBUG');
        });

        it('should not set the log level if the given level is invalid', () => {
            const logger = new Logger();
            logger.setLevel('INVALID');
            expect(logger.logLevel).toBe('INFO');
        });
    });
    describe('setLevel error', () => {
        it('should not send a WARN log message if the log level is not INFO, WARN, or DEBUG', () => {
            const logger = new Logger('request-id', 'invoke-id');
            logger.setLevel('ERROR');
            logger.sendLog = jest.fn();

            logger.warn('This is a warning message');

            expect(logger.sendLog).not.toHaveBeenCalled();
        });
    });
});

    describe('debug', () => {
        it('should not send a DEBUG log message if the log level is not DEBUG', () => {
            const logger = new Logger('request-id', 'invoke-id');
            logger.setLevel('INFO');
            logger.sendLog = jest.fn();

            logger.debug('This is a debug message');

            expect(logger.sendLog).not.toHaveBeenCalled();
        });
    });

describe('redirectStdout', () => {
    it('should redirect stdout and stderr to sendLog function', () => {
        const processStdoutWrite = process.stdout.write;
        const processStderrWrite = process.stderr.write;

        const logger = new Logger('request-id', 'invoke-id');
        redirectStdout();
        const stdoutMessage = 'This is a stdout message';
        const stderrMessage = 'This is a stderr message';
        process.stdout.write(stdoutMessage);
        process.stderr.write(stderrMessage);
        process.stdout.write = processStdoutWrite;
        process.stderr.write = processStderrWrite;
    });
});