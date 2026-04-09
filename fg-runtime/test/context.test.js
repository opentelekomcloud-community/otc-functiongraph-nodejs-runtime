const { Context } = require('../src/context');

function createContext() {
    const requestID = '123';
    const extra = new Map();
    extra.set('x-access-key', 'access-key');
    extra.set('x-secret-key', 'secret-key');
    extra.set('x-security-access-key', 'security-access-key');
    extra.set('x-security-secret-key', 'security-secret-key');
    extra.set('x-workflow-id', 'x-workflow-id');
    extra.set('x-workflow-run-id', 'x-workflow-run-id');
    extra.set('x-workflow-state-id', 'x-workflow-state-id')
    extra.set('x-auth-token', 'auth-token');
    extra.set('x-security-token', 'security-token');
    const funcEnv = {
        'RUNTIME_FUNC_NAME': 'helloWorld',
        'RUNTIME_PACKAGE': 'default',
        'RUNTIME_PROJECT_ID': '456',
        'RUNTIME_FUNC_VERSION': 'latest',
        'RUNTIME_MEMORY': '128',
        'RUNTIME_CPU': '300',
        'RUNTIME_USERDATA': '{"key":"value"}',
        'RUNTIME_TIMEOUT': '5',
    };
    const opts = {
        requestID: requestID,
        funcEnv: funcEnv,
        accessKey: extra.get('x-access-key') || '',
        secretKey: extra.get('x-secret-key') || '',
        securityAccessKey: extra.get('x-security-access-key') || '',
        securitySecretKey: extra.get('x-security-secret-key') || '',
        workflowID: extra.get('x-workflow-id') || '',
        workflowRunID: extra.get('x-workflow-run-id') || '',
        workflowStateID: extra.get('x-workflow-state-id') || '',
        authToken: extra.get('x-auth-token') || '',
        securityToken: extra.get('x-security-token') || '',
        logger: null
    };

    return new Context(opts);
}

test('context api', () => {
    const ctx = createContext();
    ctx.getRemainingTimeInMilliSeconds();
    expect(ctx.getFunctionName()).toBe('helloWorld');
    expect(ctx.getProjectID()).toBe('456');
    expect(ctx.getPackage()).toBe('default');
    expect(ctx.getVersion()).toBe('latest');
    expect(ctx.getMemorySize()).toBe('128');
    expect(ctx.getCPUNumber()).toBe('300');
    expect(ctx.getUserData('key')).toBe('value');
    expect(ctx.getRequestID()).toBe('123');
    expect(ctx.getAccessKey()).toBe('access-key');
    expect(ctx.getSecretKey()).toBe('secret-key');
    expect(ctx.getSecurityAccessKey()).toBe('security-access-key');
    expect(ctx.getSecuritySecretKey()).toBe('security-secret-key');
    expect(ctx.getWorkflowID()).toBe('x-workflow-id');
    expect(ctx.getWorkflowRunID()).toBe('x-workflow-run-id');
    expect(ctx.getWorkflowStateID()).toBe('x-workflow-state-id');
    expect(ctx.getToken()).toBe('auth-token');
    expect(ctx.getSecurityToken()).toBe('security-token');
    expect(ctx.getAlias()).toBe('');
    expect(ctx.getRunningTimeInSeconds()).toBe(5000);
});