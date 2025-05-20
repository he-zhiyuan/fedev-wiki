# SASS/SCSS 基础：CSS预处理的强大工具

## 引言

CSS作为网页样式的基础语言，虽然功能强大，但在处理大型项目时常常显得繁琐且难以维护。变量的缺失、代码重复、逻辑操作的不足等问题，都限制了传统CSS的效率和可维护性。为了解决这些问题，CSS预处理器应运而生，而SASS/SCSS是其中最受欢迎和广泛使用的一种。

SASS(Syntactically Awesome Style Sheets)是一种CSS预处理器，它为CSS增加了编程语言的特性，如变量、嵌套、混合宏、函数等，使样式表更加结构化、可维护和可重用。SASS有两种语法：原始的缩进语法（SASS）和更接近CSS的SCSS语法（SCSS）。现在SCSS语法更为主流，因为它完全兼容CSS，学习曲线更平缓。

本文将深入探讨SASS/SCSS的基础知识和核心特性，帮助你掌握这一强大的CSS预处理工具，提升前端开发效率。

## SASS与SCSS：两种语法

在开始前，首先明确SASS和SCSS的区别：

- **SASS**：原始语法，使用缩进而非花括号表示嵌套关系，不使用分号结束语句
  ```sass
  nav
    ul
      margin: 0
      padding: 0
    li
      display: inline-block
  ```

- **SCSS**：新语法，保留了CSS的花括号和分号，是CSS的超集
  ```scss
  nav {
    ul {
      margin: 0;
      padding: 0;
    }
    li {
      display: inline-block;
    }
  }
  ```

本文将主要使用SCSS语法进行示例，因为它更接近传统CSS，更容易上手。

## 安装与使用

在使用SASS/SCSS之前，你需要先安装它。有多种方法可以安装SASS：

1. **通过npm安装（推荐）**：
   ```bash
   npm install -g sass
   ```

2. **在项目中安装**：
   ```bash
   npm install sass --save-dev
   ```

3. **通过Ruby安装**（早期版本）：
   ```bash
   gem install sass
   ```

安装完成后，可以通过命令行编译SASS/SCSS文件：

```bash
sass input.scss output.css
```

也可以设置监听模式，自动编译变更的文件：

```bash
sass --watch input.scss:output.css
```

在实际项目中，通常会结合webpack、gulp等构建工具使用SASS/SCSS，或者在框架（如Vue、React）的脚手架中已经集成了SASS/SCSS的支持。

## 基本语法与特性

### 1. 变量

SASS允许定义变量，存储颜色、字体或任何CSS值，方便重用和集中管理：

```scss
$primary-color: #3498db;
$font-stack: Arial, sans-serif;
$base-padding: 10px;

body {
  font-family: $font-stack;
  color: $primary-color;
  padding: $base-padding;
}
```

变量还可以在其他变量中引用：

```scss
$base-size: 16px;
$large-size: $base-size * 1.5;
```

### 2. 嵌套规则

SASS允许按HTML的层次结构嵌套CSS规则，使代码更加直观：

```scss
nav {
  background-color: #f8f9fa;
  
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    
    li {
      display: inline-block;
      
      a {
        color: #333;
        text-decoration: none;
        
        &:hover {
          color: #007bff;
        }
      }
    }
  }
}
```

上面的代码编译后等同于：

```css
nav {
  background-color: #f8f9fa;
}
nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
nav ul li {
  display: inline-block;
}
nav ul li a {
  color: #333;
  text-decoration: none;
}
nav ul li a:hover {
  color: #007bff;
}
```

特别注意`&`符号，它表示父选择器。在上例中，`&:hover`会编译为`nav ul li a:hover`。

### 3. 父选择器引用

父选择器引用（`&`）是SASS特有的功能，允许在嵌套规则内引用外部选择器：

