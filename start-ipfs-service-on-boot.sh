cp ./ipfs-on-ubuntu-service-template.sh /etc/systemd/system/ipfs.service
systemctl start ipfs # to start the service
systemctl enable ipfs # to make it run on boot