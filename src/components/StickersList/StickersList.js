import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchStickers, deleteSticker } from '../../store/actions/stickers'
import { withRouter } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import StickerItem from '../StickerItem/StickerItem'
import './StickersList.css'



function StickersList({list, fetchStickers, deleteSticker}) {

    useEffect(fetchStickers, []);

    return (
        <Grid container justify="center" className="stickers-list-container">
            <Grid item xs={8} md={8}>
                <Grid container spacing={5}>
                    {list == false ? 'Список пуст! Добавьте новый стикер!' : list.map((item) => <StickerItem key={item.id} sticker={item} onDeleteStickerClick={deleteSticker}/>)}
                </Grid>
            </Grid>
        </Grid>
    )
}

const mapStateToProps = ({list}, {match: {params: {type}}}) => (type === 'best' ? {list: list.filter((item) => item.best === true)} : {list: list.filter((item) => item.type === type)})

const mapDispatchToProps = {
    fetchStickers,
    deleteSticker,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StickersList))