```scss
.button {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  
  &:hover {
    background-color: #0056b3;
  }
  
  &.button--large {
    padding: 15px 20px;
    font-size: 1.2em;
  }
  
  .disabled & {
    opacity: 0.5;
    pointer-events: none;
  }
}
```

编译后：

```css
.button {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
}
.button:hover {
  background-color: #0056b3;
}
.button.button--large {
  padding: 15px 20px;
  font-size: 1.2em;
}
.disabled .button {
  opacity: 0.5;
  pointer-events: none;
}
```

### 4. 属性嵌套

SASS还允许将具有相同命名空间的CSS属性嵌套在一起：

```scss
.box {
  font: {
    family: Arial, sans-serif;
    size: 16px;
    weight: bold;
  }
  margin: {
    top: 10px;
    right: 5px;
    bottom: 10px;
    left: 5px;
  }
  border: 1px solid #ccc {
    radius: 4px;
  }
}
```

编译后：

```css
.box {
  font-family: Arial, sans-serif;
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
  margin-right: 5px;
  margin-bottom: 10px;
  margin-left: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
```

## Mixin 与函数

### 1. Mixin 定义与使用

Mixin是SASS中最强大的功能之一，它允许创建可重用的样式片段：

```scss
@mixin box-shadow($x, $y, $blur, $color) {
  -webkit-box-shadow: $x $y $blur $color;
  -moz-box-shadow: $x $y $blur $color;
  box-shadow: $x $y $blur $color;
}

.card {
  @include box-shadow(0, 2px, 5px, rgba(0, 0, 0, 0.3));
}

.button {
  @include box-shadow(0, 1px, 3px, rgba(0, 0, 0, 0.2));
}
```

Mixin还可以设置默认参数：

```scss
@mixin border-radius($radius: 4px) {
  -webkit-border-radius: $radius;
  -moz-border-radius: $radius;
  border-radius: $radius;
}

.button {
  @include border-radius; // 使用默认值4px
}

.button-round {
  @include border-radius(50%); // 覆盖默认值
}
```

### 2. 函数定义与使用

SASS函数与Mixin类似，但函数返回一个值，而不是CSS规则：

```scss
@function calculate-width($col-count, $margin) {
  @return calc(100% / #{$col-count} - #{$margin * 2});
}

.col-3 {
  width: calculate-width(3, 10px);
}

.col-4 {
  width: calculate-width(4, 10px);
}
```

SASS也提供了许多内置函数，如`lighten()`、`darken()`等颜色函数：

```scss
$base-color: #3498db;

.button {
  background-color: $base-color;
  
  &:hover {
    background-color: darken($base-color, 10%);
  }
  
  &.button--light {
    background-color: lighten($base-color, 15%);
  }
}
```

### 3. 参数传递

SASS支持多种参数传递方式，包括位置参数、命名参数和可变参数：

```scss
@mixin box($width, $height, $color: #ccc) {
  width: $width;
  height: $height;
  background-color: $color;
}

// 位置参数
.box-1 {
  @include box(100px, 100px);
}

// 命名参数
.box-2 {
  @include box($height: 200px, $width: 100px, $color: #f00);
}

// 可变参数
@mixin multiple-shadows($shadows...) {
  box-shadow: $shadows;
}

.multiple-shadow-box {
  @include multiple-shadows(
    0 1px 1px rgba(0,0,0,0.1),
    0 2px 2px rgba(0,0,0,0.1),
    0 4px 4px rgba(0,0,0,0.1)
  );
}
```

## 模块化与组织

### 1. 文件组织

SASS支持将样式分割为多个文件，使得大型项目的样式更易于管理。通常，SASS项目会按以下方式组织文件：

```
styles/
|-- base/
|   |-- _reset.scss
|   |-- _typography.scss
|   |-- _variables.scss
|-- components/
|   |-- _buttons.scss
|   |-- _forms.scss
|   |-- _navigation.scss
|-- layouts/
|   |-- _header.scss
|   |-- _footer.scss
|   |-- _grid.scss
|-- pages/
|   |-- _home.scss
|   |-- _about.scss
|-- utils/
|   |-- _mixins.scss
|   |-- _functions.scss
|-- main.scss
```

