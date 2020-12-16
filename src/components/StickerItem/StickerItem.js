import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete'
import { NavLink } from 'react-router-dom'
import './StickerItem.css'



function Sticker({sticker, onDeleteStickerClick}) {

    function getDaysAmount(){
        return Math.ceil((new Date(sticker.discountTo) - Date.now()) / 86400000)
    }

    function getDiscountCost(){
        const cost = +sticker.cost - (+sticker.cost * +sticker.discount / 100);
        return cost.toFixed(2);
    }

    function getCost(){
        const cost = +sticker.cost;
        return cost.toFixed(2);
    }

    return (
        <Grid item xs={6} md={3}>
            <Grid container direction="row" className="sticker-item-main-container">
                <Grid item xs={12} md={12}>
                    <img src={sticker.url} className="sticker-item-img" alt="img"/>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Grid container direction="column" justify="center" alignItems="center" className="sticker-item-params-block">
                        <Grid item xs={12} md={12} className="sticker-item-text-container">
                            <Typography className="sticker-item-title">{sticker.title}</Typography>
                            <Divider/>
                            <Typography className="sticker-item-description">{sticker.description}</Typography>
                            <Divider/>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            {sticker.discount == 0 || new Date(sticker.discountTo) < Date.now() ?
                            <Typography>{sticker.cost + ' грн'}</Typography> : 
                            <Grid item xs={12} md={12}>
                                <Typography className="sticker-item-typography">До конца скидки {getDaysAmount()} дней</Typography>
                                <Divider/>
                                <Typography className="sticker-item-line-through sticker-item-typography">{getCost() + ' грн'}</Typography>
                                <Typography className="sticker-item-typography">{getDiscountCost() + ' грн'}</Typography>
                                <Divider/>
                            </Grid>
                            }
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Button variant="contained" color="primary" startIcon={<AddIcon/>} size="small" component={NavLink} to={`/form/${sticker.id}`} className="sticker-item-button"><Typography className="sticker-item-btn-text">Edit</Typography></Button>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Button variant="contained" color="secondary" startIcon={<DeleteIcon/>} size="small" className="sticker-item-button" onClick={() => onDeleteStickerClick(sticker.id)}><Typography className="sticker-item-btn-text">Delete</Typography></Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Sticker