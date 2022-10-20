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

# http://95.217.237.154:5001/webui
# test things e.g. via curl "http://95.217.237.154:8080/ipfs/bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi" > cat.jpg
# resp. via curl "http://127.0.0.1:8080/ipfs/bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi" > cat.jpg
# https://www.maxlaumeister.com/u/run-ipfs-on-boot-ubuntu-debian/
# https://unix.stackexchange.com/questions/225401/how-to-see-full-log-from-systemctl-status-service
# journalctl -u ipfs.service