注意下划线前缀(`_`)表示这是一个部分文件，不会被单独编译为CSS文件。

### 2. 导入与导出

使用`@import`指令可以将其他SASS文件引入当前文件：

```scss
// main.scss
@import "base/variables";
@import "base/reset";
@import "base/typography";
@import "components/buttons";
@import "components/forms";
// ...
```

SASS 将这些文件合并到一起，生成一个CSS文件。

在最新的SASS版本中，引入了更现代的`@use`和`@forward`指令，它们提供了更好的名称空间控制：

```scss
// main.scss
@use "base/variables";
@use "components/buttons";

.container {
  max-width: variables.$container-width;
}
```

`@forward`指令用于从一个模块转发变量、混合器和函数，方便创建汇总文件：

```scss
// _colors.scss
$primary: #3498db;
$secondary: #2ecc71;

// _typography.scss
$base-font-size: 16px;
$heading-font-family: 'Helvetica', sans-serif;

// _variables.scss
@forward "colors";
@forward "typography";

// main.scss
@use "variables";
body {
  color: variables.$primary;
  font-size: variables.$base-font-size;
}
```

### 3. 命名空间

使用`@use`导入模块时，SASS默认使用文件名作为命名空间：

```scss
@use "colors";

.button {
  background-color: colors.$primary;
}
```

也可以自定义命名空间或使用`as *`取消命名空间：

```scss
@use "colors" as c;
@use "typography" as *;

.button {
  background-color: c.$primary;
  font-size: $base-font-size; // 无需命名空间
}
```

## 高级特性

### 1. 条件语句

SASS提供了`@if`、`@else if`和`@else`指令进行条件判断：

```scss
@mixin theme($mode) {
  @if $mode == "light" {
    background-color: #fff;
    color: #333;
  } @else if $mode == "dark" {
    background-color: #333;
    color: #fff;
  } @else {
    background-color: #f8f9fa;
    color: #495057;
  }
}

.theme-light {
  @include theme("light");
}

.theme-dark {
  @include theme("dark");
}
```

### 2. 循环语句

SASS支持多种循环方式：`@for`、`@each`和`@while`：

#### @for循环

```scss
// 生成网格系统
@for $i from 1 through 12 {
  .col-#{$i} {
    width: calc(100% / 12 * #{$i});
  }
}
```

#### @each循环

```scss
$colors: (
  "primary": #3498db,
  "success": #2ecc71,
  "danger": #e74c3c,
  "warning": #f39c12
);

@each $name, $color in $colors {
  .bg-#{$name} {
    background-color: $color;
  }
  .text-#{$name} {
    color: $color;
  }
}
```

#### @while循环

```scss
$i: 1;
@while $i <= 5 {
  .margin-#{$i} {
    margin: #{$i * 5}px;
  }
  $i: $i + 1;
}
```

### 3. 列表和映射

SASS支持列表和映射数据类型，方便组织和管理数据：

#### 列表

```scss
$font-sizes: 12px, 14px, 16px, 18px, 20px;

@each $size in $font-sizes {
  .font-size-#{$size} {
    font-size: $size;
  }
}
```

#### 映射

```scss
$breakpoints: (
  "sm": 576px,
  "md": 768px,
  "lg": 992px,
  "xl": 1200px
);

@mixin respond-to($breakpoint) {
  @if map-has-key($breakpoints, $breakpoint) {
    @media (min-width: map-get($breakpoints, $breakpoint)) {
      @content;
    }
  } @else {
    @error "Unknown breakpoint: #{$breakpoint}";
  }
}

.container {
  width: 100%;
  
  @include respond-to("md") {
    width: 720px;
  }
  
  @include respond-to("lg") {
    width: 960px;
  }
}
```

### 4. 内置函数

