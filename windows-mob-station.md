## Cloud Desktop - Windows 2019 Server Base Image

A clean development workstation in the cloud, installed with every tool you might need when hosting coding sessions. For example in a Code Retreat, Mob-Programming events or any other occasion where a clean machine with tools included might be useful. 

Let me know what you think and how you are using it 🤙


### Install Development Environment

Open an administrative PowerShell, and copy&paste the following command:

    Invoke-WebRequest -UseBasicParsing https://raw.githubusercontent.com/mob-programming-meetup/cloud-desktop/master/install.windows.ps1 | Invoke-Expression

Note: Have a look at [install.windows.ps1](./install.windows.ps1) first. You might want to check if the installed packages are not suspicious and/or adapt the script to your own needs. PRs are always welcome 🎉

### AWS Setup

👉 Help wanted!

### Azure Cloud Setup

👉 Help wanted!

### Google Cloud Setup

Create VM in the cloud:

* Create a new VM instance in the Google Cloud Platform ([Compute Engine](https://console.cloud.google.com/compute)).
* Choose a region close to your audience, in order to minimize latency.
* Choose a machine type depending on your budget and requirements. For example a 4 vCPU + 16 GB memory running a Windows OS costs approx. 0.35 $ per hour (region: europe-west4). The estimated price is shown in the top right.
* Expand "CPU platform and GPU" and enable "Turn on display device" in order to allow screen sharing connection via Anydesk or TeamViewer.
* Select "Windows Server 2019 Datacenter" Boot Disk. Note: The Server Core Windows versions do not include the Windows Desktop features.
* A disk size of 70 GB or greater is recommended.
* Click on "Create" and wait until the instance gets created.

Connect to the VM in the cloud via RDP:
* Windows: Download the RDP file and open it with the Remote Desktop application.
* MacOS: Install the Microsft Remote Desktop App from the Mac App Store: https://apps.apple.com/app/microsoft-remote-desktop/id1295203466

Run the script mentioned above from an administrative Powershell console to install the developer tools. Add additional chocolatey packages (https://chocolatey.org/packages) to the list if necessary. Note: Let me know what is missing by submitting an issue or a Pull Request to this project. 🙏

After the installation script finished (~ 60-90 min), start Anydesk or Teamviewer and configure a pre-defined password for easier connection of your participants.

After the preparation, you can shutdown the instance and save a machine image to avoid running costs when the instance is not used (delete the instance after successfully creating the machine image as you are still charged for the attached disk otherwise). Generally, it's recommended to re-install the instance from scratch for each session. This way you don't have to worry about security updates or misconfiguration when giving somebody else unattended access.