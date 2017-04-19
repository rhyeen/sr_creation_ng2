import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'sr-page-properties',
  templateUrl: './page-properties.html',
  styleUrls: ['./page-properties.css'],
  inputs: ['properties_holder', 'edit_mode']
})
export class PagePropertiesComponent implements OnInit {
  private properties_holder;
  private edit_properties;
  private edit_mode = false;

  constructor(
  ) {

  }

  ngOnInit() {
    this.resetEditProperties();
  }

  resetEditProperties() {
    if (this.properties_holder.properties === null) {
      this.properties_holder.properties = [];
    }
    let properties = this.properties_holder.properties;
    this.edit_properties = this.copyObject(properties);
    this.pushBlankEditProperty();
  }

  private pushBlankEditProperty() {
    this.edit_properties.push(this.getNewProperty());
  }

  private getNewProperty() {
    return {
      key: '',
      value: ''
    };
  }

  checkProperties(property, change, property_key) {
    property[property_key] = change;
    this.addBlankLastProperty();
  }

  private addBlankLastProperty() {
    let last_property = this.edit_properties[this.edit_properties.length - 1];
    if (last_property['key']) {
      this.pushBlankEditProperty();
    }
  }

  private removeBlankProperty(index, property, properties) {
    if (!property['key']) {
      properties.splice(index, 1);
    }
  }

  saveProperties(index, property) {
    this.removeBlankProperty(index, property, this.edit_properties);
    this.addBlankLastProperty();
    this.properties_holder.properties = this.copyObject(this.edit_properties);
    this.removeEmptyProperties(this.properties_holder.properties);
  }

  private removeEmptyProperties(properties) {
    let self = this;
    properties.forEach(function(item, index, object) {
      self.removeBlankProperty(index, item, object);
    });
  }

  private copyObject(obj) {
    return JSON.parse(JSON.stringify(obj));
  }
}