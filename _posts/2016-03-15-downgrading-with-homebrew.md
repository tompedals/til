---
title: "Downgrade a Homebrew package"
date: 2016-03-15 19:42:00 +0000
category: Development
layout: post
---
Recently I updated Ansible on my Mac to 2.0, but then needed to run an older playbook that wasn't compatible.
Thankfully downgrading with Homebrew was nice and easy.

```
brew tap homebrew/versions
brew unlink ansible
brew install ansible19
```

Once finished with 1.9 the commands can be reversed get back to the modern world.
