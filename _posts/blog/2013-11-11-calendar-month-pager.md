---
layout: blog_post
title:  "Calendar module: use month names as pager"
date:   2013-11-11 16:00:40
categories: blog drupal
featured: false
permalink: blog/calendar-month-names-as-pager
tags:
 - drupal 7
 - calendar
 - views
 - how-to
description: This blog post I will explain how you can get the name of the months in your calendar view pager instead of the default "prev" and "next" links.
thumbnail: "calendar-pager-thumb.jpg"
---
<div class="project-excerpt">
	<div id="intro" class="tk-daniel">
In this blog post I will explain how you can get the name of the months in your calendar view pager instead of the default "prev" and "next" links.
	</div>
	<div class="rsCaption"></div>
</div>

<!-- more -->

## Introduction
In this blog post I will explain how you can get the name of the months in your [calendar](https://drupal.org/project/calendar) view pager instead of the default "prev" and "next" links.
The view that is used in this example is a really basic view that can be build with the **[calendar module](https://drupal.org/project/calendar)** for **Drupal 7**. If you need help setting one up, check the links on the module page, or try the video's at [Drupalize.me](http://drupalize.me/series/calendars-drupal-7).

## The goal
This is the default output of a monthly view with a "page by date" pager:

![default calendar pager output]({{ site.filepath}}img/calendar-default-pager.jpg)

And this is what we're trying to achieve:
![month names as pager]({{ site.filepath}}img/calendar-month-name-pager.jpg)

If you're in a rush, and don't want to know what's going on, skip to [the code](#the-code) directly!

## The steps
There are three steps to achieve this:

 1. [override pager theme function in template.php](#step-1)
 2. [create a tpl.php file for the pager](#step-2)
 3. [add some css for proper alignment](#step-3)

### <a name="step-1">Step 1: Override pager theme function in template.php</a>
In your theme's template.php add a function named MYTHEME\_preprocess\_date\_views_pager(&$vars).
This function should contain the following code:
<script src="https://gist.github.com/thijsvdanker/7413387.js?file=template.php"></script>

All code upto line 130 is copy & paste from theme.inc of the date_views module. The magic happens after that.

```php
  // Get the date information from the view.
  $date_info = $view->date_info;

  // Choose the dislpay format of the month name.
  $format = 'F';

  // Get the previous month.
  $dateString = $date_info->min_date;
  $prev_month = new DateTime($dateString);
  $prev_month->modify('-1 month');
  $prev_pager_title = format_date($prev_month->getTimestamp(), 'custom', $format);
  $vars['prev_title'] = $prev_pager_title;

  // Get the next month.
  $next_month = new DateTime($dateString);
  $next_month->modify('+1 month');
  $next_pager_title = format_date($next_month->getTimestamp(), 'custom', $format);
  $vars['next_title'] = $next_pager_title;

```

This snippet of code adds two new variables to the $vars array: _prev_\__title_ and _next_\__title_.
Now we're going to use those two variables in the template file.

### <a name="step-2">Step 2: Create a tpl.php file for the pager</a>
Create a file called _date-views-pager.tpl.php_ in your theme's temlpates directory (_e.g. sites/all/themes/MYTHEME/templates/date-views-pager.tpl.php_).
The code in this template file is based on date\_views _date-views-pager.tpl.php_.
<script src="https://gist.github.com/thijsvdanker/7413387.js?file=date-views-pager.tpl.php"></script>
This uses the $prev\_title and $next\_title to create links with the month names for the pager.

### <a name="step-3">Step 3: Add some css for proper alignment</a>
The final step in the process is to add some css.
By default, the pager is aligned to the right and the _prev_ link is positioned absolutely to appear left of the _next_ link.
<div class="highlight"><pre><code class="css">
.view .date-nav-wrapper .date-prev {
  -moz-border-radius: 5px 0 0 5px;
  border-radius: 5px 0 0 5px;
  background: none repeat scroll 0 0 #dfdfdf;
  float: none;
  padding: 5px 0;
  position: absolute;
  right: 60px;
  left: auto;
  text-align: right;
  top: 0px;
  width: auto;
  z-index: 1;
  font-size: 12px;
</code></pre></div>

This will not work in our new pager setup, as the titles for the link don't have a fixed width (_e.g. may is shorter then november_).   
To fix this, add the following snippet to your MYTHEME.css file:
<script src="https://gist.github.com/thijsvdanker/7413387.js?file=mytheme.css"></script>
This piece of css resets the default alignment css & positions the .pager container to the right.

## <a name="the-code">The code</a>
If you followed along in the previous steps, you're done!  
But if you don't like typing, or skipped straight ahead to this part, you can get all the code you need from the GitHub snippet page [https://gist.github.com/thijsvdanker/7413387](https://gist.github.com/thijsvdanker/7413387).

That's it, hope you find it useful! Used it or modified it? Let me know in the comments :)

