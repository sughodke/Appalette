function createSelect(msg, items, selectedItemIndex) {
  selectedItemIndex = selectedItemIndex || 0;

  var accessory = [[NSComboBox alloc] initWithFrame:NSMakeRect(0,0,300,25)];
  [accessory addItemsWithObjectValues:items]
  [accessory selectItemAtIndex:selectedItemIndex]

  var alert = [[NSAlert alloc] init];
  [alert setMessageText:msg]
  [alert addButtonWithTitle:'Rock it ⚡️']
  [alert addButtonWithTitle:'Cancel']
  [alert setAccessoryView:accessory]

  var responseCode = [alert runModal];
  var sel = [accessory indexOfSelectedItem];
  return [responseCode, sel]
}

function createGroup(config) {
  var group = MSLayerGroup.new()
  config.parent.addLayers([group]);
  group.setName(config.name);
  group.frame().x = config.x;
  group.frame().y = config.y;
  group.frame().width = config.width;
  group.frame().height = config.height;
  return group;
}

function createRectangle(config) {
  var rectangle = MSRectangleShape.new();
  rectangle.setName(config.name);
  rectangle.frame().x = config.x;
  rectangle.frame().y = config.y;
  rectangle.frame().width = config.width;
  rectangle.frame().height = config.height;
  
  var shape = MSShapeGroup.shapeWithPath( rectangle );
  config.parent.addLayers([shape]);
  return shape;
}

function createText(config) {
  var text = MSTextLayer.new();
  config.parent.addLayers([text]);
  text.name = config.name;
  text.stringValue = config.stringValue;
  text.fontPostscriptName = config.fontPostscriptName ;
  text.textColor = config.textColor;
  text.fontSize = config.fontSize;
  text.frame().x = config.x;
  text.frame().y = config.y;
  return text;
}

function isSelected(code) {
  return code === 1000
}

function curlAsync(args, cb) {
  var task = NSTask.alloc().init();
  task.setLaunchPath("/usr/bin/curl");
  task.setArguments(args);
  log("/usr/bin/curl " + args.join(" "));
  var outputPipe = [NSPipe pipe];
  var errorPipe = [NSPipe pipe];
  [task setStandardOutput:outputPipe];
  [task setStandardError:errorPipe];
  task.launch();
  task.waitUntilExit();
  var status = [task terminationStatus];

  var errorData = [[errorPipe fileHandleForReading] readDataToEndOfFile];
  var errorString = [[[NSString alloc] initWithData:errorData encoding:NSUTF8StringEncoding]];

  if (status == 0) {
       var responseData = [[outputPipe fileHandleForReading] readDataToEndOfFile];
       var responseString = [[[NSString alloc] initWithData:responseData encoding:NSUTF8StringEncoding]];
       cb(null, responseString);
  } else {
       cb("error", null);
  }
}

