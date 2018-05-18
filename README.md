[![Build Status](https://travis-ci.org/itaoyuta/postcss-selector-replace.svg?branch=master)](https://travis-ci.org/itaoyuta/postcss-selector-replace)

# postcss-selector-replace
This is postcss plugin.  

[A new css function was added in Xamarin.Forms 3.](https://docs.microsoft.com/en-us/xamarin/xamarin-forms/user-interface/styles/css/index)  
I immediately prepared a scss environment, but there was one problem.  
[It is Xamarin's own tag which is not based on the CSS specification.](https://docs.microsoft.com/en-us/xamarin/xamarin-forms/user-interface/styles/css/#selecting-elements-by-base-class)  
[In node-sass, scss not based on the specification is not built.](https://github.com/sass/node-sass/issues/1121)  
In order to solve this we decided to pipe css built from scss and then apply selector symbols based on our own rules.  
This is the postcss plugin created for that.  


# Example

__postcss.config.js__   

```
module.exports = {
  plugins: [
    require('postcss-selector-replace')({
      "before": ["[base]", "[test]"],
      "after": ["^", "~"]
    })
  ]
}
```

__before.css__   

```
[base]contentpage {
	background-color: red;
}
```

__after.css__   

```
^contentpage {
	background-color: red;
}
```
