import React, { Component } from 'react'
import {connect} from 'react-redux';

import classes from './Burger.module.css'
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';

import bottom_bread from '../../images/bottom-bread.png'
import top_bread from '../../images/top-bread.png'
import lettuce from '../../images/lettuce.png'
import meat from '../../images/meat.png'
import pickle from '../../images/pickle.png'
import onion from '../../images/onion.png'
import tomato from '../../images/tomato.png'
import { Typography } from '@material-ui/core';

class Burger extends Component {

    state = {
        changes: '',
        openDialog: false,
        openBackdrop: false,
        openModal: false,
        email: '',
        phone: '',
        name: '',
        address: '',
        errorEmail: '',
        errorPhone: ''
    }

    handleClose = (b) => {
        this.setState({
            openDialog: b
        })
    }

    handleBackdrop = (b) => {
        this.setState({
            openBackdrop: b
        })

        setTimeout(() => (
            this.setState({
                openBackdrop: false,
                openModal: true
            })
        ), 1000)
    }

    handleModal = (b) => {
        this.setState({
            openModal: b
        })
    }

    onChange = (event) => {
        let valid; 

        switch (event.target.id) {
            case "email":
              this.setState({
                [event.target.id]: event.target.value
              })
              valid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                event.target.value
              );
      
              if (!valid) {
                this.setState({
                    errorEmail: 'Invalid Email'
                })
              } else {
                this.setState({
                    errorEmail: ''
                })
              }
              break;
            case "phone":
                this.setState({
                    [event.target.id]: event.target.value
                  })
                  valid = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(
                    event.target.value
                  );
          
                  if (!valid) {
                    this.setState({
                        errorPhone: 'Invalid Phone'
                    })
                  } else {
                    this.setState({
                        errorPhone: ''
                    })
                  }
                  break;
            case "name":
                this.setState({
                    [event.target.id]: event.target.value
                  })
                  break;
            case "address":
                this.setState({
                    [event.target.id]: event.target.value
                  })
            default:
              break;
          }
    }
    

    render() {

        
        const images = {lettuce, meat, pickle, onion, tomato}
        
        let ingredients = (
            Object.keys(this.props.ingredients).map(ingredient => {
                return [...Array(this.props.ingredients[ingredient])].map((_, i) => {
                    return <img key={ingredient + i} src={images[ingredient]} alt={ingredient}/>
                })  
            }).reduce((arr, el) => {
                
                return arr.concat(el)
            }, [])
        )
        
        if(ingredients.length === 0) {
            ingredients = <p className={classes.text}>Add Ingredients</p>
        }
        
        let lessThan2
        if(ingredients.length < 3 || ingredients.length === 'undefined') {
            console.log('anan')
            if(ingredients[0].props.alt ==='tomato' || ingredients[0].props.alt ==='pickle' || ingredients[0].props.alt ==='onion'){
                lessThan2 = <p className={classes.dummy}></p>
            }   
        } else {
            lessThan2 = <p className={classes.dummy2}></p>
        }

        let orderSummary = (
            Object.keys(this.props.ingredients).map(ingredient => {
                return <Typography variant='h6' key={ingredient}>{ingredient} <span style={{margin: '0 auto'}}>:</span> <span style={{float: 'right', fontSize: '1rem'}}>{[...Array(this.props.ingredients[ingredient])].length} <span style={{fontSize: '0.7rem'}}>x</span>  {this.props.prices[ingredient]}</span></Typography>   
            }).reduce((arr, el) => {
                
                return arr.concat(el)
            }, [])
        )


        return (
        <React.Fragment>
            <div className={classes.container}>
                <div className={classes.Burger}>
                    <img src={top_bread}/>
                        {lessThan2}
                        {ingredients}
                    <img src={bottom_bread}/>
                </div>
                <BurgerIngredients />
            </div>
            <div style={{textAlign: 'center', marginTop: '2em'}}>
                <Button disabled={this.props.totalPrice <= 2.5 ? true : false} className={classes.checkout} onClick={() => this.handleClose(true)}>Checkout</Button>
            </div>

            <div>
                <Dialog  maxWidth='lg' open={this.state.openDialog} onClose={() => this.handleClose(false)} aria-labelledby="form-dialog-title">
                    <DialogTitle style={{textAlign: 'center'}} id="form-dialog-title">Order Summary</DialogTitle>
                    <DialogContent style={{width: '35em', marginBottom: "5em"}}>
                        <div className={classes.summaryContainer}>
                            <div className={classes.information}>
                                <TextField
                                    variant='outlined'
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Your Name"
                                    type="text"
                                    required
                                    onChange={(event) => this.onChange(event)}
                                />
                                <TextField
                                    variant='outlined'
                                    autoFocus
                                    margin="dense"
                                    id="email"
                                    label="Email Address"
                                    type="email"
                                    required
                                    error={this.state.errorEmail.length > 0 ? true : false}
                                    onChange={(event) => this.onChange(event)}
                                />
                                <TextField
                                    variant='outlined'
                                    autoFocus
                                    margin="dense"
                                    id="phone"
                                    label="Phone Number"
                                    type="tel"
                                    required
                                    error={this.state.errorPhone.length > 0 ? true : false}
                                    onChange={(event) => this.onChange(event)}
                                />
                                <TextField
                                    variant='outlined'
                                    autoFocus
                                    margin="dense"
                                    id="address"
                                    multiline
                                    rows='4'
                                    label="Address"
                                    type="text"
                                    required
                                    onChange={(event) => this.onChange(event)}
                                />
                            </div>
                            

                            <div className={classes.summary}>
                                <Typography style={{margin: '0 auto'}}>Base Price: 2.50$</Typography>
                                {orderSummary}
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions className={classes.actions}>
                        <Button style={{color: 'red'}} onClick={() => this.handleClose(false)} color="primary">
                            Cancel
                        </Button>
                        <Button className={classes.checkout} disabled={this.state.email== '' || this.state.phone== '' || this.state.name== '' || this.state.address== '' || this.state.errorEmail || this.state.errorPhone} variant="contained" style={{backgroundColor: '#05d644', color: '#fff'}} onClick={() => {this.handleBackdrop(true); this.handleClose(false);}}>
                            CHECKOUT {this.props.totalPrice.toFixed(2)}$
                        </Button>
                    </DialogActions>
            </Dialog>
            </div>
            <Backdrop className={classes.backdrop} open={this.state.openBackdrop} >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={this.state.openModal}
                onClose={() => this.handleModal(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
            <Fade in={this.state.openModal}>
                <div className={classes.paper}>
                    <h2 id="transition-modal-title">Order Completed</h2>
                    <p id="transition-modal-description">Thank you</p>
                </div>
            </Fade>
            </Modal>
        </React.Fragment>    
        )
    }
}

function mapStateToProps(state) {
    return {
        ingredients: state.burger.ingredients,
        totalPrice: state.burger.totalPrice,
        prices: state.burger.prices
    }
}

export default connect(mapStateToProps, null)(Burger);
