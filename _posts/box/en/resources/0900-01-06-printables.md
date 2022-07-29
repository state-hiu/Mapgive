---
layout: box
permalink: /en/resources/printables/
lang: en
title: Printables
category: resources
published: true
---

<style type="text/css">
.dropdown-menu {
    position: inherit;
}
.row {
    margin-right: -15px;
    margin-left: -10px;
}
.btn-primary.active, .btn-primary:active, .open>.dropdown-toggle.btn-primary {
    color: #fff;
    background-color: #d73f3f;
    border-color: #d73f3f;
}
.btn-primary.focus, .btn-primary:focus {
    color: #fff;
    background-color: #d73f3f;
    border-color: #d73f3f;
}
.btn-primary.active.focus, .btn-primary.active:focus, .btn-primary.active:hover, .btn-primary:active.focus, .btn-primary:active:focus, .btn-primary:active:hover, .open>.dropdown-toggle.btn-primary.focus, .open>.dropdown-toggle.btn-primary:focus, .open>.dropdown-toggle.btn-primary:hover {
    color: #fff;
    background-color: #d73f3f;
    border-color: #d73f3f;
}
</style>

<div class="row">
  <div class="col-md-12">
      <div class="row">
        {% assign mid = site.categories.printable | sort: 'date' %}
        {% assign sorted_pages = mid | reverse %}
          {% for post in sorted_pages %}
            {% assign display = null %}
            {% assign ready = null %}
            {% if post.featured == true %}{% assign display = true %}{% endif %}
            {% if display == true %}

            {% capture thecycle %}{% cycle '1', '2', '3' %}{% endcapture %}
    
              {% if thecycle == '4' %}
              <div class="row">
              {% endif %}

              <div class="col-sm-4 projects-thumbnail">
                <div class="projects-container">
                  <!--<a href="{{ post.external_url }}" class="image">-->
                    <img src="{{site.baseurl}}/assets/img/{{ post.photo }} " alt="{{ post.title }}" class="img-responsive shadowed" />
                  <!--</a>-->
                  <div class="caption">
                    <h3>{{ post.title }}</h3>
                    <p><strong>author</strong>: {{ post.author }}</p>
                    <!--
                    <p><strong>published</strong>: {{ post.date | date: '%B %d, %Y' }}</p>
                    -->
                    {% if post.download_button == true %}
                    <button class="btn btn-primary dropdown-toggle" style="padding: 3px 10px;" type="button" data-toggle="dropdown" aria-expanded="true">Download<span class="caret"></span></button>
                    <ul class="dropdown-menu">
                    {% if post.png %}
                      <li>
                        <a class="png" href="{{site.baseurl}}/assets/img/{{ post.png }}" target="_blank">{{ post.png_label }}</a>
                      </li>
                    {% endif %}
                    {% if post.epg %}
                      <li>
                        <a class="eps" href="{{site.baseurl}}/assets/img/{{ post.eps }}" download="">{{ post.eps_label }}</a>
                      </li>
                    {% endif %}
                    {% if post.pdf %}
                      <li>
                        <a class="eps" href="{{site.baseurl}}/assets/docs/{{ post.pdf }}" download="">{{ post.pdf_label }}</a>
                      </li>
                    {% endif %}
                    </ul>
                    {% else %}
                    <a href="https://www.flickr.com/photos/mapgive/" class="btn btn-primary" style="padding: 3px 10px;" target="_blank">Visit Page</a>
                    {% endif %}
                    
                  </div>
                </div>
              </div>

              {% if thecycle == '4' %}
                </div>
              {% endif %}

            {% endif %}
          {% endfor %}
      </div>
  </div>
</div>

