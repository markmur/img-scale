# img-scale

A super simple image resizing CLI tool that uses the amazing [Sharp](https://github.com/lovell/sharp) under the hood.

### Installation

```bash
npm install -g img-scale
```

### Usage

```bash
img-scale "my_image.png" --width=1600 --format=jepg --output="resized"
```

#### Arguments

| arg     | description                                                           | required |
| ------- | --------------------------------------------------------------------- | -------: |
| default | Path to the image to resize                                           |      yes |
| width   | The desired width of the image                                        |      yes |
| format  | png, jpeg, tiff, webp, raw                                            |          |
| output  | The filename for the resized image (defaults to {name}.resized.{ext}) |          |
