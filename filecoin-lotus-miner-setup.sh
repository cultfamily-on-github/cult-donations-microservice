# https://lotus.filecoin.io/lotus/install/linux/#start-the-lotus-daemon-and-sync-the-chain
# https://lotus.filecoin.io/lotus/manage/manage-fil/

## system dependencies
sudo apt install mesa-opencl-icd ocl-icd-opencl-dev gcc git bzr jq pkg-config curl clang build-essential hwloc libhwloc-dev wget -y && sudo apt upgrade -y

## rustup
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

## go
wget -c https://golang.org/dl/go1.18.1.linux-amd64.tar.gz -O - | sudo tar -xz -C /usr/local

## path
echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.bashrc && source ~/.bashrc

## lotus
git clone https://github.com/filecoin-project/lotus.git
cd lotus
git checkout releases # The releases branch contains the latest stable release

## join mainnet
make clean all

## check
lotus --version

## start lotus
lotus daemon

## synch
lotus sync wait