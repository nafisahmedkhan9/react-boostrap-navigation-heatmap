import React from "react"
import HeatmapChart from "./lib/index"

class App extends React.Component {

    getScrapData(){
        var itemList = [
            {label: "Red label", category:"Red", otherInfo: {}},
            {label: "Green label", category:"Green", otherInfo: {}},
            {label: "Blue label", category:"Blue", otherInfo: {}},
            {label: "Green label", category:"Green", otherInfo: {}},
        ]
        return itemList
    }

    render() {
        var dataArray = this.getScrapData()
        return (
            <HeatmapChart
                categoryTooltip={{
                    title:(label)=>{
                        return label
                    },
                    content: (label)=>{
                        return label
                    }}
                }
                cellTooltip={{
                    title:(label)=>{
                        return label
                    },
                    content: (label)=>{
                        return label
                    }
                }}
                categoryFormatter={(text, data, index)=>{
                    return text
                }}
                cellFormatter={(text, data, index)=>{
                    return  (
                        <><label style={{fontSize: "15px", margin:0}}>{text}</label><br/></>
                    )
                }}
                categories={['All', "Red", "Blue", "Green"]}
                colors={['white', "red", "lightblue", 'lightgreen']}
                categoryStyle={{marginBottom: "10px"}}
                cellComponent={dataArray}
                height="500"
                cellStyle={{}}
                cellContainerStyle={{}}
                mainContainerStyle={{marginLeft: "auto", marginRight: "auto", width: "80%", marginBottom: "20px", padding:"20px"}}  
            />
        );
    }
}

export default App