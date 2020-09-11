## Cloud Mob-Station - Debian 10 Base Image + Xfce4 Desktop

TODO:
* [ ] Create Bash script to install via  
`curl -s https://raw.githubusercontent.com/mob-programming-meetup/cloud-mob-station/master/install.linux.sh | bash`
* [ ] **Even better:** configure via *cloud-init* (Supported by AWS, GCE, Azure, DigitalOcean, OpenStack and Hetzner)  
https://cloudinit.readthedocs.io/en/latest/topics/examples.html#install-arbitrary-packages
### Copy&Paste Script

### Part One

```bash

sudo apt update && apt upgrade -y
DEBIAN_FRONTEND=noninteractive apt install --assume-yes xfce4 desktop-base
sudo apt install -y xscreensaver task-xfce-desktop gdebi-core
#systemctl disable lightdm.service

pushd /tmp
# Teamviewer
wget https://download.teamviewer.com/download/linux/teamviewer_amd64.deb
sudo gdebi --non-interactive teamviewer_amd64.deb

# Anydesk
wget -qO - https://keys.anydesk.com/repos/DEB-GPG-KEY | sudo apt-key add -
echo "deb http://deb.anydesk.com/ all main" | sudo tee  /etc/apt/sources.list.d/anydesk-stable.list
sudo apt update && sudo apt install -y anydesk

# Beyond Compare
wget https://www.scootersoftware.com/bcompare-4.3.5.24893_amd64.deb
sudo gdebi --non-interactive bcompare-4.3.5.24893_amd64.deb

# Github Desktop
wget https://github.com/shiftkey/desktop/releases/download/release-2.5.3-linux1/GitHubDesktop-linux-2.5.3-linux1.deb
sudo gdebi --non-interactive GitHubDesktop-linux-2.5.3-linux1.deb

# Mobster
wget https://github.com/dillonkearns/mobster/releases/download/v0.0.48/Mobster-0.0.48-x86_64.AppImage
chmod +x Mobster-0.0.48-x86_64.AppImage 
sudo mv Mobster-0.0.48-x86_64.AppImage /opt
sudo apt install -y fuse

# Webstorm
wget -4 https://download.jetbrains.com/webstorm/WebStorm-2020.2.tar.gz
sudo tar xzf WebStorm-*.tar.gz -C /opt/
/opt/WebStorm-202.6397.88/bin/webstorm.sh

# RubyMine
wget -4 https://download.jetbrains.com/ruby/RubyMine-2020.2.1.tar.gz
sudo tar xzf RubyMine-*.tar.gz -C /opt/
/opt/RubyMine-2020.2.1/bin/rubymine.sh

# PyCharm
wget -4 https://download.jetbrains.com/python/pycharm-professional-2020.2.1.tar.gz
sudo tar xzf pycharm-*.tar.gz -C /opt/
/opt/pycharm-2020.2.1/bin/pycharm.sh

# Ruby
curl -L https://get.rvm.io | bash
source ~/.rvm/scripts/rvm
rvm install 2.6

# Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y

# Node LTS vs NVM
# TODO: this is not yet tested, see original command below
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
source ~/.bashrc
nvm install --lts 8
nvm install --lts
# curl -sL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
# sudo apt install -y nodejs

# Yarn
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt update && sudo apt install yarn

# Zoom
wget https://zoom.us/client/latest/zoom_amd64.deb
sudo gdebi --non-interactive zoom_amd64.deb

rm *.deb *.tar.gz
popd # /tmp

adduser mob-programming
usermod -aG sudo mob-programming

teamviewer setup

echo <replace with passwd> | anydesk --set-password
		
reboot

```
### Part Two

```bash
sudo apt install -y  \
  build-essential \
  chromium \
  chromium-sandbox \
  firefox-esr \
  git-all \
  python3 \
  # network usage stats
  ifstat \
  libreoffice \
  # audio/volume controle
  pavucontrol \
  pulseaudio \
  ripgrep \
  snapd \
  xfce4-goodies

# VSCode 
sudo snap install --classic code

```
