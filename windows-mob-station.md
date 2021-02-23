## Cloud Mob-Station - Windows 2019 Server Base Image

TODO:
* [ ] Create PowerShell script to install via  
`Invoke-WebRequest -UseBasicParsing https://raw.githubusercontent.com/mob-programming-meetup/cloud-mob-station/master/install.windows.ps1 | Invoke-Expression` 

### Copy&Paste Script

Note: Execute commands in an administrative PowerShell.

```PowerShell
# chocolatey
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))

choco install -y `
  7zip `
  adobereader `
  adoptopenjdk `
  anydesk `
  beyondcompare `
  brave `
  cmake `
  dart-sdk `
  dotnetcore `
  firefox `
  filezilla `
  git `
  git-fork `
  github-desktop `
  GoogleChrome `
  greenshot `
  intellijidea-ultimate `
  irfanview `
  jetbrains-rider ` 
  mariadb `
  nvm `
  notepadplusplus `
  paint.net `
  postman `
  powertoys `
  procexp `
  putty `
  pycharm `
  python3 `
  ripgrep `
  ruby `
  sliksvn `
  sublimetext3 `
  teamviewer.host `
  terraform `
  tortoisegit `
  treesizefree `
  unity `
  visualstudio2019community `
  vlc `
  vscode `
  webstorm `
  win-no-annoy `
  winscp `
  yarn

mkdir %tmp%\cloud-desktop
pushd %tmp%\cloud-desktop
Invoke-WebRequest https://github.com/dillonkearns/mobster/releases/download/v0.0.48/Mobster-Setup-0.0.48.exe
.\Mobster-Setup-0.0.48.exe /S 
popd

# chocolatey prerelease
choco install -y --pre firefox-dev

# TODO: this is not yet tested
nvm install 8
nvm install --lts latest
nvm use --lts latest

Set-Timezone -Id "W. Europe Standard Time" -PassThru
Set-Service Audiosrv -StartupType Automatic
```


## Google Cloud Setup

Create VM in the cloud:

* Create a new VM instance in the Google Cloud Platform (Compute Engine).
* Choose a region close to your audience, in order to minimize latency.
* Choose a machine type depending on your budget and requirements. For example a 4 vCPU + 16 GB memory running a Windows OS costs approx. 0.35 $ per hour (region: europe-west4). The estimated price is shown in the top right.
* Expand "CPU platform and GPU" and enable "Turn on display device" in order to allow screen sharing connection via Anydesk or TeamViewer.
* Select "Windows Server 2019 Datacenter" Boot Disk. Note: The Server Core Windows versions do not include the Windows Desktop features.
* Click on "Create" and wait until the instance gets created.

Connect to the VM in the cloud via RDP:
* Windows: Download the RDP file and open it with the Remote Desktop application.
* MacOS: Install the Microsft Remote Desktop App from the Mac App Store: https://apps.apple.com/app/microsoft-remote-desktop/id1295203466

Run the script mentioned above from an administrative Powershell console to install the developer tools. Add additional chocolatey packages (https://chocolatey.org/packages) to the list if necessary. Note: Let me know what is missing by submitting an issue or a Pull Request to this project. 🙏

After the installation script finished (~ 30-60 min), start Anydesk or Teamviewer and configure a pre-defined password for easier connection of your participants.

After the preparation, you can shutdown the instance and save a machine image to avoid running costs when the instance is not used (delete the instance after successfully creating the machine image as you are still charged for the attached disk otherwise). Generally, it's recommended to re-install the instance from scratch for each session. This way you don't have to worry about security updates or misconfiguration when giving somebody else unattended access.