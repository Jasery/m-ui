import _ from "lodash";

export function setStyle(el, prop, value) {
  if (typeof value === "number") {
    value = value + "px";
  }
  el.style[prop] = value;
}

export function getStyleDirection(direction) {
  let styleDirections;
  switch (direction) {
    case "l":
    case "left":
      styleDirections = ["left"];
      break;
    case "r":
    case "right":
      styleDirections = ["right"];
      break;
    case "t":
    case "top":
      styleDirections = ["top"];
      break;
    case "b":
    case "bottom":
      styleDirections = ["bottom"];
      break;
    case "h":
    case "horizontal":
      styleDirections = ["left", "right"];
      break;
    case "v":
    case "vertical":
      styleDirections = ["top", "bottom"];
      break;
    case "f":
    case "full":
      styleDirections = ["top", "bottom", "left", "right"];
      break;
    default:
      styleDirections = ["top", "bottom", "left", "right"];
      break;
  }
  return styleDirections;
}

export function setDirectionStyle(el, prop, directionArg, value) {
  let styleProps = getStyleDirection(directionArg).map(d =>
    _.camelCase(`${prop}-${d}`)
  );
  for (let styleProp of styleProps) {
    setStyle(el, styleProp, value);
  }
}
