cp ./ipfs-on-ubuntu-service-template.sh /etc/systemd/system/ipfs.service
systemctl start ipfs # to start the service
systemctl enable ipfs # to make it run on boot
journalctl -u ipfs.service # to check the logs - https://unix.stackexchange.com/questions/225401/how-to-see-full-log-from-systemctl-status-service

# manual for cli 
# ipfs add -r ./cult-uploads/
# https://ipfs.io/ipfs/QmY2ZYnd5XEgnt6vtCCbHVQJt387tk4LVgA5xHAA8pLwnS