---
title: "Ansible has a PECL module"
date: 2016-03-12 11:00:00 +0000
category: Ansible
layout: post
---
With Ansible 2.0 it is possible to install PHP PECL extensions
with an [extras module](http://docs.ansible.com/ansible/pear_module.html).

{% highlight yaml %}
- name: Install PECL extension
  pear: name=pecl/uopz state=present
{% endhighlight %}

Much simpler than the task I previously used:

{% highlight yaml %}
- name: Install PECL extension
  shell: 'echo "\n\n\n\n\n\n\n\n\n\n" | pecl install uopz'
  register: pecl_result
  changed_when: "'already installed' not in pecl_result.stdout"
  failed_when: "pecl_result.stderr or ('ERROR' in pecl_result.stdout)"
{% endhighlight %}
