---
layout: page
title: Guides
permalink: /blog/categories/audio/
---

<h5> Posts by Category : {{ page.title }} </h5>

<div class="card">
{% for post in site.categories.audio %}
 <li class="category-posts"><span>{{ post.date | date_to_string }}</span> &nbsp; <a href="{{site.url}}{{ post.url }}">{{ post.title }}</a></li>
{% endfor %}
</div>
