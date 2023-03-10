import styles from './Select.module.css';
import React from 'react';
import checked from '../../icons/checked.svg'

//how to do a drop down list component in react?
class Select extends React.Component {
  constructor(props){
    super(props)
}
  render() {
    return <div className={styles.nav}>
      <Link changeOrderBreeds={this.props.changeOrderBreeds} 
      order={this.props.order} 
      />
    </div>;
  }
}

class Link extends React.Component {
  constructor(props){
    super(props)
}
	state = {
  	open: false,
  }
  handleClick = () => {
  	this.setState({ open: !this.state.open });
  }
  onSelect = (event)=>{
    this.setState({ open: !this.state.open });
    this.props.changeOrderBreeds(event.target.id);
  };

  render () {
  	const { open } = this.state;
    const selected = this.props.order;
  	return (
    	<div className={styles.link}>
    	  <span className={styles.span} style={{color: "#e9ecef"}} onClick={this.handleClick}>Order</span>
        <div className={open ? styles.menu.open : styles.menu}>
          <ul>
            <li><b>Alphabetical order</b></li>
            <li onClick={this.onSelect} id='ASC'>{selected==='ASC'?<img src={checked} alt="" />:''}Upward</li>
            <li onClick={this.onSelect} id='DES'>{selected==='DES'?<img src={checked} alt="" />:''}Falling</li>
            {/* <li onClick={this.onSelect} id='ASC'>{selected==='ASC'?'✅':''}Upward</li>
            <li onClick={this.onSelect} id='DES'>{selected==='DES'?'✅':''}Falling</li> */}
            <li><b>Order by weight</b></li>
            <li onClick={this.onSelect} id='upWeight'>{selected==='upWeight'?<img src={checked} alt="" />:''}Upward</li>
            <li onClick={this.onSelect} id='downWeight'>{selected==='downWeight'?<img src={checked} alt="" />:''}Falling</li>
            {/* <li onClick={this.onSelect} id='upWeight'>{selected==='upWeight'?'✅':''}Upward</li>
            <li onClick={this.onSelect} id='downWeight'>{selected==='downWeight'?'✅':''}Falling</li> */}
          </ul>
        </div>
    	</div>
    )
  }
}

export default Select;

//Source: https://stackoverflow.com/questions/46833359


