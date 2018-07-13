const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller
const path = require('path')

getInstallerConfig()
  .then(createWindowsInstaller)
  .catch((error) => {
    console.error(error.message || error)
    process.exit(1)
  })

function getInstallerConfig() {
  console.log('creating windows installer')
  const rootPath = path.join('./')
  const basePath = path.join(rootPath, 'app/windows')

//
// ./electron.p12 is the certificate file ... not stored in repository
// before building, certificate file must be provided in the specified location
//

  return Promise.resolve({
    appDirectory: path.join(basePath, 'builds/MatchTool-win32-x64/'),
    authors: 'Broad Institute',
    noMsi: true,
    certificateFile: './electron.p12',
    certificatePassword: 'broad',
    outputDirectory: path.join(basePath, 'installers'),
    exe: 'MatchTool.exe',
    setupExe: 'MatchToolInstaller.exe',
    setupMsi: 'MatchToolInstaller.msi',
    setupIcon: path.join(rootPath, 'src', 'assets', 'icons', 'win', 'firecloud-explorer.ico')
  });
}
