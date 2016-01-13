Sshlack
---------
Sshlack is a Slack integration used to run SSH commands on remote servers from Slack.

#### Setup ####
The following dependencies are required:
* NodeJS
* MongoDB

You will need to setup a machine to run the ExpressJS server on. Slack will only post to servers that have valid domains and are accessible using SSL.

**You must have a domain with an SSL certificate in order to use this integration.**

You will need to setup up a new Slack slash command (e.g. /ssh), and point it to post to your server.

#### Configuration ####
You will need to set the following environment variables on your server:
* SLACK_TOKEN - Your Slack Slash Command's token
* SSL_PRIVATE_KEY - Path to your private key file
* SSL_CERT - Path to your certificate file
* SSL_CHAIN - Path to your certificate chain file
* SSH_PRIVATE_KEY - Path to your ssh key (usually $HOME/.ssh/id_rsa)

You will need to run the ExpressJS server as root if using the default SSL port (443).

#### Usage ####
You can issue the following commands to the server:
Create user:
``````````
/ssh create user
``````````
Save an SSH host:
``````````
/ssh create remote [name] [ssh user] [host]
``````````
Execute command/s on a remote host:
``````````
/ssh
[remote name]
[command 1]
[command 2]
...
[command n]
``````````
