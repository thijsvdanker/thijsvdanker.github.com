---
layout: blog_post
title:  "RoyalSlider module Intro"
date:   2013-12-13 08:00:40
categories: blog drupal
featured: false
permalink: blog/royalslider-module-intro
tags:
 - drupal 7
 - royalslider
 - module
description: Get up and running with the RoyalSlider integration module for Drupal.
thumbnail: "blog_rs_intro_rs_module_page.jpg"
---
<div class="project-excerpt">
	<div id="intro" class="tk-daniel">
		<p><a href="{{ page.url }}">RoyalSlider module - Intro</a></p>
	</div>
	<div class="rsCaption"></div>
</div>

<!-- more -->

## Introduction
In this post I will do a brief introduction on the [RoyalSlider module](http://www.drupal.org/project/royalslider) for Drupal.
At the end of this post you'll be able to make a slideshow of images that work great on both desktop and all your touch-enabled devices! So lets go and talk about:

* [The RoyalSlider plugin](#royalslider-plugin)
* [Setting up the module](#module-setup)
* [Using RoyalSlider as an image field formatter](#use-as-formatter)

## <a name="royalslider-plugin">The RoyalSlider plugin</a>
RoyalSlider is a great JavaScript plugin, developed by [Dmitry Semenov](http://codecanyon.net/user/Semenov) and available [here](http://codecanyon.net/item/royalslider-touchenabled-jquery-image-gallery/461126) on CodeCanyon. It's not free, but it's hard to beat for pricing compared to making it yourself ($12 at the time of writing). The reason I've chosen to use it for my projects is because of its support for touchscreens. But there's alot more to this plugin than that. Some things I considered as important:

* Great [documentation](http://dimsemenov.com/plugins/royal-slider/documentation/) & support.
* Easy to use [api](http://dimsemenov.com/plugins/royal-slider/documentation/#api)
* Preloading images
* Skins
* Support for HTML content
* Support for video content

For a full demonstration of its capabilities, check the RoyalSlider [demo website](http://dimsemenov.com/plugins/royal-slider/?s=cc).

## <a name="module-setup">Setting up the module</a>
To get up and running with the RoyalSlider module, you need a couple of things:

* The [RoyalSlider module](https://drupal.org/project/royalslider) for Drupal
* The dependencies: [Libraries API](https://drupal.org/project/libraries), [ctools](https://drupal.org/project/ctools) and [jQuery Update](https://drupal.org/project/jquery_update)
* The [RoyalSlider JavaScript plugin](http://codecanyon.net/item/royalslider-touchenabled-jquery-image-gallery/461126)

The JavaScript plugin should be downloaded and extracted to the libraries folder (most problably _/sites/all/libraries_) so that jquery.royalslider.min.js exists at _/sites/all/libraries/royalslider/jquery.royalslider.min.js_.

As mentioned in the dependencies, you need jQuery >= 1.7 for this to work, so go to _admin/config/development/jquery_update_ to change jQuery to version 1.7 or higher.

Once you have downloaded all the code, go to the modules page (_/admin/modules_) and enable RoyalSlider.

The RoyalSlider module for Drupal also offers integration with Views, but installation and usage of that will be the topic of a future blogpost!

## <a name="use-as-formatter">Using RoyalSlider as an image field formatter</a>
This will demonstrate how to use RoyalSlider as an image field formatter.   
The use-case is that you have a single node with an image field containing multiple images. In this example lets say we are building a website for a used spacescraft seller.   
Each spacescraft is its own node, and contains several photos of the spacescraft.   
There are four steps to get our used spacescraft slideshow working:

1. Create new content type
2. Add an image field to the content type
3. Choose RoyalSlider as the display formatter
4. Create a node

Let's go over these steps.

### Step 1: Create new content type
Creating a new content type is easy in Drupal (as you probably already know), so we'll keep this step short:
Go to _admin/structure/types/add_, pick a name for your content type and hit *save and add fields*.
For this example I've created a content type called 'Spacecraft'.

### Step 2: Add an image field to the content type
![image field]({{ site.filepath}}img/blog_rs_intro_photo_field.jpg)

And allow it to have an unlimited number of items

![field settings]({{ site.filepath}}img/blog_rs_intro_field_settings.jpg)

### Step 3: Choose RoyalSlider as the display formatter
Once you've added the field that will contain the images, go to the _Manage Display_ tab of the content type.
There you will see the image field, and you'll have the option to change the formatter from Image to RoyalSlider.
![formatter]({{ site.filepath}}img/blog_rs_intro_choose_format.jpg)
Once you have selected RoyalSlider as the formatter, you can use the little settings dial on the right to change the formatter settings.
![formatter settings]({{ site.filepath}}img/blog_rs_intro_formatter_options.jpg)
There are two options here: 'Option set' and 'Skin'.
I will go into further detail about the options in a future blogpost, but you can go ahead and fiddle with creating custom Option Sets at _admin/config/media/royalslider_.

### Step 4: Create a node
The final step in creating your slideshow is creating the first Spacecraft node and adding some pictures.
Go to _node/add/spacecraft_ and add a title and some photo's and hit save.
![create spacecraft]({{ site.filepath}}img/blog_rs_intro_create_node.jpg)
And there's your first awesome, touchie draggie slideshow!
![first slideshow]({{ site.filepath}}img/blog_rs_intro_slideshow_node.jpg)
## To be continued...
There is more to this module. Besides using it as an image field formatter, you can also use it as a views slideshow plugin. And on top of that, you can also create feature-exportable presets that allow you to customize the slideshow. I'll blog about these two topics in part II and part III of this series, so stay tuned!