SASS提供了丰富的内置函数，大致分为以下几类：

#### 数学函数

```scss
$width: math.div(100, 2) * 1px; // 50px
$rounded: round(3.7); // 4
```

#### 字符串函数

```scss
$greeting: "Hello, World!";
$uppercase: to-upper-case($greeting); // "HELLO, WORLD!"
```

#### 颜色函数

```scss
$color: #3498db;
$darker: darken($color, 10%); // #2980b9
$transparent: rgba($color, 0.5); // rgba(52, 152, 219, 0.5)
$complement: complement($color); // #db8634
```

#### 列表函数

```scss
$list: 10px, 20px, 30px;
$length: length($list); // 3
$first: nth($list, 1); // 10px
$appended: append($list, 40px); // 10px, 20px, 30px, 40px
```

#### 映射函数

```scss
$map: (
  "key1": value1,
  "key2": value2
);
$has-key: map-has-key($map, "key1"); // true
$value: map-get($map, "key1"); // value1
```

## 实战应用

让我们通过一个实际例子，来综合运用SASS的各种特性，创建一个简单的组件库：

```scss
// _variables.scss
$colors: (
  "primary": #3498db,
  "secondary": #2ecc71,
  "danger": #e74c3c,
  "warning": #f39c12,
  "info": #1abc9c,
  "light": #f8f9fa,
  "dark": #343a40
);

$font-families: (
  "sans": "'Helvetica Neue', Arial, sans-serif",
  "serif": "Georgia, Times, serif",
  "mono": "Monaco, Consolas, monospace"
);

$spacing-unit: 4px;
$border-radius: 4px;

// _mixins.scss
@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

@mixin button-variant($bg-color, $text-color: white) {
  background-color: $bg-color;
  color: $text-color;
  border: 1px solid darken($bg-color, 10%);
  
  &:hover {
    background-color: darken($bg-color, 7.5%);
    border-color: darken($bg-color, 15%);
  }
  
  &:active {
    background-color: darken($bg-color, 10%);
    border-color: darken($bg-color, 17.5%);
  }
}

@mixin spacing($property, $side: null, $factor: 1) {
  $sides: (
    "top": "t",
    "right": "r",
    "bottom": "b",
    "left": "l"
  );
  
  @if $side {
    @if map-has-key($sides, $side) {
      #{$property}-#{$side}: $spacing-unit * $factor;
    } @else {
      @error "Invalid side: #{$side}";
    }
  } @else {
    #{$property}: $spacing-unit * $factor;
  }
}

// _buttons.scss
@use "variables";
@use "mixins";

.btn {
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  user-select: none;
  padding: variables.$spacing-unit * 2 variables.$spacing-unit * 4;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: variables.$border-radius;
  transition: all 0.15s ease-in-out;
  cursor: pointer;
  text-decoration: none;
  
  @each $name, $color in variables.$colors {
    &.btn-#{$name} {
      @include mixins.button-variant($color);
    }
  }
  
  &.btn-outline {
    background-color: transparent;
    
    @each $name, $color in variables.$colors {
      &.btn-outline-#{$name} {
        color: $color;
        border-color: $color;
        
        &:hover {
          background-color: $color;
          color: white;
        }
      }
    }
  }
  
  &.btn-sm {
    padding: variables.$spacing-unit variables.$spacing-unit * 2;
    font-size: 0.875rem;
  }
  
  &.btn-lg {
    padding: variables.$spacing-unit * 3 variables.$spacing-unit * 6;
    font-size: 1.25rem;
  }
}

// _utilities.scss
@use "variables";

@each $name, $color in variables.$colors {
  .bg-#{$name} {
    background-color: $color !important;
  }
  
  .text-#{$name} {
    color: $color !important;
  }
}

@for $i from 1 through 5 {
  .m-#{$i} { margin: variables.$spacing-unit * $i !important; }
  .mt-#{$i} { margin-top: variables.$spacing-unit * $i !important; }
  .mr-#{$i} { margin-right: variables.$spacing-unit * $i !important; }
  .mb-#{$i} { margin-bottom: variables.$spacing-unit * $i !important; }
  .ml-#{$i} { margin-left: variables.$spacing-unit * $i !important; }
  
  .p-#{$i} { padding: variables.$spacing-unit * $i !important; }
  .pt-#{$i} { padding-top: variables.$spacing-unit * $i !important; }
  .pr-#{$i} { padding-right: variables.$spacing-unit * $i !important; }
  .pb-#{$i} { padding-bottom: variables.$spacing-unit * $i !important; }
  .pl-#{$i} { padding-left: variables.$spacing-unit * $i !important; }
}

// main.scss
@use "variables";
@use "mixins";
@use "buttons";
@use "utilities";

body {
  font-family: map-get(variables.$font-families, "sans");
  line-height: 1.5;
  color: map-get(variables.$colors, "dark");
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 variables.$spacing-unit * 4;
}
```

