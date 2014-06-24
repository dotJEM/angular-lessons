$a=new-object net.webclient;
$a.proxy.credentials=[system.net.credentialcache]::defaultnetworkcredentials;
$a.downloadstring('https://chocolatey.org/install.ps1')|iex