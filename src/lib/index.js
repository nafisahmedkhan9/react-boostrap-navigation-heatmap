import React from "react"
import { Col, Card, Row, OverlayTrigger, Popover, PopoverTitle, PopoverContent} from 'react-bootstrap'
import "./bootstrap.css"
import "./bootstrap.min.css"
import "./index.css"

export default class HeatmapChart extends React.Component {
    constructor(props){
        super()
        this.state = {
            selectedCategory: props.categories[0],
        }
    }

    getComponent(dataArray  ){
        var colors = this.props.colors
        var categories = this.props.categories
        var labels = dataArray.map((data, index)=>{
            var label = data.label ? data.label : data
            var category = data.category ? data.category : ""
            if(this.state.selectedCategory === 'All' || this.state.selectedCategory ===  category){
                return (
                    <OverlayTrigger
                        key={index}
                        placement={"auto-start"}
                        delay={{ show: 500, hide: 100 }}
                        overlay={
                            this.props.cellTooltip ? (
                                <Popover id="popover-basic">
                                    <PopoverTitle as="h3">{this.props.cellTooltip.title ? this.props.cellTooltip.title(label) : label }</PopoverTitle>
                                    {
                                        this.props.cellTooltip.content ? (
                                            <PopoverContent>
                                                {this.props.cellTooltip.content(label)}
                                            </PopoverContent>
                                        ) : (
                                            <></>
                                        )
                                    }
                                </Popover>    
                            ) : (
                                <Popover id="popover-basic">
                                    <PopoverTitle as="h3">{label}</PopoverTitle>
                                </Popover>
                            )
                        }
                        >
                        <Card key={data+" "+index} style={{backgroundColor : colors[categories.indexOf(category)], cursor: "pointer", "minWidth": "140px"}}>
                            <div className="cellStyle" style={this.props.cellStyle}>
                                <center>{this.props.cellFormatter ? this.props.cellFormatter(label, data, index) : label}</center>
                            </div>
                        </Card>
                    </OverlayTrigger>
                )
            }
            return ""
        })
        return labels
    }

    handleCategory(color){
        this.setState({selectedCategory: color})
    }

    getCategories(dataArray){
        var colors = this.props.colors
        var labels = dataArray.map((data, index)=>{
            var label = data
            var backgroundColor = colors[index]
            return (
                <OverlayTrigger
                    key={index}
                    placement={"auto-start"}
                    delay={{ show: 500, hide: 100 }}
                    overlay={
                        this.props.categoryTooltip ? (
                            <Popover id="popover-basic">
                                <PopoverTitle as="h3">{this.props.categoryTooltip.title ? this.props.categoryTooltip.title(label) : label }</PopoverTitle>
                                {
                                    this.props.categoryTooltip.content ? (
                                        <PopoverContent>
                                            {this.props.categoryTooltip.content(label)}
                                        </PopoverContent>
                                    ) : (
                                        <></>
                                    )
                                }
                            </Popover>    
                        ) : (
                            <Popover id="popover-basic">
                                <PopoverTitle as="h3">{label}</PopoverTitle>
                            </Popover>
                        )
                    }
                    >

                    <Card onClick={this.handleCategory.bind(this, label)} style={{backgroundColor : backgroundColor, cursor: "pointer", "minWidth": "140px"}} key={data+" "+index}>
                        <div className="cellStyle" style={this.props.cellStyle}>
                            <center>{this.props.categoryFormatter ? this.props.categoryFormatter(label, data, index) : label}</center>
                        </div>
                    </Card>
                </OverlayTrigger>
            )
        })
        return labels
    }

    render() {
        var dataArray = this.props.cellComponent
        var categoryArray  = this.props.categories
        const componentHight = this.props.height
        var component = this.getComponent(dataArray)
        var category = this.getCategories(categoryArray)
        
        return (
            <Card style={{...this.props.mainContainerStyle, maxHeight: componentHight+"px", overflowY: "auto"}}>
                <Col>
                    <Row style={this.props.categoryStyle}>
                        {category}
                    </Row>
                    <Row style={this.props.cellContainerStyle}>
                        {component}
                    </Row>
                </Col>
            </Card>
        );
    }
}