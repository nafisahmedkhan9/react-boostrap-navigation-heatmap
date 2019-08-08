import React from "react";
import { Col, Card, Row, OverlayTrigger, Popover, PopoverTitle, PopoverContent } from 'react-bootstrap';
import "./bootstrap.css";
import "./bootstrap.min.css";
import "./index.css";
export default class HeatmapChart extends React.Component {
  constructor(props) {
    super();
    this.state = {
      selectedCategory: props.categories[0]
    };
  }

  getComponent(dataArray) {
    var colors = this.props.colors;
    var categories = this.props.categories;
    var labels = dataArray.map((data, index) => {
      var label = data.label ? data.label : data;
      var category = data.category ? data.category : "";

      if (this.state.selectedCategory === 'All' || this.state.selectedCategory === category) {
        return React.createElement(OverlayTrigger, {
          key: index,
          placement: "auto-start",
          delay: {
            show: 500,
            hide: 100
          },
          overlay: this.props.cellTooltip ? React.createElement(Popover, {
            id: "popover-basic"
          }, React.createElement(PopoverTitle, {
            as: "h3"
          }, this.props.cellTooltip.title ? this.props.cellTooltip.title(label) : label), this.props.cellTooltip.content ? React.createElement(PopoverContent, null, this.props.cellTooltip.content(label)) : React.createElement(React.Fragment, null)) : React.createElement(Popover, {
            id: "popover-basic"
          }, React.createElement(PopoverTitle, {
            as: "h3"
          }, label))
        }, React.createElement(Card, {
          key: data + " " + index,
          style: {
            backgroundColor: colors[categories.indexOf(category)],
            cursor: "pointer",
            "minWidth": "140px"
          }
        }, React.createElement("div", {
          className: "cellStyle",
          style: this.props.cellStyle
        }, React.createElement("center", null, this.props.cellFormatter ? this.props.cellFormatter(label, data, index) : label))));
      }

      return "";
    });
    return labels;
  }

  handleCategory(color) {
    this.setState({
      selectedCategory: color
    });
  }

  getCategories(dataArray) {
    var colors = this.props.colors;
    var labels = dataArray.map((data, index) => {
      var label = data;
      var backgroundColor = colors[index];
      return React.createElement(OverlayTrigger, {
        key: index,
        placement: "auto-start",
        delay: {
          show: 500,
          hide: 100
        },
        overlay: this.props.categoryTooltip ? React.createElement(Popover, {
          id: "popover-basic"
        }, React.createElement(PopoverTitle, {
          as: "h3"
        }, this.props.categoryTooltip.title ? this.props.categoryTooltip.title(label) : label), this.props.categoryTooltip.content ? React.createElement(PopoverContent, null, this.props.categoryTooltip.content(label)) : React.createElement(React.Fragment, null)) : React.createElement(Popover, {
          id: "popover-basic"
        }, React.createElement(PopoverTitle, {
          as: "h3"
        }, label))
      }, React.createElement(Card, {
        onClick: this.handleCategory.bind(this, label),
        style: {
          backgroundColor: backgroundColor,
          cursor: "pointer",
          "minWidth": "140px"
        },
        key: data + " " + index
      }, React.createElement("div", {
        className: "cellStyle",
        style: this.props.cellStyle
      }, React.createElement("center", null, this.props.categoryFormatter ? this.props.categoryFormatter(label, data, index) : label))));
    });
    return labels;
  }

  render() {
    var dataArray = this.props.cellComponent;
    var categoryArray = this.props.categories;
    const componentHight = this.props.height;
    var component = this.getComponent(dataArray);
    var category = this.getCategories(categoryArray);
    return React.createElement(Card, {
      style: { ...this.props.mainContainerStyle,
        maxHeight: componentHight + "px",
        overflowY: "auto"
      }
    }, React.createElement(Col, null, React.createElement(Row, {
      style: this.props.categoryStyle
    }, category), React.createElement(Row, {
      style: this.props.cellContainerStyle
    }, component)));
  }

}