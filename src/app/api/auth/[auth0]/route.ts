import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';

// export const GET = handleAuth();
export const GET =  handleAuth({
    async login (req:any, res:any) {
        try {
            return await handleLogin(req, res, {
                authorizationParams: {
                    audience: 'http://localhost:3002/', // or AUTH0_AUDIENCE
                    // Add the `offline_access` scope to also get a Refresh Token
                    scope: 'openid profile email read:products' // or AUTH0_SCOPE
                  }          
            });
        } catch (err:any) {
            res.status(err.status || 400).end(err.message);
        }
    }
});