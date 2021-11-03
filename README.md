# Camouflage Filemanager

Camouflage Filemanager is a web based filemanager that allows you to browse and create files/folders, edit text based files, download files.

## Preview
![CamouflageUI-1](https://raw.githubusercontent.com/testinggospels/camouflage/develop/docs/CamouflageUI-1.png)
![CamouflageUI-2](https://raw.githubusercontent.com/testinggospels/camouflage/develop/docs/CamouflageUI-2.png)
![CamouflageUI-3](https://raw.githubusercontent.com/testinggospels/camouflage/develop/docs/CamouflageUI-3.png)

## Installation

### NPM

```bash
npm install -g camouflage-filemanager
```
Filemanager requires two environment variables
* `FS_ROOT`: Root Directory for filemanager; default value is current working directory
* `WRITE_PROTECTED`: Default value is `true`, which means creation/deletion/updates of any kind are not allowed.

Start filemanager after npm installation by running command: `filemanager` in your desired directory. Optionally you can override aforementioned environment variables by exporting or by creating a `.env` file in your current working directory.

### Docker

1. Default:
   ```bash
   docker run -d -p 3000:3000 --name filemanager shubhendumadhukar/camouflage-filemanager
   ```
2. Specify root directory:
   ```bash
   docker run -d -p 3000:3000 -e FS_ROOT="/opt" --name filemanager shubhendumadhukar/camouflage-filemanager
   ```
3. Specify if write is allowed (not allowed by default):
   ```bash
   docker run -d -p 3000:3000 -e FS_ROOT="/opt" -e WRITE_PROTECTED=false --name filemanager shubhendumadhukar/camouflage-filemanager
   ```
4. Mount a local volume:
   ```bash
   docker run -d -p 3000:3000 -e FS_ROOT="/opt/virtual_services" -e WRITE_PROTECTED=false -v ~/Desktop:/opt/Desktop --name filemanager shubhendumadhukar/camouflage-filemanager
   ```

## License
```
MIT License

Copyright (c) 2021 testinggospels

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
