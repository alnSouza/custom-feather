class Feather {
  constructor() {
    this.defaultAttrs = ['feather-src', 'color', 'width', 'height'];
    this.tagIcons = document.querySelectorAll('[feather-src]');
    this.loader();
  }

  loader() {
    let tags = this.tagIcons;
    tags.forEach(tag => {
      let attributes = tag.attributes;
      let svgAttr = [];
      for (var attr of attributes) {
        if (this.defaultAttrs.includes(attr.name)) {
          svgAttr.push({name: attr.name, value: attr.nodeValue});
        }
      }

      let svg;
      for (var prop of svgAttr) {
          if (prop.name === this.defaultAttrs[0]) {
            svg = this.request(prop.value);
          }
          if (prop.name === this.defaultAttrs[1]) {
            svg.attributes.stroke.nodeValue = prop.value; // color
          }
          if (prop.name === this.defaultAttrs[2]) {
            svg.attributes.width.nodeValue = prop.value; // width
          }
          if (prop.name === this.defaultAttrs[3]) {
            svg.attributes.height.nodeValue = prop.value; // height
          }
      }
      tag.append(svg);
    });
  }

  request(iconStr) {
    let req = new XMLHttpRequest();
    req.open("get", `/lib/feather/${iconStr}.svg`, false);
    req.send();
    let svg = req.responseXML.documentElement;
    return svg;
  }
}
