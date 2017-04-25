---
layout: post
title: Generating a random negative or positive number in a range with Java
---

If you have a non-complex scenario in which you have to generate a set of both positive and negative numbers in a certain range, as well as being inclusive to 0, the following can work.

```java
Random rand = new Random();
int randomNumber = 5 - rand.nextInt(10); // -5 to 5
```

You can play with the ranges yourself.