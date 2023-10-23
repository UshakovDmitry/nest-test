d69d6c2d8e494d47aac84ef650f2cd23
ixiMAWaXXOQ4-ZCx-F4zmlTjLil2-iFqeL76NRK3


Authentication
This page is for Wrangler v1, which has now been deprecated. Access documentation for the current version of Wrangler by visiting the Wrangler homepage. Refer to the Migration guide for instructions on how to migrate to the latest version.
​​Background
In Cloudflare’s system, a user can have multiple accounts and zones. As a result, your user is configured globally on your machine via a single Cloudflare Token. Your account(s) and zone(s) will be configured per project, but will use your Cloudflare Token to authenticate all API calls. A configuration file is created in a .wrangler directory in your computer’s home directory.

​​Using commands
To set up Wrangler to work with your Cloudflare user, use the following commands:

login: a command that opens a Cloudflare account login page to authorize Wrangler.
config: an alternative to login that prompts you to enter your email and api key.
whoami: run this command to confirm that your configuration is appropriately set up. When successful, this command will print out your account email and your account_id needed for your project’s wrangler.toml file.
​​Using environment variables
You can also configure your global user with environment variables. This is the preferred method for using Wrangler in CI (continuous integration) environments.

To customize the authentication tokens that Wrangler uses, you may provide the CF_ACCOUNT_ID and CF_API_TOKEN environment variables when running any Wrangler command. The account ID may be obtained from the Cloudflare dashboard in Overview and you may create or reuse an existing API token.


CF_ACCOUNT_ID=accountID CF_API_TOKEN=veryLongAPIToken wrangler publish

Alternatively, you may use the CF_EMAIL and CF_API_KEY environment variable combination instead:


CF_EMAIL=cloudflareEmail CF_API_KEY=veryLongAPI wrangler publish

You can also specify or override the target Zone ID by defining the CF_ZONE_ID environment variable.

Defining environment variables inline will override the default credentials stored in wrangler config or in your wrangler.toml file.

​​Generate Tokens
​​API token
In Overview, select Get your API token.
After being taken to the Profile page, select Create token.
Under the API token templates section, find the Edit Cloudflare Workers template and select Use template.
Fill out the rest of the fields and then select Continue to summary, where you can select Create Token and issue your token for use.
​​Global API Key
In Overview, select Get your API token.
After being taken to the Profile page, scroll to API Keys.
Select View to copy your Global API Key.*
Warning
* Treat your Global API Key like a password. It should not be stored in version control or in your code – use environment variables if possible.
​​Use Tokens
After getting your token or key, you can set up your default credentials on your local machine by running wrangler config:


wrangler config

Use the --api-key flag to instead configure with email and global API key:


wrangler config --api-key
