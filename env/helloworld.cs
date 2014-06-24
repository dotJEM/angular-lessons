using System;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading;

class Script
{
    public static void Main()
    {
        try
        {
            Install("http://nodejs.org/dist/v0.10.28/x64/node-v0.10.28-x64.msi");
            Install("http://dl.bintray.com/oneclick/rubyinstaller/rubyinstaller-2.0.0-p481-x64.exe?direct");
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
        }
        Console.ReadLine();
    }

    public static void Install(string url)
    {
        string installer = Download(url);
        Console.WriteLine("Installing: {0}", installer);
        //Execute(installer);

        Console.WriteLine("Removing installer: {0}", installer);
        File.Delete(installer);
    }

    public static string Download(string url, string filename = null)
    {
        string installer = Name(url, filename);
        Console.WriteLine("Downloading '{0}'.", installer);

        AutoResetEvent wait = new AutoResetEvent(false);
        using (WebClient client = CreateWebClient())
        {
            Console.Write("   Progess: 0%");
            client.DownloadFileAsync(new Uri(url), installer);
            client.DownloadProgressChanged += (sender, args) => Console.Write("\r   Progess: {0}%", args.ProgressPercentage);
            client.DownloadFileCompleted += (sender, args) => wait.Set();
            wait.WaitOne();
            Console.WriteLine();
        }
        return installer;
    }

    public static void Execute(string installer, string arguments = "")
    {
        Process prc = Process.Start(installer);
        prc.WaitForExit();
    }

    private static string Name(string url, string filename)
    {
        if (string.IsNullOrEmpty(filename))
            filename = url.Split('/').Last().Split('?', '&').First();
        return Path.Combine(Path.GetTempPath(), filename);
    }

    private static WebClient CreateWebClient()
    {
        IWebProxy defaultWebProxy = WebRequest.DefaultWebProxy;
        defaultWebProxy.Credentials = CredentialCache.DefaultCredentials;
        return new WebClient { Proxy = defaultWebProxy };
    }
}


// # Set up the download URL for ruby
// $download_url = "http://dl.bintray.com/oneclick/rubyinstaller/rubyinstaller-2.0.0-p481-x64.exe?direct"

// # Extract the name of the EXE from the URL
// $installer_dest = "$env:temp\"+$download_url.Split('/')[-1]

// # Download file using the .NET WebClient object
// $webclient = New-Object System.Net.WebClient
// $webclient.DownloadFile($download_url, $installer_dest)

// # Execute the silent installer
// Invoke-Expression "$installer_dest /silent"

// # Remove the original installation file from the file system
// Remove-Item $installer_dest -recurse