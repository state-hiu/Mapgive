---
layout: box
permalink: /en/resources/
lang: en
title: Additional Resources
category: resources
published: true
---


<style>


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


.img1 {
    float: right;
}

.clearfix::after {
    content: "";
    clear: both;
    display: table;
}

.img2 {
    float: right;
}
</style>

<div class="row">
  <div class="col-md-12">
    <p>There are many additional resources to further advance knowledge of OpenStreetMap and the different ways it can be utilized.</p>
  </div>
</div>

<div class="row">
  <div class="col-md-12">
      <div class="row">
        {% assign mid = site.categories.additional_resource | sort: 'date' %}
        {% assign sorted_pages = mid | reverse %}
          {% for post in sorted_pages %}
            {% assign display = null %}
            {% assign ready = null %}
            {% if post.featured == true %}{% assign display = true %}{% endif %}
            {% if display == true %}

            {% capture thecycle %}{% cycle '1', '2' %}{% endcapture %}
    
              {% if thecycle == '1' %}
              <div class="row">
              {% endif %}

              <div class="col-sm-5 projects-thumbnail" style="min-height: 425px;">
                <div class="projects-container">

                    <img src="{{ post.photo }}" alt="{{ post.title }}" class="img-responsive shadowed" />

                  <div class="caption">
                    <h3><a href="{{ post.external_url }}">{{ post.title }}</a></h3>
                    <p><strong>author</strong>: {{ post.author }}</p>
                    <p><strong>tags</strong>: {{ post.tags }}</p>
                    {% if post.download_button == true %}
                        <button class="btn btn-primary dropdown-toggle" style="padding: 3px 10px;" type="button" data-toggle="dropdown" aria-expanded="true">Download<span class="caret"></span></button>
                        <ul class="dropdown-menu">
                          <li>
                            <a class="png" href="{{ post.png }}" target="_blank">{{ post.png_label }}</a>
                          </li>
                          <li>
                            <a class="eps" href="{{ post.eps }}" download="">{{ post.eps_label }}</a>
                          </li>
                        </ul>
                    {% else %}
                    <a href="{{ post.external_url }}" class="btn btn-primary" style="padding: 3px 10px;" target="_blank">Visit Page</a>
                    {% endif %}
                    </br>
                    <p>{{ post.content }}</p>
                  </div>

                </div>
              </div>

              {% if thecycle == '2' %}
                </div>
              {% endif %}

            {% endif %}
          {% endfor %}
      </div>
  </div>
</div>




<!--

<div class="clearfix"><img class="img2" src="{{site.baseurl}}/assets/img/globe-pops.jpg" alt="Globe Pops" style="width:250px; padding-left:15px;">

    <p>There are many additional resources to further advance knowledge of OpenStreetMap and the different ways it can be utilized.</p>

<ul>

    <li>
    For the classroom, <a href="http://teachosm.org/">TeachOSM</a> is an online resource to assist educators at all levels to introduce open source mapping using the OpenStreetMap platform.
    </li>

    <li>
    <a href="http://learnosm.org/">LearnOSM</a> provides easy to understand, step-by-step guides to get started with contributing to OpenStreetMap and using OpenStreetMap data.
    </li>

    <li>
    The <a href="https://opendri.org/resource/planning-an-open-cities-mapping-project/">World Bank Open Cities Mapping Project Guide</a> is a tool for practitioners who wish to bring community mapping initiatives to their cities or regions. The guide documents lessons learned from the regional Open Cities Africa program and its predecessors in South Asia to offer best practices on the design and implementation of a community mapping initiative. Community mapping efforts often result in increased awareness of disaster risk within governments and a consensus within ministries that this risk must be reduced.
    </li>

    <li>
    The <a href="http://mapgive.state.gov/events/connect-camp-maps/sessions/">Connect Camps Maps Session Plan</a> is a good template on how to plan a multi-faceted mapping workshop.
    </li>

    <li>
    The <a href="https://www.hotosm.org/hot-activation-protocol.html">Humanitarian OpenStreetMap Team (HOT) Activation Protocol</a> defines the flow of activities during a HOT Activation and describes how trained volunteers perform the tasks that lead to a successful and efficient response. 
    </li>

</ul>

</div>

<h2>MapGive Partners</h2>

<img src="{{site.baseurl}}/assets/img/partners.jpg" alt="partners" style="width:400px">

<p>
And always count on the strong network of <a href="#resources&form-partnerships">partners</a> for even more help and insights.
</p>

-->
