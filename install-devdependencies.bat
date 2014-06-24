@ECHO OFF
cd %~dp0

echo ####################################################
echo ### NOTE: This may need to run as administrator! ###
echo ###                                              ###
echo ###                                              ###
echo ####################################################
echo:
echo:
echo:


echo ### Download and Install Chocolatey ###
echo # - https://chocolatey.org/           #
echo:
SET dir=%~dp0
SET script=%dir%env\install.ps1
PowerShell Set-ExecutionPolicy Bypass
PowerShell -NoProfile %script%;
echo:


echo ### Download and install Ruby and Node ###
echo # - http://rubyinstaller.org/            #
echo # - http://nodejs.org/                   #
echo:
call cinst ruby
call cinst nodejs.install
echo:


echo ### Download and install Ruby gems ###
echo:
call gem install sass -v 3.2.17
call gem install compass -v 0.12.2
call gem install bootstrap-sass
echo:


echo ### Download and install global Node packages ###
echo:
call npm install grunt-cli -g
call npm install bower -g
echo:


echo ### Download and install Node and Bower packages ###
echo:
call npm install
call bower install

SET node_cache=%USERPROFILE%\AppData\Roaming\npm-cache
echo #################################################################
echo ###                           DONE                            ###
echo ### Note: If node failed to install packages                  ###
echo ###       try clearing the node cache under                   ###
echo ###       your user profile:                                  ###
echo ###   %node_cache%
echo ###                                                           ###
echo ###       Also clear the node_modules folder in the project.  ###
echo #################################################################
echo:
pause > nul