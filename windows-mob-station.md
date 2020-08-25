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
  beyondcompare `
  brave `
  cmake `
  dart-sdk `
  dotnetcore `
  filezilla `
  git `
  git-fork `
  github-desktop `
  GoogleChrome `
  greenshot `
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
  python3 `
  ruby `
  sliksvn `
  sublimetext3 `
  terraform `
  tortoisegit `
  treesizefree `
  unity `
  visualstudio2019community `
  vlc `
  vscode `
  webstorm `
  winscp `
  yarn

# TODO: this is not yet tested
nvm install 8
nvm install --lts latest
nvm use --lts latest

choco install -y win-no-annoy
choco install -y --pre firefox-dev

choco install -y anydesk
choco install -y teamviewer.host

Set-Timezone -Id "W. Europe Standard Time" -PassThru
Set-Service Audiosrv -StartupType Automatic
```
