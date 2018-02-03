@import 'lib/util.js'
@import 'lib/colors.js'

// Hue Palette
function addHuePalette(groupIndex, hexColor, isWhite, valueIndex) {

  var swatchGroup = createGroup({
    parent: swatchesGroup,
    name: 'color',
    x: 0, y: valueIndex * 50,
    width: 200, height: 50
  });

  var colorBlock = createRectangle({
    parent: swatchGroup,
    name: 'hexColor' + valueIndex,
    x: 0, y: 0,
    width: 200, height: 50
  });

  var colorBlockFill = colorBlock.style().addStylePartOfType(0);
  colorBlockFill.color = MSImmutableColor
    .colorWithIntegerRed(hexColor[0], hexColor[1], hexColor[2])
    .newMutableCounterpart();

  var textColor = (isWhite === 1) ? '#FFF' : '#6d6d6d';

  var colorText = createText({
    parent: swatchGroup,
    stringValue: 'hexColor' + valueIndex,
    name: 'hexColor-2' + valueIndex,
    fontPostscriptName: 'Helvetica Neue',
    fontSize: 14,
    textColor: MSImmutableColor.colorWithSVGString(textColor).newMutableCounterpart(),
    x: 130, y: 17
  });

}

function queryColormind() {
  var url = "http://colormind.io/api/";
  var data = {
    model : "default"
    
    // TODO accept color inputs
    // input : [[44,43,44],[90,83,82],"N","N","N"]
  };

  curlAsync(
    [url, '--data-binary', JSON.stringify(data)],
    queryComplete
  );
}
  
function queryComplete(err, jsonString) {
  if (err) {
    throw err;
  } else {
    var d = JSON.parse(jsonString);
    var colorSet = d['result'];

    colorSet.forEach(function (colorInfo, i) {
        addHuePalette(-1, colorInfo, 1, i);
    });
  }
}
