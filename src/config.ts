interface ApiConfig {
    apiKeyId?: string;
    apiKeySecret?: string;
    apiEnvironment: string;
}

export const config: ApiConfig = {
    apiEnvironment: 'prod-us',
};

export function init(apiKeyId: string, apiKeySecret: string, apiEnvironment?: string): void {
    config.apiKeyId = apiKeyId;
    config.apiKeySecret = apiKeySecret;
    if (apiEnvironment) {
        config.apiEnvironment = apiEnvironment;
    }
}