这个示例展示了如何使用SASS创建一个简单的UI组件库，包括按钮样式和工具类。通过变量、混合宏、嵌套、循环等特性，我们能够以简洁、可维护的方式生成大量样式。

## 最佳实践与注意事项

在使用SASS/SCSS时，以下是一些最佳实践和需要注意的事项：

### 1. 文件组织

- 使用有意义的目录结构组织SASS文件
- 使用下划线前缀命名部分文件（如`_variables.scss`）
- 为每个组件或功能创建单独的文件
- 使用一个主文件（如`main.scss`）引入所有部分文件

### 2. 命名约定

- 使用一致的命名约定，如BEM或其他CSS方法论
- 为变量、混合宏和函数使用描述性名称
- 使用连字符分隔单词（如`$primary-color`）而非驼峰命名法

### 3. 变量使用

- 为颜色、字体、尺寸等创建变量
- 集中管理变量，便于全局修改
- 使用映射存储相关变量，如颜色集合或断点

### 4. 嵌套规则

- 避免过深嵌套，一般不超过3-4层
- 使用`&`引用父选择器时保持清晰
- 考虑使用BEM等命名约定减少嵌套需求

### 5. Mixin与函数

- 为重复使用的样式创建混合宏
- 为计算值创建函数
- 设置合理的默认参数值
- 文档化复杂的混合宏和函数

### 6. 性能考虑

- 避免生成不必要的CSS
- 合理使用循环，避免生成过多重复代码
- 注意选择器嵌套产生的复杂选择器可能影响性能
- 使用构建工具压缩最终CSS输出

### 7. 浏览器兼容性

- 使用混合宏处理浏览器前缀，或使用Autoprefixer等工具
- 测试生成的CSS在各浏览器中的表现

### 8. 调试

- 使用SASS的调试功能（如`@debug`指令）
- 启用SourceMaps便于在浏览器中调试

## 总结

SASS/SCSS是一种强大的CSS预处理器，通过引入变量、嵌套、混合宏、函数、条件语句、循环等编程特性，极大地提升了CSS的开发效率和可维护性。

本文介绍了SASS/SCSS的基础语法和核心特性，包括变量定义、嵌套规则、混合宏、函数、模块化和高级特性等。掌握这些知识，你将能够更高效地编写和管理CSS样式，特别是在大型项目中。

随着CSS本身的发展，许多SASS的功能（如变量、嵌套）已经在原生CSS中得到支持，但SASS仍然提供了更全面的功能集，是现代前端开发的重要工具之一。

## 拓展阅读

1. [SASS官方文档](https://sass-lang.com/documentation/)
2. [SASS指南](https://sass-guidelin.es/)
3. [CSS-Tricks上的SASS教程](https://css-tricks.com/sass-style-guide/)
4. [SASS混合宏与扩展的区别](https://css-tricks.com/the-extend-concept/)
5. [SASS模块系统深入指南](https://css-tricks.com/introducing-sass-modules/)