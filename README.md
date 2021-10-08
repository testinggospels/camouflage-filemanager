# Camouflage Filemanager

Camouflage Filemanager is a web based filemanager that allows you to browse files/folders, edit text based files, upload and download files. This project was intended to be a replacement for the [filemanager](https://github.com/OpusCapita/filemanager), to be used specifically by [Camouflage](https://github.com/testinggospels/camouflage), however it can be used as a standalone application.

NOTE: This project is in early development and not ready for use yet. Watch this repo for latest updates.

# Getting Started

## Docker

Easiest way to use Camouflage Filemanager is with Docker. Use following command to start the file manager.

- `docker run -d -p 3000:3000 --name filemanager shubhendumadhukar/camouflage-filemanager`
- Navigate to http://localhost:3000/

By default the filemanager will show the contents of current working directory. This can be overridden using an environment variable `FS_ROOT`.

- `docker run -d -p 3000:3000 -e CF_FS_ROOT="/opt" --name filemanager shubhendumadhukar/camouflage-filemanager`
- To enable write additional env variable `CF_WRITE_PROTECTED` is required.
    - `docker run -d -p 3000:3000 -e CF_FS_ROOT="/opt" -e CF_WRITE_PROTECTED=false --name filemanager shubhendumadhukar/camouflage-filemanager`

Finally you can mount a local volume.

- `docker run -d -p 3000:3000 -e CF_FS_ROOT="/opt/virtual_services" -e CF_WRITE_PROTECTED=false -v ~/Desktop/virtual_services:/opt/virtual_services --name filemanager shubhendumadhukar/camouflage-filemanager`

Change the directories as per your requirement.