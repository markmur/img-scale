const fs = require('fs');
const sharp = require('sharp');
const chalk = require('chalk');
const bytes = require('bytes');
const path = require('path');
const args = require('yargs').argv;

const { _, width, output, format } = args;

if (!_.length) {
  throw new Error('Input file argument missing');
}

const image = _[0];

const filename = image.substr(
  image.lastIndexOf('/') + 1,
  image.lastIndexOf('.')
);

const extension = image.slice(image.lastIndexOf('.') + 1);

if (!width) {
  throw new Error(
    '`width` argument is required. Usage img-scale --image=image --width 1600'
  );
}

let outputFormat = extension;
let outputFilename = `${filename}.resized.${outputFormat}`;

// If the user specifies an output format, then use that instead of the current
// format
if (format) {
  outputFormat = format;
}

// If no output has been specified, rename the file to {name}.resized.{ext}
if (output) {
  const hasExt = /\.(webp|png|jpg|jpeg|tiff)$/.test(output);
  outputFilename = hasExt
    ? output.substr(0, output.lastIndexOf('.') + 1)
    : output + `.${outputFormat}`;
}

const img = sharp(image);

const originalSize = fs.readFileSync(image).byteLength;

img.metadata().then(metadata => {
  img
    .resize(width)
    .max({ withoutEnlargment: true })
    .sharpen()
    .toColorspace('srgb')
    .toFormat(outputFormat)
    .toFile(outputFilename, (err, info) => {
      if (err) throw err;

      const { format, width, height, size } = info;

      console.log(chalk.magentaBright('Successfully resized image:'));
      const outputLog = chalk`
        Output:       {white.bold ${path.resolve(outputFilename)}}
        Dimensions:   {white.bold ${width} x ${height}} {grey (original: ${
        metadata.width
      } x ${metadata.height})}
        Size:         {white.bold ${bytes(size)}} {grey (original: ${bytes(
        originalSize
      )}, reduction: ${Math.round(100 - size / originalSize * 100)}%)}
      `;

      console.log(outputLog);
    });
});
