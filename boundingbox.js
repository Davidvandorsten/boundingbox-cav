ui.setTitle("boundingbox");

var defaultValue = "";

var buttonVLayout = new ui.VLayout();
buttonVLayout.setSpaceBetween(0);
buttonVLayout.setMargins(0, 0, 0, 0);

var centrePointLabel = new ui.Label(
  "(" + defaultValue + ", " + defaultValue + ")"
);
centrePointLabel.setAlignment(1);

var centrePointHLayout = new ui.HLayout();
centrePointHLayout.setSpaceBetween(0);
centrePointHLayout.setMargins(0, 10, 0, 5);
centrePointHLayout.addSpacing(25);
centrePointHLayout.add(centrePointLabel);
centrePointHLayout.addSpacing(70);

var yCoordHLayout = new ui.HLayout();
yCoordHLayout.setSpaceBetween(0);
yCoordHLayout.setMargins(40, 0, 0, 0);

var image = new ui.Image(ui.scriptLocation + "/boundingbox_assets/bbox.png");
image.setSize(143, 158);

var topLabel = new ui.Label(defaultValue);
var bottomLabel = new ui.Label(defaultValue);

var yCoordVLayout = new ui.VLayout();
yCoordVLayout.setSpaceBetween(0);
yCoordVLayout.setMargins(5, 0, 0, 0);
yCoordVLayout.addSpacing(10);
yCoordVLayout.add(topLabel);
yCoordVLayout.addSpacing(110);
yCoordVLayout.add(bottomLabel);
yCoordVLayout.addSpacing(10);

yCoordHLayout.add(image);
yCoordHLayout.add(yCoordVLayout);

var leftLabel = new ui.Label(defaultValue);
leftLabel.setAlignment(1);
var rightLabel = new ui.Label(defaultValue);
rightLabel.setAlignment(1);

var xCoordHLayout = new ui.HLayout();
xCoordHLayout.setSpaceBetween(0);
xCoordHLayout.setMargins(5, 5, 0, 0);
xCoordHLayout.add(leftLabel);
xCoordHLayout.addSpacing(40);
xCoordHLayout.add(rightLabel);
xCoordHLayout.addSpacing(40);

var widthTextLabel = new ui.Label("Width:");
var widthValueLabel = new ui.Label(defaultValue);
widthValueLabel.setAlignment(2);

var widthHLayout = new ui.HLayout();
widthHLayout.setSpaceBetween(0);
widthHLayout.setMargins(3, 10, 0, 0);
widthHLayout.add(widthTextLabel);
widthHLayout.addSpacing(10);
widthHLayout.add(widthValueLabel);
widthHLayout.addSpacing(90);

var heightTextLabel = new ui.Label("Height:");
var heightValueLabel = new ui.Label(defaultValue);
heightValueLabel.setAlignment(2);

var heightHLayout = new ui.HLayout();
heightHLayout.setSpaceBetween(0);
heightHLayout.setMargins(3, 0, 0, 0);
heightHLayout.add(heightTextLabel);
heightHLayout.addSpacing(10);
heightHLayout.add(heightValueLabel);
heightHLayout.addSpacing(90);

var layersTextLabel = new ui.Label("Layers selected:");
var layersValueLabel = new ui.Label(defaultValue);
layersValueLabel.setAlignment(2);

var layerCountHLayout = new ui.HLayout();
layerCountHLayout.setSpaceBetween(0);
layerCountHLayout.setMargins(3, 0, 0, 0);
layerCountHLayout.add(layersTextLabel);
layerCountHLayout.addSpacing(10);
layerCountHLayout.add(layersValueLabel);
layerCountHLayout.addSpacing(90);

buttonVLayout.add(centrePointHLayout);
buttonVLayout.add(yCoordHLayout);
buttonVLayout.add(xCoordHLayout);
buttonVLayout.add(widthHLayout);
buttonVLayout.add(heightHLayout);
buttonVLayout.add(layerCountHLayout);

const container = new ui.Container();
container.setSize(250, 270);
container.setLayout(buttonVLayout);

/**
 * Round a number to 2 decimal places
 * @param {number} num - The number to round
 * @returns {number} The rounded number
 */
function round(num) {
  return num.toFixed(2);
}

/**
 * Update the UI text fields with the current selection
 */
function update() {
  var sel = api.getSelection();

  if (sel.length >= 0) {
    layersValueLabel.setText(sel.length.toString());

    if (sel.length == 0) {
      centrePointLabel.setText("( , )");
      topLabel.setText("");
      bottomLabel.setText("");
      leftLabel.setText("");
      rightLabel.setText("");
      widthValueLabel.setText("");
      heightValueLabel.setText("");
    } else {
      var bbox = api.getSelectionBoundingBox();

      centrePointLabel.setText(
        "(" +
          round(bbox.centre.x).toString() +
          ", " +
          round(bbox.centre.y).toString() +
          ")"
      );
      topLabel.setText(round(bbox.top).toString());
      bottomLabel.setText(round(bbox.bottom).toString());
      leftLabel.setText(round(bbox.left).toString());
      rightLabel.setText(round(bbox.right).toString());
      widthValueLabel.setText(round(bbox.width).toString());
      heightValueLabel.setText(round(bbox.height).toString());
    }
  }
}

function Callbacks() {
  this.onSelectionChanged = update;
  this.onAttrChanged = update;
}

var callbackObj = new Callbacks();

ui.addCallbackObject(callbackObj);

ui.add(container);
ui.show();

update();
