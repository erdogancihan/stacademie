import React, { Component } from "react";

class Map extends Component {
  constructor(props) {
    super(props);
    this.onScriptLoad = this.onScriptLoad.bind(this);
  }
  onScriptLoad() {
    const map = new window.google.maps.Map(
      document.getElementById(this.props.id),
      this.props.options
    );
    this.props.onMapLoad(map);
  }
  componentDidMount() {
      if (!window.google) {
      let s = document.createElement("script");
      s.type = "text/javascript";
      s.src =
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyCJa8QeVn64JjIh-aP1lhWDD5U_AHXTDzY&callback=initMap";
      let x = document.getElementsByTagName("script")[0];
      x.parentNode.insertBefore(s, x);
      s.addEventListener("load", e => {
        this.onScriptLoad();
      });
    } else {
      this.onScriptLoad();
    }
  }
  render() {
    return <div  style={{width:"100%", maxWidth:500,height:400}} id={this.props.id}/>
    
  }
}
export default Map;
