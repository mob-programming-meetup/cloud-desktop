# Install via the following command command (administrative PowerShell):
# Invoke-WebRequest -UseBasicParsing https://raw.githubusercontent.com/mob-programming-meetup/cloud-mob-station/master/install.windows.ps1 | Invoke-Expression

& {
  Set-PSDebug -Trace 1 # Trace script lines as they run. 

  # Install Chocolatey package manager
  Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))

  # Install software packages
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
    teamviewer `
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

  # Reload environment variables (system path)
  RefreshEnv

  # Install Mobster Mob-Programming timer
  mkdir "$env:TEMP\cloud-desktop"
  pushd "$env:TEMP\cloud-desktop"
  Invoke-WebRequest https://github.com/dillonkearns/mobster/releases/download/v0.0.48/Mobster-Setup-0.0.48.exe -OutFile Mobster-Setup-0.0.48.exe
  .\Mobster-Setup-0.0.48.exe /S 
  popd

  # Chocolatey prerelease packages
  choco install -y --pre `
    firefox-dev

  # Use Node Version Manager (NVM) to install multiple Node.js versions
  nvm install 8
  nvm install 14 # LTS version
  nvm use 14 # LTS version

  # Set Timezone
  Set-Timezone -Id "W. Europe Standard Time" -PassThru

  # Enable Audio Service
  Set-Service Audiosrv -StartupType Automatic
} *> "$env:TEMP\cloud-startup.log"