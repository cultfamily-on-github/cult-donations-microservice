apt update -y && apt upgrade -y 

# still some parts are done via NodeJS
apt install npm 
npm i -g pm2
npm i -g ts-node
npm i -g typescript

# Deno is my favorite off-chain RTE for such use cases
apt install unzip -y
curl -fsSL https://deno.land/x/install/install.sh | sh
mv /root/.deno/bin/deno /usr/bin/

# https / ssl certificates are handled via https://certbot.eff.org/instructions?ws=other&os=ubuntufocal
apt-get update
apt-get install snapd
sudo snap install core; sudo snap refresh core
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot
# ensure port 80 is free and open during the following step
sudo certbot certonly --standalone # follow the instructions given there // cultbeast.org www.cultbeast.org 

# renewal details see ./renew-certs.sh file

# IPFS Service
# according to https://docs.ipfs.tech/install/command-line/#official-distributions on 20.10.22:
wget https://dist.ipfs.tech/kubo/v0.16.0/kubo_v0.16.0_linux-amd64.tar.gz
tar -xvzf kubo_v0.16.0_linux-amd64.tar.gz
cd kubo
sudo bash install.sh
ipfs --version
ipfs daemon
ipfs init
ipfs cat /ipfs/QmQPeNsJPyVWPFDVHb77w8G42Fvo15z4bG2X8D2GhfbSXc/readme

# https://www.codegrepper.com/code-examples/javascript/buffer+to+image+nodejs
# https://javascript.plainenglish.io/guide-to-the-express-response-object-sending-things-2defae78d53c
# https://stackoverflow.com/questions/26288055/how-to-send-a-file-from-remote-url-as-a-get-response-in-node-js-express-app
# https://github.com/ipfs/js-ipfs/blob/master/docs/core-api/FILES.md#ipfscatipfspath-options
# https://stackoverflow.com/questions/68727572/how-to-write-files-or-folder-to-ipfs-via-the-http-api
# https://community.infura.io/t/ipfs-http-api-add-directory/189/8
# https://stackoverflow.com/questions/62648572/how-to-create-a-directory-and-add-files-to-ipfs-using-js-ipfs-with-pure-javascri
# curl -X POST -F file=@myfile "http://127.0.0.1:5001/api/v0/files/write?arg=<path>
# curl -X POST -F file=@myfile "http://127.0.0.1:5001/api/v0/files/write?arg=/root/cult-donations-microservice/backend/ipfs-upload/a-team.png
# http://95.217.237.154:5001/webui
# https://docs.ipfs.tech/reference/kubo/rpc/#api-v0-add
# hello world example curl "http://127.0.0.1:8080/ipfs/QmTp2hEo8eXRp6wg7jXv1BLCMh5a4F3B7buAUZNZUu772j" 
# curl "http://95.217.237.154:8080/ipfs/QmdtkARoTA9h3Uqaf3ZAdEq1LrBUaXXfPLP2KKEm2zLWBT" > super.jpg
# curl "http://127.0.0.1:8080/ipfs/QmdtkARoTA9h3Uqaf3ZAdEq1LrBUaXXfPLP2KKEm2zLWBT" > super.jpg
# test things e.g. via curl "http://95.217.237.154:8080/ipfs/bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi" > cat.jpg
# resp. via curl "http://127.0.0.1:8080/ipfs/bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi" > cat.jpg
# https://www.maxlaumeister.com/u/run-ipfs-on-boot-ubuntu-debian/
# https://unix.stackexchange.com/questions/225401/how-to-see-full-log-from-systemctl-status-service
# journalctl -u ipfs.service