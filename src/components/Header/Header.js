import React  from 'react'
import { NavLink } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Grid from '@material-ui/core/Grid'
import BrightnessIcon from '@material-ui/icons/Brightness6'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import ClearIcon from '@material-ui/icons/Clear'
import './Header.css'



function Header({onToggleThemeClick, handleLogout}) {
    return (
        <AppBar position="fixed" color="primary" className="header-appbar">
            <Grid container>
                <Grid item xs={3} md={8}></Grid>
                <Grid item xs={2} md={1}>
                    <BrightnessIcon className="header-brightness" onClick={onToggleThemeClick}/>
                </Grid>
                <Grid item xs={3} md={1}>
                    <Button startIcon={<AddIcon/>} component={NavLink} to="/form" variant="contained" color="secondary" size="small" className="header-btn">Add</Button>
                </Grid>
                <Grid item xs={4} md={2}>
                    <Button startIcon={<ClearIcon/>} variant="contained" color="secondary" size="small" onClick={handleLogout} className="header-btn">Sign out</Button>
                </Grid>
            </Grid>
        </AppBar>
    )
}

export default Header