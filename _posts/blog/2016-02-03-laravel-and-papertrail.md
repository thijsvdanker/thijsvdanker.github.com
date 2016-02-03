---
layout: blog_post
title:  "Laravel, Forge & Papertrail"
date:   2016-02-03 09:00:40
categories: blog laravel
featured: false
permalink: blog/laravel-forge-and-papertrail
tags: 
 - laravel
 - forge
 - papertrail
description: How to set-up Papetrail on Forge with Laravel 5 using secure communications.
thumbnail: "laravel_papertrail.png"
thumbnail_alt: "Logo Bits n Bolts, naar Laravel, Forge and Papertrail"
---
<div class="project-excerpt">
	<div id="intro" class="tk-daniel">
	Learn how to setup Papertrail with Forge and Laravel using secure communications.
	</div>
	<div class="rsCaption"></div>
</div>

<!-- more -->

## Why this blogpost
Setting up [Papertrail](https://papertrailapp.com/) with [Laravel Forge](https://forge.laravel.com/) used to be a total breeze.
As [others](https://mattstauffer.co/blog/laravel-forge-logging-with-papertrail) have described, there was a seperate tab in Forge to setup server monitoring
through services like [New Relic](https://newrelic.com/) and Papertrail.

Now that tab is gone, there is (just a little) more work to it.
So here we go!

## Prerequisits
 - A Forge provisioned server
 - A running Laravel 5.x application

## Step 1: Sign up for Papertrail
Go to [Papertrailapp.com](https://papertrailapp.com/) and signup. There's a perfeclty fine free plan to get started.

## Step 2: Add a syslog handler
Create a Service Provider that lets Laravel log to the syslog in a nice format.
This process is described in [this blogpost](https://ruigomes.me/blog/how-to-use-papertrail-with-laravel-5/) by Rui Gomes

## Step 3: Configure the server
This is the "new" step that is now needed as Forge doesn't do it for you anymore.
It's basically two small steps:

1. [Set-up rsyslog to use Papertrail](https://papertrailapp.com/systems/setup)
2. [Secure the communication](http://help.papertrailapp.com/kb/configuration/encrypting-remote-syslog-with-tls-ssl)

I've included the links to the Papertrail documentation so this post might still be useful even if my description gets outdated.

### Step 3.1: Set-up rsyslog to use Papertrail
Ssh into your server: go to the terminal and run 

```bash
ssh 123.456.789.123 -l forge
```

Replace 123.456.789.123 with your own server ip address.
The ip address (and the root password you're about to use) are sent to you by Forge by e-mail when the server was
provisioned.
![Forge Email]({{ site.filepath}}img/forge_provision_email.jpg)

Edit /etc/rsyslog.conf

```bash
sudo vim /etc/rsyslog.conf
```

and add the papertrail line to the end of the file. The terminal will ask for a password that can be found in the e-mail.
![papertrail-system-setup]({{ site.filepath}}img/papertrail_syslog_conf.jpg)

Save the file (Hit escape and then `:wq` in vim to save and exit)

Restart syslog with

```bash
sudo service rsyslog restart
```

When rsyslog is restarted you should see the server log messages appear in Papertrail!<br>
Check it out on the [events page](https://papertrailapp.com/events).

To do a quick test enter this in your console

```bash
logger I have just completed over 9000 steps from a tutorial!
```

### Step 3.2: Secure the communication 
Now to complete the setup, lets [secure](http://help.papertrailapp.com/kb/configuration/encrypting-remote-syslog-with-tls-ssl) and [optimize](http://help.papertrailapp.com/kb/configuration/advanced-unix-logging-tips#rsyslog_queue) the Papertrail connection.
First download the root certificate to your server:

```bash
sudo curl -o /etc/papertrail-bundle.pem https://papertrailapp.com/tools/papertrail-bundle.pem
```

Then install the `rsyslog-gnutls` package to support encrypted logging.

```bash
sudo apt-get install rsyslog-gnutls
```

Edit your `/etc/rsyslog.conf` file with the secure and optimized parameters.

They should be directly above the line you entered in step 3.1. The result should be:

```bash
$DefaultNetstreamDriverCAFile /etc/papertrail-bundle.pem # trust these CAs
$ActionSendStreamDriver gtls # use gtls netstream driver
$ActionSendStreamDriverMode 1 # require TLS
$ActionSendStreamDriverAuthMode x509/name # authenticate by hostname
$ActionSendStreamDriverPermittedPeer *.papertrailapp.com # accept wildcard cert
$ActionResumeInterval 10
$ActionQueueSize 100000
$ActionQueueDiscardMark 97500
$ActionQueueHighWaterMark 80000
$ActionQueueType LinkedList
$ActionQueueFileName papertrailqueue
$ActionQueueCheckpointInterval 100
$ActionQueueMaxDiskSpace 2g
$ActionResumeRetryCount -1
$ActionQueueSaveOnShutdown on
$ActionQueueTimeoutEnqueue 10
$ActionQueueDiscardSeverity 0

*.* @@logs2.papertrailapp.com:YOUR-ID-HERE # extra @ makes it connect securly
```

Make sure there is now an extra `@` to your Paperlog entry so it knows to use the secure connection!

Save the file, and restart rsyslog (`sudo service rsyslog restart`).
Once it's restarted, retry the logging test from step 3.1.

## All done!
That's all folks, all your logging neatly available on the interwebs!


