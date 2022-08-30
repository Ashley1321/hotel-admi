import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom"
import TextField from '@material-ui/core/TextField';
import { db } from '../config/firebase'
import { useLocation, useHistory } from "react-router-dom";
import Box from '@mui/material/Box';
import { makeStyles } from '@material-ui/core/styles';
import './AddHotel.css'
import { addDoc, collection } from 'firebase/firestore';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "3%",
  },
  but: {
    marginTop: 10
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    alignItems: 'center'
  },
}));

//function
const AddHotel = () => {

  const history = useHistory()
  const [_guest, setGuest] = useState("")
  const [_location, setLocation] = useState("")
  const [_days, setDays] = useState('')
  const [_amount, setAmount] = useState("")
  const [_totalAmount, setTotalAmount] = useState("")
  const [_checkInDate, setCheckInDate] = useState("")
  const [_checkOutDate, setCheckOutDate] = useState("")
  const [_availableRooms, setAvailableRooms] = useState("")
  const addHotelRef = collection(db, 'hotels')
  const addHotel = () => {

    //data to push to firestore
    const hotel = {
      guest: _guest,
      location: _location,
      days: _days,
      amount: _amount,
      checkInDate: _checkInDate,
      checkOutDate: _checkOutDate,
      availableRooms: _availableRooms,
      totalAmount: _days * _amount
      // totalAmount: numberOfDays*roomPrice
    }

    //push to firestore
    addDoc(addHotelRef, hotel).then(() => {
      console.log('added')
      alert('Successfully Booked')
      history("/admin")
    }).catch((errr) => {
      console.log(errr)
    })

  }


  const classes = useStyles();
  return (
    <div className='MainDiv'>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar className='appBar' position="static" style={{ backgroundColor: '#360E0E' }}>
          <Toolbar >
            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }} >
              ADD HOTELS
            </Typography>
            <Button id="link" className={classes.addButton} variant="contained" color="primary" style={{ backgroundColor: 'white', color: 'black' }}>
              <Link style={{ color: 'inherit', textDecoration: 'none' }} to='/Admin'>Admin</Link>
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <div>
        <div className='from'>
          <form className={classes.root} noValidate autoComplete="off">
            <div className='textfileds'>
              <h1 className='Heading'>Guest Information</h1>
              <TextField id="outlined-basic" label="guest"  variant="standard" onChange={(e) => setGuest(e.target.value)} /><br></br>
              <TextField id="outlined-basic" label="location" variant="standard" onChange={(e) => setLocation(e.target.value)} /><br></br>
              <TextField id="outlined-basic" label="days" variant="standard" onChange={(e) => setDays(e.target.value)} /><br></br>
              <TextField id="outlined-basic" label="Amount" variant="standard" onChange={(e) => setAmount(e.target.value)} /><br></br>
              <TextField id="outlined-basic" label="check in date" variant="standard" onChange={(e) => setCheckInDate(e.target.value)} /><br></br>
              <TextField id="outlined-basic" label="check out date" variant="standard" onChange={(e) => setCheckOutDate(e.target.value)} /><br></br>
              <TextField id="outlined-basic" label="Available room" variant="standard" onChange={(e) => setAvailableRooms(e.target.value)} /><br></br>
              <TextField id="outlined-basic" label="Total Amount" style={{ display: 'none' }} variant="standard" onChange={(e) => setTotalAmount(e.target.value)} /><br></br>
              <Button onClick={(e) => { addHotel() }} className={classes.but} id="myButton" variant="contained" color="primary">
                ADD
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>

  );
}
export default AddHotel;
