# Cloud Mob-Station - Debian 10 Base Image + Xfce4 Desktop

TODO:
* [ ] Improve desktop experience  
* [ ] Configure launch icons/dock
* [ ] Configure FullHD resolution

## Cloud-init instance initialization

Use [linux-cloud-init.yaml](linux-cloud-init.yaml) for installing and configuring a cloud instance which can be used for collaborative programming session. This config file will install the most popular development tools and environments, so that most of the projects can be worked on without any additional installation steps. 

Feel free to extend and adapt the config according to your needs. To learn more about the cloud-init check out the docs here: https://cloudinit.readthedocs.io/en/latest/topics/examples.html

Please create a PR or an issue, if something of importance is missing.

## Connecting and troubleshooting

**Connect via SSH** using the usually generated root password, or the one provided in the cloud-init config.

It takes between 5 and 10 minutes until everything is set up.

Follow the installation progress via `tail --follow /var/log/cloud-init-output.log`

**The Anydesk ID** should be printed close to the end of the output log file.

For more troubleshooting ideas check out: https://cloudinit.readthedocs.io/en/latest/topics/debugging.html


## Installing Anydesk
Via CLI (Windows):

    choco install -y anydesk

Via CLI (MacOS):

    brew cask install anydesk

Otherwise download Anydesk from: https://anydesk.com/downloads

## Cloud Providers

### Hetzner Cloud

### AWS Cloud (not tested)
https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/user-data.html#user-data-cloud-init
