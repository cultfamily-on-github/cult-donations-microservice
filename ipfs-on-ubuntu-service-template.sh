# credits to https://www.maxlaumeister.com/u/run-ipfs-on-boot-ubuntu-debian/

[Unit]
Description=IPFS daemon
After=network.target

[Service]
### Uncomment the following line for custom ipfs datastore location
# Environment=IPFS_PATH=/path/to/your/ipfs/datastore
ExecStart=/usr/local/bin/ipfs daemon
Restart=on-failure

[Install]
WantedBy=default.target